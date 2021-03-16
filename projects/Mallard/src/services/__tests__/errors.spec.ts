import { ErrorServiceImpl } from '../errors';
import gql from 'graphql-tag';
import Observable from 'zen-observable';

jest.mock('src/helpers/release-stream', () => ({
	isInBeta: () => false,
}));
jest.mock('@sentry/react-native', () => ({
	init: jest.fn(),
	captureException: jest.fn(() => {}),
	setTag: jest.fn(() => {}),
	setExtra: jest.fn(() => {}),
}));

const QUERY = gql('{ gdprAllowPerformance @client }');

describe('errorService', () => {
	let errorService: ErrorServiceImpl;
	let Sentry: any;
	let apolloClient: any;
	let setMockedConsent: (value: boolean) => void;
	let consentFetchPromise: Promise<void>;

	beforeEach(() => {
		jest.resetModules();

		errorService = require('../errors').errorService;
		Sentry = require('@sentry/react-native');

		let hasConsent = false;
		const observers: any = [];

		const notify = () => {
			observers.forEach((observer: any) =>
				observer.next({
					data: { gdprAllowPerformance: hasConsent },
				}),
			);
		};

		setMockedConsent = (value: boolean) => {
			hasConsent = value;
			notify();
		};

		const watchQuery = (opts: any) => {
			expect(opts.query).toEqual(QUERY);
			return new Observable((observer) => {
				observers.push(observer);
				consentFetchPromise = Promise.resolve().then(notify);
			});
		};
		apolloClient = { watchQuery };
	});

	it('should not do anything before calling `init`', async () => {
		await Promise.resolve();
		errorService.captureException(new Error());

		expect(Sentry.init).not.toHaveBeenCalled();
		expect(Sentry.captureException).not.toHaveBeenCalled();
	});

	it('should default to not having consent', () => {
		errorService.init(apolloClient);

		errorService.captureException(new Error());

		expect(Sentry.init).not.toHaveBeenCalled();
		expect(Sentry.captureException).not.toHaveBeenCalled();
	});

	it('should install the if consent is set to true', async () => {
		setMockedConsent(true);
		errorService.init(apolloClient);
		await consentFetchPromise;

		expect(Sentry.init).toHaveBeenCalledTimes(1);
	});

	it('should not install without consent', async () => {
		errorService.init(apolloClient);
		await consentFetchPromise;

		expect(Sentry.init).not.toHaveBeenCalled();
	});

	it('should install only after consent is set to true', async () => {
		errorService.init(apolloClient);
		await consentFetchPromise;

		setMockedConsent(true);
		expect(Sentry.init).toHaveBeenCalledTimes(1);
	});

	it('should not fire errors without consent', async () => {
		errorService.init(apolloClient);
		await consentFetchPromise;

		errorService.captureException(new Error());
		expect(Sentry.captureException).not.toHaveBeenCalled();
	});

	it('should fire errors with consent', async () => {
		setMockedConsent(true);
		errorService.init(apolloClient);
		await consentFetchPromise;

		errorService.captureException(new Error());
		expect(Sentry.captureException).toHaveBeenCalledTimes(1);
	});

	it('should start firing errors if consent is granted in the app', async () => {
		errorService.init(apolloClient);
		await consentFetchPromise;

		errorService.captureException(new Error());
		expect(Sentry.captureException).not.toHaveBeenCalled();

		setMockedConsent(true);
		errorService.captureException(new Error());
		expect(Sentry.captureException).toHaveBeenCalledTimes(1);
	});

	it('should stop firing errors if consent is revoked in the app', async () => {
		setMockedConsent(true);
		errorService.init(apolloClient);
		await consentFetchPromise;

		errorService.captureException(new Error());
		expect(Sentry.captureException).toHaveBeenCalledTimes(1);

		setMockedConsent(false);
		errorService.captureException(new Error());
		expect(Sentry.captureException).toHaveBeenCalledTimes(1);
	});

	it('should queue errors that happen while waiting to determine whether we have consent and send them if we do', async () => {
		setMockedConsent(true);
		errorService.init(apolloClient);

		errorService.captureException(new Error());
		errorService.captureException(new Error());

		expect(Sentry.captureException).not.toHaveBeenCalled();

		await consentFetchPromise;

		expect(Sentry.captureException).toHaveBeenCalledTimes(2);
	});

	it('Crashlytics: should default to not having consent', async () => {
		errorService.init(apolloClient);
		await Promise.resolve();

		errorService.captureException(new Error());

		const crashlytics = errorService.crashlytics;
		expect(
			crashlytics.setCrashlyticsCollectionEnabled,
		).toHaveBeenCalledWith(false);

		expect(crashlytics.recordError).not.toHaveBeenCalled();
	});

	it('Crashlytics: should send exception to crashlytics', async () => {
		setMockedConsent(true);
		errorService.init(apolloClient);
		await consentFetchPromise;

		errorService.captureException(new Error());

		expect(errorService.crashlytics.recordError).toBeCalled();
	});
});
