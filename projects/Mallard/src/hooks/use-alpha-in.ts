import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useAlphaIn = (
	duration: number,
	{
		initialValue = 0,
		currentValue = 1,
		easing = Easing.linear,
		out = false,
	} = {},
) => {
	const animated = useRef(new Animated.Value(initialValue));

	useEffect(() => {
		const { current: val } = animated;
		Animated.timing(val, {
			duration,
			toValue: currentValue,
			easing,
			useNativeDriver: true,
		}).start();

		return () => {
			if (out) {
				Animated.timing(val, {
					duration,
					toValue: initialValue,
					easing,
					useNativeDriver: true,
				}).start();
			}
		};
	}, [duration, currentValue, easing, out, initialValue]); // ignore changes to easing

	return animated.current;
};

export { useAlphaIn };
