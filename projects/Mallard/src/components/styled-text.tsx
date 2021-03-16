import React from 'react';
import type { StyleProp, TextProps, TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { useAppAppearance } from 'src/theme/appearance';
import { color } from 'src/theme/color';
import { getFont } from 'src/theme/typography';

export const styles = StyleSheet.create({
	headlineText: {
		flexShrink: 0,
		...getFont('headline', 1.6),
		color: color.text,
	},
	headlineTextBold: {
		flexShrink: 0,
		...getFont('headline', 1.5, 'bold'),
		color: color.text,
	},
	headlineTextTitlepiece: {
		flexShrink: 0,
		...getFont('headline', 1.5, 'bold'),
		fontFamily: getFont('titlepiece', 1).fontFamily,
		color: color.text,
	},
	headlineTextLight: {
		flexShrink: 0,
		...getFont('headline', 1.5, 'light'),
		color: color.text,
	},
	issueLightText: {
		flexShrink: 0,
		...getFont('headline', 1.2),
	},
	issueHeavyText: {
		flexShrink: 0,
		...getFont('titlepiece', 1.25),
	},
	titlepieceText: {
		flexShrink: 0,
		...getFont('titlepiece', 1.5),
	},
	headlineKickerText: {
		flexShrink: 0,
		...getFont('titlepiece', 1),
	},
	headlineCardText: {
		flexShrink: 0,
		...getFont('headline', 1),
	},
	standfirstText: {
		flexShrink: 0,
		...getFont('text', 1),
	},
	serifBodyCopy: {
		flexShrink: 0,
		...getFont('text', 1),
	},
	serifBodyCopyBold: {
		flexShrink: 0,
		...getFont('text', 1, 'bold'),
	},
	bodyCopy: {
		flexShrink: 0,
		...getFont('sans', 1),
	},
	bodyCopyBold: {
		flexShrink: 0,
		...getFont('sans', 1, 'bold'),
	},
	explainerCopy: {
		flexShrink: 0,
		...getFont('sans', 0.9),
	},
});

export const TitlepieceText = ({
	style,
	...props
}: {
	children: string[] | string | Element;
	style?: StyleProp<TextStyle>;
} & TextProps) => {
	return <Text {...props} style={[styles.titlepieceText, style]} />;
};

export const IssueTitleText = ({
	style,
	...props
}: {
	children: string;
	style?: StyleProp<TextStyle>;
} & TextProps) => {
	return <Text {...props} style={[styles.issueHeavyText, style]} />;
};

export type HeadlineTextProps = {
	children: React.ReactNode | React.ReactNode[];
	weight?: 'regular' | 'bold' | 'light' | 'titlepiece';
	style?: StyleProp<TextStyle>;
} & TextProps & { onTextLayout?: any };

export const getHeadlineTextStyle = (
	weight: HeadlineTextProps['weight'] = 'regular',
) =>
	weight === 'regular'
		? styles.headlineText
		: weight === 'light'
		? styles.headlineTextLight
		: weight === 'bold'
		? styles.headlineTextBold
		: styles.headlineTextTitlepiece;

export const HeadlineText = ({
	style,
	weight = 'regular',
	...props
}: HeadlineTextProps) => {
	return <Text {...props} style={[getHeadlineTextStyle(weight), style]} />;
};

export const HeadlineKickerText = ({
	style,
	...props
}: {
	children: React.ReactNode | React.ReactNode[];
	style?: StyleProp<TextStyle>;
} & TextProps) => {
	return <Text {...props} style={[styles.headlineKickerText, style]} />;
};

export const StandfirstText = ({
	style,
	...props
}: {
	children: string;
	style?: StyleProp<TextStyle>;
} & TextProps) => {
	return <Text {...props} style={[styles.standfirstText, style]} />;
};

export const HeadlineCardText = ({
	children,
	style,
	...props
}: {
	children: React.ReactNode | React.ReactNode[];
	style?: StyleProp<TextStyle>;
} & TextProps) => (
	<HeadlineText {...props} style={[styles.headlineCardText, style]}>
		{children}
	</HeadlineText>
);

export const BodyCopy = ({
	style,
	weight = 'regular',
	...props
}: {
	children: string;
	weight: 'regular' | 'bold';
	style?: StyleProp<TextStyle>;
} & TextProps) => {
	return (
		<Text
			{...props}
			style={[
				weight === 'bold'
					? styles.serifBodyCopyBold
					: styles.serifBodyCopy,
				style,
			]}
		/>
	);
};

export const UiBodyCopy = ({
	children,
	style,
	weight = 'regular',
	...props
}: {
	children: string | string[];
	weight?: 'regular' | 'bold';
	style?: StyleProp<TextStyle>;
} & TextProps) => {
	return (
		<Text
			{...props}
			style={[
				weight === 'bold' ? styles.bodyCopyBold : styles.bodyCopy,
				{
					color: useAppAppearance().color,
				},
				style,
			]}
		>
			{children}
		</Text>
	);
};

export const UiExplainerCopy = ({
	children,
	style,
	...props
}: {
	children: Element;
	style?: StyleProp<TextStyle>;
} & TextProps) => {
	return (
		<Text
			{...props}
			style={[
				styles.explainerCopy,
				{
					color: useAppAppearance().dimColor,
				},
				style,
			]}
		>
			{children}
		</Text>
	);
};
