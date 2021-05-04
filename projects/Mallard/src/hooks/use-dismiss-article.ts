import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import { safeInterpolation } from 'src/helpers/math';

export const useDismissArticle = () => {
	const navigation = useNavigation();
	const [scrollY] = useState(() => new Animated.Value(0));
	const pos = new Animated.Value(1);

	const onDismiss = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const attachPos = useCallback(() => {
		Animated.timing(pos, {
			toValue: scrollY.interpolate({
				inputRange: safeInterpolation([0, 60]),
				outputRange: safeInterpolation([1, 0.8]),
			}),
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
