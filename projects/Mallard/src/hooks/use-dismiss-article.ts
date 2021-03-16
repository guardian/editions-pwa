import { useCallback, useContext, useMemo, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import { NavigationContext } from 'react-navigation';
import { safeInterpolation } from 'src/helpers/math';
import { useNavigatorPosition } from 'src/navigation/helpers/transition';

export const useDismissArticle = () => {
	const navigation = useContext(NavigationContext);
	const [scrollY] = useState(() => new Animated.Value(0));
	const pos = useNavigatorPosition();

	const onDismiss = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const attachPos = useCallback(() => {
		Animated.timing(pos, {
			toValue: scrollY.interpolate({
				inputRange: safeInterpolation([0, 60]),
				outputRange: safeInterpolation([1, 0.8]),
			}) as Animated.Value,
			duration: 0,
			useNativeDriver: true,
		}).start();
	}, [pos, scrollY]);

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onMoveShouldSetPanResponder: (ev, gestureState) => {
					if (gestureState.dy > 1) {
						attachPos();
						return true;
					}
					return false;
				},
				onStartShouldSetPanResponder: () => false,
				onPanResponderMove: Animated.event([
					null,
					{
						dy: scrollY,
					},
				]),
				onPanResponderEnd: (ev, gestureState) => {
					if (gestureState.dy > 50) {
						onDismiss();
						scrollY.stopAnimation();
						return;
					}
					Animated.timing(scrollY, {
						useNativeDriver: true,
						toValue: 0,
						duration: 200,
					}).start();
				},
			}),
		[onDismiss, scrollY, attachPos],
	);

	return {
		scrollY,
		panResponder,
		onDismiss,
	};
};
