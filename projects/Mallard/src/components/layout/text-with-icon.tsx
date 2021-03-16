import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, TextProps, TextStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { ariaHidden } from 'src/helpers/a11y';
import { MINIMUM_BREAKPOINT } from 'src/theme/breakpoints';
import type { getUnscaledFont } from 'src/theme/typography';
import { applyScale } from 'src/theme/typography';

interface Icon {
	width: number;
	element: (scale: number) => ReactNode;
}

type TextWithIconProps = {
	children: any;
	unscaledFont: ReturnType<typeof getUnscaledFont>;
	icon: Icon;
	style: StyleProp<TextStyle>;
} & { onTextLayout?: any } & TextProps;

const styles = StyleSheet.create({
	icon: {
		position: 'absolute',
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		top: 1,
		left: -1,
	},
	dash: {
		opacity: 0,
	},
});

/*
This is super cursed. Basically, in order to add inline icons
of any arbitrary px width without messing up the line height we add
invisible spaces at the start of the text to fill up the space and
then the icon floats over the whole thing as an absolute box
*/
const IconDashes = ({ length = 1 }) => {
	const lines = [];
	for (let i = 0; i < Math.floor(length / 3.5); i++) {
		lines.push(
			<Text key={i} {...ariaHidden} style={[styles.dash]}>
				{' '}
			</Text>,
		);
	}
	return <>{lines}</>;
};

const TextWithIcon = ({
	children,
	style,
	icon,
	unscaledFont,
	...props
}: TextWithIconProps) => {
	const scaledFont = applyScale(unscaledFont);
	const scale =
		(unscaledFont[MINIMUM_BREAKPOINT].lineHeight / scaledFont.lineHeight) *
		0.9;

	return (
		<View>
			<View
				style={[
					styles.icon,
					{
						width: icon.width * scale,
						height: scaledFont.lineHeight * 0.85,
					},
				]}
			>
				{icon.element(scale)}
			</View>
			<Text
				{...props}
				allowFontScaling={false}
				style={[style, scaledFont]}
			>
				{icon && <IconDashes length={icon.width}></IconDashes>}
				{children}
			</Text>
		</View>
	);
};

export { TextWithIcon };
