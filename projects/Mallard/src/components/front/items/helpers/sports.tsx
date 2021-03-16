import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { color } from 'src/theme/color';

const styles = StyleSheet.create({
	card: {
		backgroundColor: color.palette.highlight.main,
		flexGrow: 1,
	},
});

const SportItemBackground = ({
	children,
	style,
}: {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}) => {
	return <View style={[styles.card, style]}>{children}</View>;
};

export { SportItemBackground };
