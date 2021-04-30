import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { HeadlineText } from 'src/components/styled-text';
import { safeInterpolation } from 'src/helpers/math';
import { useMediaQuery } from 'src/hooks/use-screen';
import { useToastList } from 'src/hooks/use-toast';
import { Breakpoints } from 'src/theme/breakpoints';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { getFont } from 'src/theme/typography';
import { UiBodyCopy } from '../styled-text';

export interface ToastProps {
	title: string;
	subtitle?: string;
}
export type ToastList = ToastProps[];

const styles = StyleSheet.create({
	toast: {
		backgroundColor: color.palette.highlight.main,
		padding: metrics.sides,
		paddingTop: metrics.vertical / 2,
		paddingBottom: metrics.vertical * 2,
		borderColor: color.palette.highlight.dark,
		borderTopWidth: 1,
	},
	title: getFont('headline', 1, 'bold'),
});

const Toast = ({ title, subtitle }: ToastProps) => {
	const isTablet = useMediaQuery(
		(width) => width >= Breakpoints.TabletVertical,
	);
	const [position] = useState(() => new Animated.Value(0));
	useEffect(() => {
		Animated.spring(position, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	}, [position]);
	return (
		<Animated.View
			style={[
				styles.toast,
				isTablet && {
					paddingHorizontal: metrics.sides,
				},
				{
					transform: [
						{
							translateY: position.interpolate({
								inputRange: safeInterpolation([0, 1]),
								outputRange: safeInterpolation([50, 0]),
							}),
						},
					],
				},
			]}
		>
			<HeadlineText style={styles.title}>{title}</HeadlineText>
			{subtitle && <UiBodyCopy>{subtitle}</UiBodyCopy>}
		</Animated.View>
	);
};

const holderStyles = StyleSheet.create({
	root: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
});

const ToastRootHolder = () => {
	const toasts = useToastList();
	return (
		<View style={holderStyles.root}>
			{toasts.map((toast, i) => (
				<Toast {...toast} key={`${i}${toast.title}`} />
			))}
		</View>
	);
};

export { Toast, ToastRootHolder };
