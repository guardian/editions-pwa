import React, { useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { ArticlePillar, Front as FrontType, Issue } from 'src/common';
import { ArticleType, PageLayoutSizes } from 'src/common';
import { clamp } from 'src/helpers/math';
import type { FlatCard } from 'src/helpers/transform';
import { getColor } from 'src/helpers/transform';
import { useLargeDeviceMemory } from 'src/hooks/use-config-provider';
import type { ArticleNavigator } from 'src/screens/article-screen';
import { issueDateFromId } from 'src/screens/article/slider/slider-helpers';
import { SliderTitle } from 'src/screens/article/slider/SliderTitle';
import { useIssueScreenSize } from 'src/screens/issue/use-size';
import {
	getAppearancePillar,
	getCollectionPillarOverride,
	WithArticle,
} from '../../hooks/use-article';
import type { PropTypes } from './collection-page';
import { CollectionPage } from './collection-page';
import { FrontWrapper } from './helpers/front-wrapper';
import type { AnimatedFlatListRef } from './helpers/helpers';
import { getTranslateForPage } from './helpers/helpers';

const CollectionPageInFront = ({
	index,
	pillar,
	scrollX,
	...collectionPageProps
}: {
	index: number;
	pillar: ArticlePillar;
	scrollX: Animated.Value;
} & PropTypes) => {
	const { card, size } = useIssueScreenSize();
	const translate = useMemo(
		() =>
			getTranslateForPage(
				card.width,
				scrollX,
				index,
				size === PageLayoutSizes.mobile ? 1 : 0.5,
			),
		[card.width, scrollX, index, size],
	);
	return (
		<Animated.View
			style={[
				{
					width: card.width,
				},
				{
					transform: [
						{
							translateX: translate,
						},
					],
				},
			]}
		>
			<WithArticle
				type={ArticleType.Article}
				pillar={getCollectionPillarOverride(
					pillar,
					collectionPageProps.collection,
				)}
			>
				<CollectionPage
					translate={translate}
					{...collectionPageProps}
				/>
			</WithArticle>
		</Animated.View>
	);
};

const styles = StyleSheet.create({ overflow: { overflow: 'hidden' } });

export const Front = React.memo(
	({
		articleNavigator,
		frontData,
		localIssueId,
		publishedIssueId,
		cards,
	}: {
		articleNavigator: ArticleNavigator;
		localIssueId: Issue['localId'];
		publishedIssueId: Issue['publishedId'];
		frontData: FrontType;
		cards: FlatCard[];
	}) => {
		const color = getColor(frontData.appearance);
		const pillar = getAppearancePillar(frontData.appearance);

		const [scrollX] = useState(() => new Animated.Value(0));
		const flatListRef = useRef<AnimatedFlatListRef | undefined>();

		const stops = cards.length;
		const { card, container } = useIssueScreenSize();
		const largeDeviceMemory = useLargeDeviceMemory();
		const flatListOptimisationProps = largeDeviceMemory
			? {
					windowSize: 3,
					maxToRenderPerBatch: 2,
					initialNumToRender: 3,
			  }
			: {
					windowSize: 2,
					maxToRenderPerBatch: 1,
					initialNumToRender: 2,
			  };

		const [cardIndex, setCardIndex] = useState(0);
		const [
			position,
			setPosition,
		] = useState<Animated.AnimatedInterpolation>(new Animated.Value(0));

		return (
			<FrontWrapper
				scrubber={
					<SliderTitle
						title={frontData.displayName ?? 'News'}
						numOfItems={stops}
						color={color}
						location="front"
						subtitle={cards[cardIndex]?.collection?.key}
						position={position}
						editionDate={issueDateFromId(publishedIssueId)}
					/>
				}
			>
				<Animated.FlatList
					showsHorizontalScrollIndicator={false}
					// These three props are responsible for the majority of
					// performance improvements
					{...flatListOptimisationProps}
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={1}
					horizontal={true}
					style={styles.overflow}
					pagingEnabled={true}
					decelerationRate="fast"
					snapToInterval={card.width}
					ref={(r: AnimatedFlatListRef) => (flatListRef.current = r)}
					getItemLayout={(_: never, index: number) => ({
						length: card.width,
						offset: card.width * index,
						index,
					})}
					keyExtractor={(item: FlatCard, index: number) =>
						`${index}${item.collection.key}`
					}
					ListFooterComponent={
						<View
							style={{
								width: container.width - card.width,
							}}
						></View>
					}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: { x: scrollX },
								},
							},
						],
						{
							useNativeDriver: true,
							listener: (ev: any) => {
								const pos =
									ev.nativeEvent.contentOffset.x / card.width;

								const slideIndex = clamp(
									Math.ceil(pos),
									0,
									stops,
								);
								// Prevent the index being greater than the stops due to flatlist bounce
								const index =
									slideIndex >= stops - 1
										? stops - 1
										: slideIndex;
								setCardIndex(index);

								const position = Animated.divide(
									ev.nativeEvent.contentOffset.x,
									new Animated.Value(card.width),
								);
								setPosition(position);
							},
						},
					)}
					// this needs to be referential equal or will trigger
					// a re-render
					extraData={`${container.width}:${container.height}`}
					data={cards}
					renderItem={({
						item,
						index,
					}: {
						item: FlatCard;
						index: number;
					}) => (
						<CollectionPageInFront
							articlesInCard={item.articles || []}
							appearance={item.appearance}
							collection={item.collection.key}
							front={frontData.key}
							width={card.width}
							{...{
								scrollX,
								localIssueId,
								publishedIssueId,
								index,
								pillar,
								articleNavigator,
							}}
						/>
					)}
				/>
			</FrontWrapper>
		);
	},
);
