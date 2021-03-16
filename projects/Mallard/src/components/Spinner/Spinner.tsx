import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ariaHidden } from 'src/helpers/a11y';
import { safeInterpolation } from 'src/helpers/math';
import { useLargeDeviceMemory } from 'src/hooks/use-config-provider';
import { color } from 'src/theme/color';

const styles = StyleSheet.create({
	ball: {
		width: 22,
		height: 22,
		margin: 2,
		borderRadius: 100,
	},
	container: { flexDirection: 'row', padding: 5 },
});

const pillars = [
	color.palette.news.main,
	color.palette.opinion.main,
	color.palette.sport.main,
	color.palette.culture.main,
	color.palette.lifestyle.main,
];

const StaticBall = ({ color }: { color: string }) => {
	return (
		<Animated.View
			style={[styles.ball, { backgroundColor: color }]}
		></Animated.View>
	);
};

const Ball = ({ color, jump }: { color: string; jump: Animated.Value }) => {
	return (
		<Animated.View
			style={[
				styles.ball,
				{ backgroundColor: color },
				{
					transform: [
						{
							scale: jump.interpolate({
								inputRange: safeInterpolation([0, 1]),
								outputRange: safeInterpolation([0.8, 1]),
							}),
						},
					],
				},
			]}
		></Animated.View>
	);
};

const animateJumps = (value: Animated.Value, delay = 0) => {
	const makeTimingConfig = (toValue: number) => ({
		toValue,
		duration: 400,
		useNativeDriver: true,
	});

	return Animated.sequence([
		Animated.delay(200 * delay),
		Animated.loop(
			Animated.sequence([
				Animated.timing(value, makeTimingConfig(1)),
				Animated.timing(value, makeTimingConfig(0)),
				Animated.timing(value, makeTimingConfig(0)),
			]),
		),
	]);
};

const Spinner = () => {
	const largeDeviceMemory = useLargeDeviceMemory();
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	const [jumps] = useState(() => [
		new Animated.Value(0),
		new Animated.Value(0),
		new Animated.Value(0),
		new Animated.Value(0),
		new Animated.Value(0),
	]);

	useEffect(() => {
		Animated.parallel(jumps.map((j, i) => animateJumps(j, i))).start();
	}, []);
	// Ignored linter rule because we don't want to interfere with the animation
	return (
		<View accessibilityLabel={'Loading content'}>
			{visible && (
				<View {...ariaHidden} style={styles.container}>
					{pillars.map((color, index) =>
						largeDeviceMemory ? (
							<Ball
								key={index}
								jump={jumps[index]}
								color={color}
							/>
						) : (
							<StaticBall key={index} color={color} />
						),
					)}
				</View>
			)}
		</View>
	);
};

export { Spinner };
