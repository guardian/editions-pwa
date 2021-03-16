import React from 'react';
import type { Animated } from 'react-native';
import { StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import type {
	CAPIArticle,
	Collection,
	Front,
	FrontCardAppearance,
	Issue,
	ItemSizes,
	PageLayout,
	PageLayoutSizes,
	Rectangle,
	Size,
} from 'src/common';
import { ArticleType, defaultCardAppearances, layouts } from 'src/common';
import { FlexErrorMessage } from 'src/components/layout/ui/errors/flex-error-message';
import { Multiline } from 'src/components/multiline';
import { WithArticleType } from 'src/hooks/use-article';
import { useIssueScreenSize } from 'src/screens/issue/use-size';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import type { ArticleNavigator } from '../../screens/article-screen';
import type { Item as TItem } from './helpers/helpers';
import {
	getItemRectanglePerc,
	getPageLayoutSizeXY,
	toAbsoluteRectangle,
	useCardBackgroundStyle,
} from './helpers/helpers';
import { itemTypeLookup } from './helpers/item-type-lookup';

const styles = StyleSheet.create({
	root: {
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'center',
		shadowColor: color.text,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 2,
		flex: 1,
		margin: metrics.fronts.sides,
		marginTop: DeviceInfo.isTablet()
			? metrics.fronts.sides / 2
			: metrics.fronts.sides / 10,
		marginBottom: metrics.fronts.marginBottom,
	},
	itemHolder: {
		overflow: 'hidden',
		position: 'absolute',
	},
	multiline: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
	},
	sideBorder: {
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 3,
		width: 1,
		backgroundColor: color.dimLine,
	},
	endCapSideBorder: {
		bottom: 0,
	},
	item: {
		...StyleSheet.absoluteFillObject,
	},
});

export interface PropTypes {
	articlesInCard: CAPIArticle[];
	articleNavigator: ArticleNavigator;
	localIssueId: Issue['localId'];
	publishedIssueId: Issue['publishedId'];
	front: Front['key'];
	appearance: FrontCardAppearance | null;
	collection: Collection['key'];
	width: number;
}

const getPageLayout = (
	appearance: FrontCardAppearance | null,
	length: number,
): PageLayout => {
	if (!appearance) {
		if (
			length === 1 ||
			length === 2 ||
			length === 3 ||
			length === 4 ||
			length === 5 ||
			length === 6
		) {
			return layouts[defaultCardAppearances[length]];
		}
		return layouts[defaultCardAppearances[6]];
	} else {
		if (layouts[appearance]) {
			return layouts[appearance];
		}
		return getPageLayout(null, length);
	}
};

const isNotRightMostStory = ({ story, layout }: ItemSizes) =>
	story.left + story.width < getPageLayoutSizeXY(layout).width;

const isNotBottomMostStory = ({ story, layout }: ItemSizes) =>
	story.top + story.height < getPageLayoutSizeXY(layout).height;

const Item = React.memo(
	({
		card,
		collection,
		localIssueId,
		publishedIssueId,
		front,
		article,
		Renderer,
		story,
		layout,
		articleNavigator,
	}: {
		card: Size;
		collection: string;
		localIssueId: string;
		publishedIssueId: string;
		front: string;
		article: CAPIArticle;
		Renderer: TItem;
		story: Rectangle;
		layout: PageLayoutSizes;
		articleNavigator: ArticleNavigator;
	}) => {
		const size = {
			story,
			layout,
		};
		return (
			<WithArticleType value={article.articleType || ArticleType.Article}>
				<View
					style={[
						styles.itemHolder,
						toAbsoluteRectangle(
							getItemRectanglePerc(story, layout),
							{
								width: card.width - metrics.fronts.sides * 2,
								height:
									card.height - metrics.fronts.marginBottom,
							},
						),
					]}
				>
					<Renderer
						path={{
							article: article.key,
							collection,
							localIssueId,
							publishedIssueId,
							front,
						}}
						localIssueId={localIssueId}
						publishedIssueId={publishedIssueId}
						size={size}
						articleNavigator={articleNavigator}
						article={article}
					/>
					{isNotRightMostStory(size) ? (
						<View
							style={[
								styles.sideBorder,
								!isNotBottomMostStory(size) &&
									styles.endCapSideBorder,
							]}
						/>
					) : null}
					{isNotBottomMostStory(size) ? (
						<Multiline
							style={styles.multiline}
							color={color.dimLine}
							count={2}
						/>
					) : null}
				</View>
			</WithArticleType>
		);
	},
);

const CollectionPage = React.memo(
	({
		articlesInCard,
		articleNavigator,
		collection,
		localIssueId,
		publishedIssueId,
		front,
		appearance,
	}: { translate: Animated.AnimatedInterpolation } & PropTypes) => {
		const background = useCardBackgroundStyle();
		const { size, card } = useIssueScreenSize();
		if (!articlesInCard.length) {
			return <FlexErrorMessage />;
		}

		const layout = getPageLayout(appearance, articlesInCard.length)[size];

		return (
			<View style={[styles.root, background]}>
				{layout.items.map((story, index) => {
					if (!articlesInCard[index]) return null;
					const article = articlesInCard[index];
					const itemRenderer = itemTypeLookup[story.item];
					return (
						<Item
							card={card}
							articleNavigator={articleNavigator}
							story={story.fits}
							layout={layout.size}
							collection={collection}
							localIssueId={localIssueId}
							publishedIssueId={publishedIssueId}
							front={front}
							key={index}
							Renderer={itemRenderer}
							article={article}
						/>
					);
				})}
			</View>
		);
	},
);

export { CollectionPage };
