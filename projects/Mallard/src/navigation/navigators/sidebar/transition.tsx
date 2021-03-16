import { Dimensions, StyleSheet } from 'react-native';
import type { NavigationTransitionProps } from 'react-navigation';
import { safeInterpolation } from 'src/helpers/math';
import { routeNames } from 'src/navigation/routes';
import { Breakpoints } from 'src/theme/breakpoints';
import { sidebarWidth } from './positions';

export const mainLayerTransition = () => {
	return {
		overflow: 'hidden',
		zIndex: -1,
		elevation: -1,
		...StyleSheet.absoluteFillObject,
	};
};

export const sidebarLayerTransition = (
	position: NavigationTransitionProps['position'],
	sceneIndex: number,
	reverse?: boolean,
) => {
	const { width } = Dimensions.get('window');
	const isTablet = width >= Breakpoints.tabletVertical;

	const outputRangeStart =
		isTablet && reverse ? width : isTablet ? sidebarWidth : width;
	const outputRangeStartCheckReverse = reverse
		? -outputRangeStart
		: outputRangeStart;

	const outputRangeEnd = isTablet && reverse ? -(width - sidebarWidth) : 0;

	const translateX = position.interpolate({
		inputRange: safeInterpolation([sceneIndex - 1, sceneIndex]),
		outputRange: safeInterpolation([
			outputRangeStartCheckReverse,
			outputRangeEnd,
		]),
	});

	return {
		zIndex: 0,
		elevation: 0,
		transform: [{ translateX }],
		overflow: 'hidden',
	};
};

const screenInterpolator = (sceneProps: NavigationTransitionProps) => {
	const { scene } = sceneProps;
	if (scene.route.routeName === '_') {
		return mainLayerTransition();
	}
	const reverse =
		scene.route.routeName === routeNames.EditionsMenu ? true : false;
	return sidebarLayerTransition(
		sceneProps.position,
		sceneProps.scene.index,
		reverse,
	);
};

export { screenInterpolator };
