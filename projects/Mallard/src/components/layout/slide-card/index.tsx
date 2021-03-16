import type { ReactNode } from 'react';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Header } from './header';

/*
This is the swipey contraption that contains an article.
*/

const styles = StyleSheet.create({
	container: {
		flex: 0,
		flexShrink: 0,
		height: '100%',
		overflow: 'hidden',
	},
	flexGrow: {
		flexGrow: 1,
	},
});

export const SlideCard = ({ children }: { children: ReactNode }) => (
	<Animated.View style={[styles.container]}>
		<View style={[{ flex: 1 }]}>
			<Header />
			{children}
		</View>
	</Animated.View>
);

SlideCard.defaultProps = {
	fadesHeaderIn: false,
};
