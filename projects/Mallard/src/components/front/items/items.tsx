import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { Image } from 'src/common';
import { PageLayoutSizes } from 'src/common';
import { HeadlineCardText } from 'src/components/styled-text';
import { metrics } from 'src/theme/spacing';
import { ImageResource } from '../image-resource';
import type { PropTypes } from './helpers/item-tappable';
import { ItemTappable } from './helpers/item-tappable';
import { TextBlock } from './helpers/text-block';
import { ImageItem, SidekickImageItem, SplitImageItem } from './image-items';
import { SmallItem, SmallItemLargeText } from './small-items';
import { SuperHeroImageItem } from './super-items';

/*
helpers
*/

/*
COVER ITEM
Text over image. To use in lifestyle & art heros
*/
const coverStyles = StyleSheet.create({
	cover: {
		width: '100%',
		height: '100%',
		flex: 1,
	},
	text: {
		width: '50%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		top: '50%',
		paddingTop: metrics.vertical / 3,
	},
});

const CoverItem = ({ article, size, ...tappableProps }: PropTypes) => {
	return (
		<ItemTappable {...tappableProps} {...{ article }}>
			<View style={coverStyles.cover}>
				{'trailImage' in article && article.trailImage ? (
					<ImageResource
						style={coverStyles.cover}
						image={article.trailImage}
						use="thumb"
					/>
				) : null}
				<TextBlock
					byline={article.byline}
					type={article.type}
					kicker={article.kicker}
					headline={article.headline}
					style={coverStyles.text}
					{...{ size }}
				/>
			</View>
		</ItemTappable>
	);
};

/*
SPLASH ITEM
Image only
*/
const splashImageStyles = StyleSheet.create({
	image: {
		width: '100%',
		flex: 0,
	},
	hidden: {
		opacity: 0,
	},
	overflow: {
		overflow: 'hidden',
	},
});

const SplashImageItem = ({ article, size, ...tappableProps }: PropTypes) => {
	if (!article.cardImage || !article.cardImageTablet)
		return <SuperHeroImageItem {...tappableProps} {...{ article, size }} />;

	const cardImage: Image =
		size.layout === PageLayoutSizes.mobile
			? {
					source:
						(article.cardImage && article.cardImage.source) || '',
					path: (article.cardImage && article.cardImage.path) || '',
			  }
			: {
					source:
						(article.cardImageTablet &&
							article.cardImageTablet.source) ||
						'',
					path:
						(article.cardImageTablet &&
							article.cardImageTablet.path) ||
						'',
			  };

	return (
		<ItemTappable {...tappableProps} {...{ article }} hasPadding={false}>
			<View style={splashImageStyles.overflow}>
				<ImageResource
					style={[splashImageStyles.image]}
					image={cardImage}
					setAspectRatio
					use="full-size"
					accessibilityLabel={article.headline}
				/>
			</View>
			<HeadlineCardText style={[splashImageStyles.hidden]}>
				{article.kicker}
			</HeadlineCardText>
		</ItemTappable>
	);
};

export {
	SplashImageItem,
	SuperHeroImageItem,
	ImageItem,
	SplitImageItem,
	SmallItem,
	SmallItemLargeText,
	CoverItem,
	SidekickImageItem,
};
