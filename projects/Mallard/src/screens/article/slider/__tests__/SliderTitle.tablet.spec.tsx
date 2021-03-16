import { baseTests } from './SliderTitle-BaseTests';

jest.mock('react-native-device-info', () => ({
	isTablet: () => true,
}));

jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
	const Dimensions = {
		get: () => {
			return { width: 700, height: 100 };
		},
	};
	return Dimensions;
});

baseTests('SliderTitle - iOS - Tablet');
