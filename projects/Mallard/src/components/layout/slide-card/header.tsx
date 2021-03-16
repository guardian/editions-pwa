import React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { safeInterpolation } from 'src/helpers/math';
import { useDismissArticle } from 'src/hooks/use-dismiss-article';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { Chevron } from '../../chevron';

const styles = StyleSheet.create({
	headerContainer: {
		height: metrics.headerHeight,
		zIndex: 90,
		alignContent: 'stretch',
		justifyContent: 'center',
		backgroundColor: color.background,
		borderColor: color.line,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	headerChevronContainer: {
		flex: 1,
		width: '100%',
		paddingHorizontal: metrics.horizontal,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 20,
	},
});

const Header = () => {
	const { panResponder, scrollY, onDismiss } = useDismissArticle();
	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={[styles.headerContainer]}
		>
			<TouchableWithoutFeedback
				onPress={onDismiss}
				accessibilityHint="Go back"
			>
				<Animated.View
					style={[
						styles.headerChevronContainer,
						{
							transform: [
								{
									translateY: scrollY.interpolate({
										inputRange: safeInterpolation([0, 100]),
										outputRange: safeInterpolation([
											metrics.headerHeight / -10,
											0,
										]),
										extrapolate: 'clamp',
									}),
								},
							],
						},
					]}
				>
					<Chevron color={color.text} />
				</Animated.View>
			</TouchableWithoutFeedback>
		</Animated.View>
	);
};

export { Header };
