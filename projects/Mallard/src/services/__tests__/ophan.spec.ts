import {
	setUserId,
	sendAppScreenEvent,
	sendComponentEvent,
	sendPageViewEvent,
	ComponentType,
	Action,
	ScreenTracking,
} from '../ophan';
import { NativeModules } from 'react-native';

jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => ({
	Ophan: {
		setUserId: jest.fn(),
		sendAppScreenEvent: jest.fn(),
		sendComponentEvent: jest.fn(),
		sendPageViewEvent: jest.fn(),
	},
}));

describe('services/ophan', () => {
	describe('setUserId', () => {
		it('should use the correct native module function', () => {
			setUserId('12345qwerty');
			expect(NativeModules.Ophan.setUserId).toHaveBeenCalled();
			expect(NativeModules.Ophan.setUserId).toHaveBeenCalledWith(
				'12345qwerty',
			);
		});
	});

	describe('sendAppScreenEvent', () => {
		it('should use the correct native module function at a basic level', () => {
			sendAppScreenEvent({ screenName: ScreenTracking.IssueList });
			expect(NativeModules.Ophan.sendAppScreenEvent).toHaveBeenCalled();
			expect(NativeModules.Ophan.sendAppScreenEvent).toHaveBeenCalledWith(
				'issue_list',
				undefined,
			);
		});

		it('should use the correct native module function with optional values', () => {
			sendAppScreenEvent({
				screenName: ScreenTracking.IssueList,
				value: '2019-08-30',
			});
			expect(NativeModules.Ophan.sendAppScreenEvent).toHaveBeenCalled();
			expect(NativeModules.Ophan.sendAppScreenEvent).toHaveBeenCalledWith(
				'issue_list',
				'2019-08-30',
			);
		});
	});

	describe('sendComponentEvent', () => {
		it('should use the correct native module function with basic values', () => {
			sendComponentEvent({
				componentType: ComponentType.appVideo,
				action: Action.view,
			});
			expect(NativeModules.Ophan.sendComponentEvent).toHaveBeenCalled();
			expect(NativeModules.Ophan.sendComponentEvent).toHaveBeenCalledWith(
				'APP_VIDEO',
				'VIEW',
				undefined,
				undefined,
			);
		});

		it('should use the correct native module function with optional values', () => {
			sendComponentEvent({
				componentType: ComponentType.appVideo,
				action: Action.view,
				value: 'youtube/politicalvideo',
				componentId: '12345qwerty',
			});
			expect(NativeModules.Ophan.sendComponentEvent).toHaveBeenCalled();
			expect(NativeModules.Ophan.sendComponentEvent).toHaveBeenCalledWith(
				'APP_VIDEO',
				'VIEW',
				'youtube/politicalvideo',
				'12345qwerty',
			);
		});
	});

	describe('sendPageViewEvent', () => {
		it('should use the correct native module function', () => {
			sendPageViewEvent({
				path: 'uk/politics/no-deal-brexit',
			});
			expect(NativeModules.Ophan.sendPageViewEvent).toHaveBeenCalled();
			expect(NativeModules.Ophan.sendPageViewEvent).toHaveBeenCalledWith(
				'uk/politics/no-deal-brexit',
			);
		});
	});
});
