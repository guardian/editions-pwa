import React, { useMemo } from 'react';
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
		...getFont('icon', 1),
	},
	bottomLeft: {
		position: 'absolute',
		left: 0,
		bottom: 0,
	},
	inline: {
		flex: 0,
	},
});

export const getRatingAsText = (rating: number) =>
	['☆', '☆', '☆', '☆', '☆'].map((s, index) => {
		if (index + 1 <= rating) {
			return '★';
		}
		if (index + 0.01 <= rating) {
			return '';
		}
		return s;
	});

const Stars = ({
	position,
	rating,
}: {
	position?: 'bottomLeft' | 'inline';
	rating: number;
}) => {
	const ratingAsText = useMemo(() => getRatingAsText(rating), [rating]);
	return (
		<View
			accessibilityLabel={`${rating.toString()} stars`}
			style={[styles.background, position && styles[position]]}
		>
			<Text style={styles.text} accessible={false}>
				{ratingAsText.join('')}
			</Text>
		</View>
	);
};

export { Stars };
