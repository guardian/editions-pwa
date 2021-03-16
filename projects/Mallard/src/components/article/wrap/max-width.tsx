import type { ReactNode } from 'react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { metrics } from 'src/theme/spacing';

const maxWidthStyles = StyleSheet.create({
	maxWidth: {
		maxWidth: metrics.article.maxWidth,
		overflow: 'visible',
		width: '100%',
	},
	padding: {
		marginHorizontal: metrics.article.sides,
	},
});

export const MaxWidthWrap = ({ children }: { children: ReactNode }) => {
	return (
		<View style={[maxWidthStyles.maxWidth, maxWidthStyles.padding]}>
			{children}
		</View>
	);
};
