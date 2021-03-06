import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
	Animated,
	Easing,
	StyleSheet,
	TouchableHighlight,
	View,
} from 'react-native';
import type { CAPIArticle, Issue, ItemSizes } from 'src/common';
import { ariaHidden } from 'src/helpers/a11y';
import type { MainStackParamList } from 'src/navigation/NavigationModels';
import { RouteNames } from 'src/navigation/NavigationModels';
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

//https://stackoverflow.com/questions/51521809/typescript-definitions-for-animated-views-style-prop opacity: any can chhange at rn 0.61.8
const fade = (opacity: any, direction: 'in' | 'out') =>
	direction === 'in'
		? Animated.timing(opacity, {
				duration: 150,
				delay: 150,
				toValue: 1,
				easing: Easing.linear,
				useNativeDriver: true,
		  }).start()
		: Animated.timing(opacity, {
				duration: 150,
				toValue: 0,
				useNativeDriver: true,
		  }).start();

const ItemTappable = ({
	children,
	articleNavigator,
	style,
	article,
	path,
	hasPadding = true,
}: {
	children: ReactNode;
	hasPadding?: boolean;
} & TappablePropTypes) => {
	const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
	const [opacity] = useState(() => new Animated.Value(1));

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fade(opacity, 'in');
		});

		return unsubscribe;
	}, [navigation]);

	const handlePress = () => {
		fade(opacity, 'out');
		article.type === 'crossword'
			? navigation.navigate(RouteNames.Crossword, {
					path,
					articleNavigator,
					prefersFullScreen: true,
			  })
			: navigation.navigate(RouteNames.Article, {
					path,
					articleNavigator,
			  });
	};

	return (
		<Animated.View style={[style]}>
			<TouchableHighlight onPress={handlePress} activeOpacity={0.95}>
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
};

export { ItemTappable };
