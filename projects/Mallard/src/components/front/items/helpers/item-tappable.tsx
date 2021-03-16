import type { ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
	Animated,
	Easing,
	StyleSheet,
	TouchableHighlight,
	View,
} from 'react-native';
import type { AnimatedValue, NavigationInjectedProps } from 'react-navigation';
import { NavigationEvents, withNavigation } from 'react-navigation';
import type { CAPIArticle, Issue, ItemSizes } from 'src/common';
import { ariaHidden } from 'src/helpers/a11y';
import { navigateToArticle } from 'src/navigation/helpers/base';
import {
	setScreenPositionFromView,
	setScreenPositionOfItem,
} from 'src/navigation/navigators/article/positions';
import type { PathToArticle } from 'src/paths';
import type { ArticleNavigator } from 'src/screens/article-screen';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { useCardBackgroundStyle } from '../../helpers/helpers';

export interface TappablePropTypes {
	style?: StyleProp<ViewStyle>;
	article: CAPIArticle;
	path: PathToArticle;
	articleNavigator: ArticleNavigator;
}

export interface PropTypes extends TappablePropTypes {
	size: ItemSizes;
	localIssueId: Issue['localId'];
	publishedIssueId: Issue['publishedId'];
}

/*
TAPPABLE
This just wraps every card to make it tappable
*/
export const tappablePadding = {
	padding: metrics.horizontal / 2,
	paddingVertical: metrics.vertical / 2,
};
const tappableStyles = StyleSheet.create({
	root: {
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: '100%',
	},
	padding: tappablePadding,
});

/*
To help smooth out the transition
we fade the card contents out on tap
and then back in when the view regains focus
*/
const fade = (opacity: AnimatedValue, direction: 'in' | 'out') =>
	direction === 'in'
		? Animated.timing(opacity, {
				duration: 250,
				delay: 250,
				toValue: 1,
				easing: Easing.linear,
				useNativeDriver: true,
		  }).start()
		: Animated.timing(opacity, {
				duration: 250,
				toValue: 0,
				useNativeDriver: true,
		  }).start();

const ItemTappable = withNavigation(
	({
		children,
		articleNavigator,
		style,
		article,
		path,
		navigation,
		hasPadding = true,
	}: {
		children: ReactNode;
		hasPadding?: boolean;
	} & TappablePropTypes &
		NavigationInjectedProps) => {
		const tappableRef = useRef<View>();
		const [opacity] = useState(() => new Animated.Value(1));
		return (
			<Animated.View
				style={[style]}
				ref={(view: any) => {
					if (view) tappableRef.current = view._component as View;
				}}
				onLayout={(ev: any) => {
					setScreenPositionOfItem(article.key, ev.nativeEvent.layout);
					tappableRef.current &&
						setScreenPositionFromView(
							article.key,
							tappableRef.current,
						);
				}}
				onTouchStart={() => {
					tappableRef.current &&
						setScreenPositionFromView(
							article.key,
							tappableRef.current,
						);
				}}
			>
				<NavigationEvents
					onWillFocus={() => {
						fade(opacity, 'in');
					}}
				/>

				<TouchableHighlight
					onPress={() => {
						fade(opacity, 'out');
						navigateToArticle(navigation, {
							path,
							articleNavigator,
							prefersFullScreen: article.type === 'crossword',
						});
					}}
					activeOpacity={0.95}
				>
					<View
						style={[
							tappableStyles.root,
							hasPadding && tappableStyles.padding,
							useCardBackgroundStyle(),
						]}
					>
						{children}
					</View>
				</TouchableHighlight>

				<Animated.View
					{...ariaHidden}
					pointerEvents="none"
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: color.dimBackground,
							opacity: opacity.interpolate({
								inputRange: [0, 1],
								outputRange: [1, 0],
							}),
						},
					]}
				></Animated.View>
			</Animated.View>
		);
	},
);

export { ItemTappable };
