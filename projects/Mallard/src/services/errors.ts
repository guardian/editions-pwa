import type { FirebaseCrashlyticsTypes } from '@react-native-firebase/crashlytics';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';
import type ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import Config from 'react-native-config';
import { isInBeta } from 'src/helpers/release-stream';
import type { GdprSwitchSetting } from 'src/helpers/settings';
import { Level, loggingService } from './logging';

const { SENTRY_DSN_URL } = Config;

type QueryData = { gdprAllowPerformance: GdprSwitchSetting };
const QUERY = gql('{ gdprAllowPerformance @client }');

export interface ErrorService {
	init(apolloClient: ApolloClient<object>): void;
	captureException(err: Error): void;
}

export class ErrorServiceImpl implements ErrorService {
	// Can be `null` or boolean. This is kinda confusing and easy to
	// handle improperly, but not easy to change it's already in prod.
	private hasConsent: GdprSwitchSetting;
	private hasSentryConfigured: boolean;
	private pendingQueue: Error[];

	crashlytics: FirebaseCrashlyticsTypes.Module;

	constructor() {
		this.hasConsent = null;
		this.hasSentryConfigured = false;
		this.pendingQueue = [];
		this.crashlytics = crashlytics();
	}

	public init(apolloClient: ApolloClient<object>) {
		apolloClient
			.watchQuery<QueryData>({ query: QUERY })
			.subscribe({
				next: (query) => {
					if (query.loading) return;
					this.handleConsentUpdate(query.data.gdprAllowPerformance);
				},
				error: (error) => {
					this.captureException(error);
				},
			});
	}

	private async handleConsentUpdate(hasConsent: GdprSwitchSetting) {
		this.hasConsent = hasConsent === true;
		console.log('setting consent: ', this.hasConsent);
		this.initSentry(this.hasConsent);
		await this.initCrashlytics(this.hasConsent);
	}

	initSentry(hasConsent: GdprSwitchSetting) {
		if (hasConsent === false) {
			console.log('Sentry initialized ignore, no user permission');
			return;
		}

		if (!this.hasSentryConfigured) {
			// sampleRate helps keep our sentry costs down
			Sentry.init({ dsn: SENTRY_DSN_URL, sampleRate: 0.2 });

			Sentry.setTag(
				'environment',
				__DEV__ ? 'DEV' : isInBeta() ? 'BETA' : 'RELEASE',
			);
			Sentry.setExtra('react', true);
			this.hasSentryConfigured = true;
			console.log('Sentry initialized');
		}

		while (this.pendingQueue.length > 0) {
			const err = this.pendingQueue.pop();
			if (err) {
				Sentry.captureException(err);
				this.crashlytics.recordError(err);
			}
		}
	}

	private async initCrashlytics(hasConsent: boolean): Promise<void> {
		console.log(
			'Crashlytics current status:',
			this.crashlytics.isCrashlyticsCollectionEnabled,
		);

		console.log('Setting crashlytics with user permission:', hasConsent);
		await this.crashlytics.setCrashlyticsCollectionEnabled(hasConsent);

		if (hasConsent) {
			this.crashlytics.log('Crashlytics initialized');
			await this.sendBasicAttributes();
			console.log('Crashlytics now initialized');
		} else {
			console.log('Crashlytics is now Disabled');
		}
	}

	private sendBasicAttributes = async () => {
		const data = await loggingService.basicLogInfo({
			level: Level.INFO,
			message: 'App Data',
		});

		this.crashlytics.setAttributes({
			signedIn: String(data.signedIn),
			hasCasCode: String(data.casCode !== null || data.casCode !== ''),
			hasDigiSub: String(data.digitalSub),
			networkStatus: data.networkStatus,
		});
	};

	/**
	 * If there is explicitly no consent, discard errors. If we don't know yet
	 * (`null`), store in a queue that will get logged when we get consent.
	 */
	public captureException(err: Error) {
		if (this.hasConsent === null) {
			this.pendingQueue.push(err);
		} else if (this.hasConsent) {
			Sentry.captureException(err);
			this.crashlytics.recordError(err);
		}
	}
}

export const errorService: ErrorService = new ErrorServiceImpl();
