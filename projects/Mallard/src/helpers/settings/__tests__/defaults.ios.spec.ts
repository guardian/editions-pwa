import { baseTests } from './defaults.base';

describe('defaults', () => {
	describe('notificationTrackingUrl', () => {
		baseTests({
			platform: 'iOS',
			env: 'CODE',
			receiveExpect:
				'https://mobile-events.code.dev-guardianapis.com/notification/received?notificationId=1234567890qwertyuio&platform=ios-edition',
			downloadedExpect:
				'https://mobile-events.code.dev-guardianapis.com/notification/downloaded?notificationId=1234567890qwertyuio&platform=ios-edition',
		});

		baseTests({
			platform: 'iOS',
			env: 'PROD',
			receiveExpect:
				'https://mobile-events.guardianapis.com/notification/received?notificationId=1234567890qwertyuio&platform=ios-edition',
			downloadedExpect:
				'https://mobile-events.guardianapis.com/notification/downloaded?notificationId=1234567890qwertyuio&platform=ios-edition',
		});
	});
});
