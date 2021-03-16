import React from 'react';
import {
	Animated,
	Dimensions,
	Image,
	Platform,
	StyleSheet,
	View,
} from 'react-native';
import { safeInterpolation } from 'src/helpers/math';
import { useLargeDeviceMemory } from 'src/hooks/use-config-provider';
import { useNavigatorPosition } from 'src/navigation/helpers/transition';

/*
This is part of the transition from articles to fronts
and it fades content in and out with a user chosen delay.

The build order goes up/down according to screen position
*/

export interface PropTypes {
	children: any;
}

const faderStyles = StyleSheet.create({
	wrapper: { width: '100%' },
});

const Fader = ({ children }: PropTypes) => {
	const position = useNavigatorPosition();
	const { height } = Dimensions.get('window');
	const largeDeviceMemeory = useLargeDeviceMemory();

	if (Platform.OS === 'android' || !largeDeviceMemeory) return children;

	return (
		<View
			style={{ backgroundColor: 'white', height: '100%', width: '100%' }}
		>
			{children}
			<Animated.View
				style={[
					{
						...StyleSheet.absoluteFillObject,
						height: height * 2,
						top: -height,
						transform: [
							{
								translateY: position.interpolate({
									inputRange: safeInterpolation([0, 0.4, 1]),
									outputRange: safeInterpolation([
										0,
										0,
										height * 2,
									]),
								}),
							},
						],
					},
					faderStyles.wrapper,
				]}
			>
				<Image
					resizeMode="stretch"
					style={[
						StyleSheet.absoluteFillObject,
						{ width: '100%', height: '100%' },
					]}
					source={require('./fade.png')}
				></Image>
			</Animated.View>
		</View>
	);
};

export { Fader };
