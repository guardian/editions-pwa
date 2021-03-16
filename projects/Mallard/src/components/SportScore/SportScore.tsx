import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { getFont } from 'src/theme/typography';

const styles = StyleSheet.create({
	background: {
		backgroundColor: color.palette.highlight.main,
		padding: 0,
		paddingBottom: 2,
		paddingHorizontal: metrics.horizontal / 3,
	},
	text: {
		letterSpacing: 0.25,
		...getFont('headline', 0.5),
	},
	smallItems: {
		flex: 0,
	},
	trailImage: {
		position: 'absolute',
		left: 0,
		bottom: 0,
	},
});

const SportScore = ({
	sportScore,
	type,
}: {
	sportScore: string;
	type?: 'smallItems' | 'trailImage';
}) => (
	<View
		accessibilityLabel={sportScore}
		style={[styles.background, type && styles[type]]}
	>
		<Text style={styles.text}>{sportScore}</Text>
	</View>
);

export { SportScore };
