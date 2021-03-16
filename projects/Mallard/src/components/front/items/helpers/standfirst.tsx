import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { color } from 'src/theme/color';
import { getFont } from 'src/theme/typography';

const styles = StyleSheet.create({
	standfirst: {
		...getFont('text', 0.9),
		color: color.palette.neutral[46],
	},
});

const Standfirst = ({
	children,
	style,
}: {
	children: string;
	style?: StyleProp<TextStyle>;
}) => {
	return (
		<Text allowFontScaling={false} style={[styles.standfirst, style]}>
			{children}
		</Text>
	);
};

export { Standfirst };
