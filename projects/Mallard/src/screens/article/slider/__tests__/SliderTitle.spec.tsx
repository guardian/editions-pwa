import { baseTests } from './SliderTitle-BaseTests';

jest.mock('react-native-device-info', () => ({
	isTablet: () => false,
}));

jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
	const Dimensions = {
		get: () => {
			return { width: 400, height: 100 };
		},
	};
	return Dimensions;
});

baseTests('SliderTitle - iOS - Mobile');
