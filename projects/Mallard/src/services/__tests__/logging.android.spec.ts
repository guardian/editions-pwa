import { Level, Logging } from '../logging';
import MockDate from 'mockdate';

MockDate.set('2019-08-21');
jest.mock('src/helpers/release-stream', () => ({
	isInBeta: () => false,
}));
jest.mock('react-native/Libraries/Utilities/Platform', () => {
	const Platform = require.requireActual(
		'react-native/Libraries/Utilities/Platform',
	);
	Platform.OS = 'android';
	return Platform;
});

describe('logging service (Android and Release)', () => {
	describe('baseLog', () => {
		it('should return a log object that matches the snapshot', async () => {
			const loggingService = new Logging();
			loggingService.getExternalInfo = jest.fn().mockReturnValue({
				networkStatus: { type: 'wifi' },
				userData: {
					userDetails: { id: 'testId' },
					membershipData: {
						contentAccess: { digitalPack: true },
					},
				},
				casCode: 'QWERTYUIOP',
				iapReceipt: true,
			});
			const log = await loggingService.baseLog({
				level: Level.INFO,
				message: 'test log',
				optionalFields: { id: 'test' },
			});
			expect(log).toMatchSnapshot();
		});
	});
});
