import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Text, View } from 'react-native';
import type { ItemSizes } from 'src/common';
import { PageLayoutSizes } from 'src/common';
import { Quote } from 'src/components/icons/Quote';
import { TextWithIcon } from 'src/components/layout/text-with-icon';
import { useArticle } from 'src/hooks/use-article';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import type { FontSizes } from 'src/theme/typography';
import { applyScale, getFont, getUnscaledFont } from 'src/theme/typography';
import { HeadlineCardText, HeadlineKickerText } from '../../../styled-text';
import { useIsOpinionCard } from './types';

const styles = {
	root: {
		paddingBottom: metrics.vertical,
	},
	rootWithHighlight: {
		backgroundColor: color.palette.highlight.main,
		paddingHorizontal: metrics.horizontal / 2,
	},
	headline: {
		color: color.dimText,
	},
	opinionHeadline: {
		color: color.dimText,
		fontFamily: getFont('headline', 1, 'light').fontFamily,
	},
	invertedText: {
		color: color.palette.neutral[100],
	},
};

const getFontSize = ({ layout, story }: ItemSizes) => {
	// this should be 0.9 pending production changes
	const tabletSecondaryFontSize = 0.75;

	if (layout === PageLayoutSizes.tablet) {
		// full width cards
		if (story.width == 3) {
			// 1 and 2 story (non journal) main
			if (story.height == 3 || story.height == 4) return 1.5;
			// 2 story secondary
			if (story.height == 1) return 1.25;
		}
		// 2/3 width cards
		if (story.width == 2) {
			// 3 story card main
			if (story.height == 4) return 1.5;
			// 4 story card main
			if (story.height == 3) return 1.25;
			// 4 story card bottom left secondary
			if (story.height == 1) return tabletSecondaryFontSize;
			return 0.75;
		}
		// 1/3 width cards - 3,4,5 story secondary
		if (story.width == 1) {
			return tabletSecondaryFontSize;
		}
		return 0.75; // this should never happen but is a safe 'small' size
	}
	// mobile layout
	if (story.height > 4) {
		return 1.5;
	}
	if (story.height == 4 && story.width === 2) {
		return 1.25;
	}
	return 1;
};

const TextBlock = ({
	kicker,
	headline,
	style,
	byline,
	type,
	monotone = false,
	inverted = false,
	...sizes
}: {
	kicker: string;
	byline?: string;
	type?: string;
	headline: string;
	style?: StyleProp<ViewStyle>;
	monotone?: boolean;
	inverted?: boolean;
} & ({ size: ItemSizes } | { fontSize: FontSizes<'headline'> })) => {
	const font = getUnscaledFont(
		'headline',
		'fontSize' in sizes ? sizes.fontSize : getFontSize(sizes.size),
	);

	const { fontSize, lineHeight } = applyScale(font);
	const [colors] = useArticle();

	const kickerColor = colors.main;

	return (
		<View style={[styles.root, style]}>
			{useIsOpinionCard() ? (
				<>
					<TextWithIcon
						unscaledFont={font}
						style={styles.opinionHeadline}
						icon={{
							width: 32,
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							element: (scale) => (
								<Quote
									scale={fontSize / 26}
									fill={colors.main}
								/>
							),
						}}
					>
						{headline}
					</TextWithIcon>
					<HeadlineKickerText
						allowFontScaling={false}
						style={[
							{
								marginTop: 2,
								color: kickerColor,
								fontSize,
								lineHeight,
							},
						]}
					>
						{byline}
					</HeadlineKickerText>
				</>
			) : (
				<HeadlineCardText
					allowFontScaling={false}
					style={[
						styles.headline,
						inverted && styles.invertedText,
						{ fontSize, lineHeight },
					]}
					textBreakStrategy="simple"
				>
					<HeadlineKickerText
						allowFontScaling={false}
						style={[
							!monotone && {
								color: kickerColor,
							},
							{
								fontSize,
								lineHeight,
							},
						]}
					>
						{kicker + ' '}
					</HeadlineKickerText>
					{headline}
					{type === 'crossword' && byline ? (
						<Text style={{ fontStyle: 'italic' }}>
							{'\n'}Set by {byline}
						</Text>
					) : null}
				</HeadlineCardText>
			)}
		</View>
	);
};

export { TextBlock };
