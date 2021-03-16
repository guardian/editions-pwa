import type { FunctionComponent } from 'react';
import React from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import type {
	NavigationContainer,
	NavigationInjectedProps,
	NavigationRouteConfig,
	NavigationTransitionProps,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import { ClipFromTop } from 'src/components/layout/animators/clipFromTop';
import { safeInterpolation, safeValue } from 'src/helpers/math';
import { useDimensions } from 'src/hooks/use-config-provider';
import { getScreenPositionOfItem } from 'src/navigation/navigators/article/positions';
import { BasicArticleHeader } from 'src/screens/article/header';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { SlideCard } from '../../components/layout/slide-card/index';
import { addStaticRouter } from '../helpers/base';
import type { NavigatorWrapper } from '../helpers/transition';
import { addStaticRouterWithPosition } from '../helpers/transition';
import { routeNames } from '../routes';
import { articleScreenMotion, screenInterpolator } from './article/transition';

const Dismissable = ({
	navigator,
	navigation,
}: {
	navigator: NavigationContainer;
} & NavigationInjectedProps) => {
	const Navigator = (navigator as unknown) as FunctionComponent<NavigationInjectedProps>;

	return (
		<SlideCard>
			<Navigator navigation={navigation} />
		</SlideCard>
	);
};

const BasicCardWrapper = ({
	navigator: Navigator,
	navigation,
}: {
	navigator: NavigationContainer;
} & NavigationInjectedProps) => {
	return (
		<>
			{navigation.getParam('prefersFullScreen') ? (
				<BasicArticleHeader />
			) : null}
			<Navigator navigation={navigation} />
		</>
	);
};

const styles = StyleSheet.create({
	root: {
		...StyleSheet.absoluteFillObject,
	},
	inner: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: color.background,
		height: '100%',
		flexGrow: 1,
		overflow: 'hidden',
		marginBottom: metrics.slideCardSpacing,
	},
	basicCard: { backgroundColor: color.background, overflow: 'hidden' },
});

const wrapInSlideCard: NavigatorWrapper = (navigator, getPosition) => {
	const Navigator = addStaticRouterWithPosition(navigator, getPosition);
	const Wrapper = ({ navigation }: NavigationInjectedProps) => {
		const position = getPosition();
		const originalPosition = getScreenPositionOfItem(
			navigation.getParam('path').article,
		);
		const window = useDimensions();

		const { height } = originalPosition;
		const {
			opacity,
			opacityOuter,
			scaler,
			transform,
			borderRadius,
		} = articleScreenMotion({
			position,
			originalPosition,
			window,
		});

		if (navigation.getParam('prefersFullScreen', false)) {
			return (
				<Animated.View
					style={[
						StyleSheet.absoluteFillObject,
						styles.basicCard,
						{
							transform: [
								{
									translateY: position.interpolate({
										inputRange: safeInterpolation([0, 1]),
										outputRange: safeInterpolation([
											200,
											0,
										]),
									}),
								},
							],
						},
						{
							opacity: position.interpolate({
								inputRange: safeInterpolation([0, 0.5]),
								outputRange: safeInterpolation([0, 1]),
							}),
						},
					]}
				>
					<BasicCardWrapper
						navigator={Navigator}
						navigation={navigation}
					/>
				</Animated.View>
			);
		}
		return (
			<Animated.View
				style={[
					styles.root,
					{
						transform,
					},
				]}
			>
				<ClipFromTop easing={position} from={height / scaler}>
					<Animated.View
						style={[
							styles.inner,
							{
								opacity: opacityOuter,
								borderRadius,
								minHeight: safeValue(height / scaler, 1000),
							},
						]}
					>
						<Animated.View
							style={[
								StyleSheet.absoluteFillObject,
								{
									height:
										window.height -
										metrics.slideCardSpacing,
								},
								{ opacity },
							]}
						>
							<Dismissable
								navigator={Navigator}
								navigation={navigation}
							/>
						</Animated.View>
					</Animated.View>
				</ClipFromTop>
			</Animated.View>
		);
	};
	return addStaticRouterWithPosition(
		addStaticRouter(navigator, Wrapper),
		getPosition,
	);
};

const createArticleNavigator = (
	front: NavigationRouteConfig,
	article: NavigationRouteConfig,
) => {
	let animatedValue = new Animated.Value(0);

	const navigation: Record<string, NavigationContainer> = {
		[routeNames.Issue]: addStaticRouterWithPosition(
			front,
			() => animatedValue,
		),
		[routeNames.Article]: wrapInSlideCard(article, () => animatedValue),
	};

	const transitionConfig = (transitionProps: NavigationTransitionProps) => {
		animatedValue = transitionProps.position;
		return {
			containerStyle: {
				backgroundColor: color.artboardBackground,
			},
			easing: Easing.elastic(1),
			screenInterpolator,
		};
	};

	return createStackNavigator(navigation, {
		initialRouteName: routeNames.Issue,
		defaultNavigationOptions: {
			gesturesEnabled: false,
		},
		headerMode: 'none',
		mode: 'modal',
		transparentCard: true,
		cardOverlayEnabled: true,
		transitionConfig,
	});
};

export { createArticleNavigator };
