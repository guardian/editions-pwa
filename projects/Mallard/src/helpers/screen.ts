import AsyncStorage from '@react-native-community/async-storage';
import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { largeDeviceMemory } from 'src/hooks/use-config-provider';
import type { ImageSize } from '../../../Apps/common/src';
import { imageSizes, sizeDescriptions } from '../../../Apps/common/src';

export const maxScreenSize = (): number => {
	const { width, height } = Dimensions.get('window');
	return Math.max(width, height);
};

export const minScreenSize = (): number => {
	const { width, height } = Dimensions.get('window');
	return Math.min(width, height);
};

export const screenSizeToImageSize = (screenSize: number): number => {
	const allSizes = Object.values(sizeDescriptions);
	const minPossibleSize = Math.min(...allSizes);
	if (screenSize <= minPossibleSize) {
		return minPossibleSize;
	}

	const maxPossibleSize = Math.max(...allSizes);
	if (screenSize >= maxPossibleSize) {
		return maxPossibleSize;
	}

	const availableSizes: number[] = Object.values(sizeDescriptions).filter(
		(size) => screenSize <= size,
	);
	return Math.min(...availableSizes);
};

export const convertImageSizeToImageDescription = (
	screenSize: number,
): ImageSize => {
	if (!screenSize) {
		return 'phone';
	}
	const imageSize = Object.keys(sizeDescriptions).find(
		(size) => sizeDescriptions[size as ImageSize] === screenSize,
	);
	return (imageSize as ImageSize) || 'phone';
};

const IMAGE_SIZE_KEY = '@image_size';

export const imageForScreenSize = async (): Promise<ImageSize> => {
	const persisted = await AsyncStorage.getItem(IMAGE_SIZE_KEY);
	const persistedSize = imageSizes.find((_) => _ == persisted);
	if (persistedSize != undefined) {
		return persistedSize;
	}

	// Provide only phone images for low powered devices
	const largeAmountOfMemory = await largeDeviceMemory();
	if (!largeAmountOfMemory) {
		return 'phone';
	}

	const isTablet = DeviceInfo.isTablet();
	const screenSize = isTablet ? maxScreenSize() : minScreenSize();
	const size = convertImageSizeToImageDescription(
		screenSizeToImageSize(screenSize),
	);
	await AsyncStorage.setItem(IMAGE_SIZE_KEY, size);
	return size;
};

/**
 * Fetch only ever once.
 */
export const createImageSizeResolver = () => {
	const imageSize = imageForScreenSize();
	return () => imageSize;
};
