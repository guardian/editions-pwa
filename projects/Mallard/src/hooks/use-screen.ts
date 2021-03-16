import { currentInsets } from '@delightfulstudio/react-native-safe-area-insets';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDimensions } from 'src/hooks/use-config-provider';

const useMediaQuery = (condition: (width: number) => boolean): boolean => {
	const { width } = useDimensions();
	return condition(width);
};

const useInsets = () => {
	const [insets, setInsets] = useState({
		left: 0,
		top: getStatusBarHeight(true),
		bottom: 0,
		right: 0,
	});
	useEffect(() => {
		let localSetInsets = setInsets;
		const updateInsets = () => {
			currentInsets().then((insets) => {
				localSetInsets({
					...insets,
					top: insets.top ? insets.top : getStatusBarHeight(true),
				});
			});
		};
		updateInsets();
		Dimensions.addEventListener('change', () => {
			requestAnimationFrame(() => {
				updateInsets();
			});
		});
		return () => void (localSetInsets = () => {});
	}, []);
	return insets;
};

export { useInsets, useMediaQuery };
