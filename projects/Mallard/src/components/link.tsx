import React from 'react';
import type { TextProps } from 'react-native';
import { Linking, StyleSheet, Text } from 'react-native';
import { color } from 'src/theme/color';

const styles = StyleSheet.create({
	link: {
		color: color.primary,
		textDecorationLine: 'underline',
	},
});

const Link = ({
	children,
	style,
	href,
}: {
	children: string;
	style?: TextProps['style'];
	href: string;
}) => (
	<Text
		style={[styles.link, style]}
		onPress={() => {
			Linking.openURL(href);
		}}
	>
		{children}
	</Text>
);

const LinkNav = ({
	children,
	style,
	onPress,
}: {
	children: string;
	style?: TextProps['style'];
	onPress: () => void;
}) => (
	<Text style={[styles.link, style]} onPress={onPress}>
		{children}
	</Text>
);

export { Link, LinkNav };
