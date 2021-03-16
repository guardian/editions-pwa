import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { color } from 'src/theme/color';
import { getFont } from 'src/theme/typography';

const LeftChevron = ({
	fill = color.palette.neutral[20],
}: {
	fill?: string;
}) => {
	const styles = StyleSheet.create({
		icon: {
			...getFont('icon', 1),
			color: fill,
			alignSelf: 'center',
		},
	});

	return <Text style={styles.icon}>{'\uE00A'}</Text>;
};

export { LeftChevron };
