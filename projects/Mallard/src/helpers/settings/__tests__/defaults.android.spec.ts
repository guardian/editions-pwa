import { baseTests } from './defaults.base';

describe('defaults', () => {
	describe('notificationTrackingUrl', () => {
		beforeEach(() => {
			jest.mock('react-native/Libraries/Utilities/Platform', () => {
				const Platform = require.requireActual(
					'react-native/Libraries/Utilities/Platform',
				);
				Platform.OS = 'android';
				return Platform;
			});
		});
		baseTests({
			platform: 'Android',
			env: 'CODE',
			receiveExpect:
				'https://mobile-events.code.dev-guardianapis.com/notification/received?notificationId=1234567890qwertyuio&platform=android-edition',
			downloadedExpect:
				'https://mobile-events.code.dev-guardianapis.com/notification/downloaded?notificationId=1234567890qwertyuio&platform=android-edition',
		});

		baseTests({
			platform: 'Android',
			env: 'PROD',
			receiveExpect:
				'https://mobile-events.guardianapis.com/notification/received?notificationId=1234567890qwertyuio&platform=android-edition',
			downloadedExpect:
				'https://mobile-events.guardianapis.com/notification/downloaded?notificationId=1234567890qwertyuio&platform=android-edition',
		});
	});
});
