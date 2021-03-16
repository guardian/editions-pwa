import {
	convertImageSizeToImageDescription,
	maxScreenSize,
	minScreenSize,
	screenSizeToImageSize,
} from '../screen';

const mock = jest.fn();

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
	get: mock,
}));

describe('helpers/screen', () => {
	beforeEach(mock.mockReset);
	describe('maxScreenSize', () => {
		it('should return the greater width value of 200', () => {
			mock.mockReturnValueOnce({ width: 200, height: 100 });
			expect(maxScreenSize()).toBe(200);
		});

		it('should return the greater height value of 500', () => {
			mock.mockReturnValueOnce({ width: 400, height: 500 });
			expect(maxScreenSize()).toBe(500);
		});

		it('should return 800 as the screen width and height are equal', () => {
			mock.mockReturnValueOnce({ width: 800, height: 800 });
			expect(maxScreenSize()).toBe(800);
		});
	});

	describe('minScreenSize', () => {
		it('should return the lesser width value of 100', () => {
			mock.mockReturnValueOnce({ width: 200, height: 100 });
			expect(minScreenSize()).toBe(100);
		});

		it('should return the lesser height value of 400', () => {
			mock.mockReturnValueOnce({ width: 400, height: 500 });
			expect(minScreenSize()).toBe(400);
		});

		it('should return 800 as the screen width and height are equal', () => {
			mock.mockReturnValueOnce({ width: 800, height: 800 });
			expect(minScreenSize()).toBe(800);
		});
	});

	describe('screenSizeToImageSize', () => {
		it('should provide the minimum value if the screen size is less than that value', () => {
			expect(screenSizeToImageSize(320)).toEqual(375);
		});

		it('should provide the minimum value if the screen size is equal to that value', () => {
			expect(screenSizeToImageSize(375)).toEqual(375);
		});

		it('should return the max possible value if the screen size is greater than that value', () => {
			expect(screenSizeToImageSize(1366)).toEqual(1140);
		});

		it('should return the max possible value if it equals that value', () => {
			expect(screenSizeToImageSize(1140)).toEqual(1140);
		});

		it('should return a middle value that is the bracket greater than the screen size provided', () => {
			expect(screenSizeToImageSize(900)).toEqual(980);
		});
	});

	describe('convertImageSizeToImageDescription', () => {
		it('should return "phone" if no screen size is provided', () => {
			expect(convertImageSizeToImageDescription(NaN)).toEqual('phone');
		});
		it('should return "phone" if an incorrect screen size is provided', () => {
			expect(convertImageSizeToImageDescription(-100)).toEqual('phone');
		});

		it('should return "phone" if a middling value is provided', () => {
			expect(convertImageSizeToImageDescription(1000)).toEqual('phone');
		});

		it('should return a correct size based on the value', () => {
			expect(convertImageSizeToImageDescription(980)).toEqual('tabletL');
		});
	});
});
