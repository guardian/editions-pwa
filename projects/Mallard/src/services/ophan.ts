// Based on: https://github.com/guardian/ophan/blob/master/event-model/src/main/thrift/componentevent.thrift

import { NativeModules } from 'react-native';

enum ComponentType {
	appButton = 'APP_BUTTON',
	appVideo = 'APP_VIDEO',
	appAudio = 'APP_AUDIO',
}

enum Action {
	click = 'CLICK',
	view = 'VIEW',
}

interface TrackScreen {
	screenName: ScreenTracking;
	value?: string;
}

interface TrackComponentEvent {
	componentType: ComponentType;
	action: Action;
	value?: string;
	componentId?: string;
}

type UserId = string | null;

enum ScreenTracking {
	AlreadySubscribed = 'im_already_subscribed',
	CasSignIn = 'activate_with_subscriber_id',
	Credits = 'credits',
	Deprecation = 'deprecatted_app_screen',
	Help = 'help',
	FAQ = 'faqs',
	GDPRConsent = 'consent_management_options',
	GdprConsentScreenForOnboarding = 'consent_management',
	IssueList = 'issue_list',
	PrivacyPolicy = 'privacy_policy',
	Settings = 'settings',
	SignIn = 'sign_in',
	TermsAndConditions = 'terms_conditions',
}

export type ScreenTrackingMapping = keyof typeof ScreenTracking;

const setUserId = (userId: UserId): Promise<UserId> =>
	NativeModules.Ophan.setUserId(userId);

const sendAppScreenEvent = async ({
	screenName,
	value,
}: TrackScreen): Promise<boolean> =>
	NativeModules.Ophan.sendAppScreenEvent(screenName, value);

const sendComponentEvent = ({
	componentType,
	action,
	value,
	componentId,
}: TrackComponentEvent) =>
	NativeModules.Ophan.sendComponentEvent(
		componentType,
		action,
		value,
		componentId,
	);

const sendPageViewEvent = ({ path }: { path: string }) =>
	NativeModules.Ophan.sendPageViewEvent(path);

export {
	Action,
	ComponentType,
	sendAppScreenEvent,
	sendComponentEvent,
	sendPageViewEvent,
	setUserId,
	ScreenTracking,
};
