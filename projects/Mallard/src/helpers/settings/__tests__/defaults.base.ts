import { notificationTrackingUrl } from '../defaults';

const notificationId = '1234567890qwertyuio';

export const baseTests = ({
	receiveExpect,
	downloadedExpect,
	platform,
	env,
}: {
	receiveExpect: string;
	downloadedExpect: string;
	platform: 'iOS' | 'Android';
	env: 'CODE' | 'PROD';
}) =>
	describe(`${env} endpoint - ${platform}`, () => {
		beforeEach(() => {
			// @ts-expect-error: Cannot overide constant __DEV__ but need to for the test
			__DEV__ = env === 'CODE' ? true : false;
		});
		it('should provide a receive endpoint', () => {
			expect(notificationTrackingUrl(notificationId, 'received')).toEqual(
				receiveExpect,
			);
		});
		it('should provide a downloaded endpoint', () => {
			expect(
				notificationTrackingUrl(notificationId, 'downloaded'),
			).toEqual(downloadedExpect);
		});
	});
