import { authWithDeepRedirect } from '../deep-link-auth';
import { EventEmitter } from 'events';
import {
	RedirectResult,
	BrowserResult,
} from 'react-native-inappbrowser-reborn';

const createListener = (): EventEmitter & {
	addEventListener: EventEmitter['addListener'];
	removeEventListener: EventEmitter['removeListener'];
} => {
	const ee: any = new EventEmitter();
	ee.addEventListener = ee.addListener;
	ee.removeEventListener = ee.removeListener;
	return ee;
};

type AuthSessionResult = RedirectResult | BrowserResult;

const createInAppBrowser = ({
	available = true,
	result,
}: {
	available?: boolean;
	result?: AuthSessionResult;
} = {}) => ({
	openAuth: () =>
		new Promise<AuthSessionResult>((res) => {
			if (result == null) throw new Error('missing result');
			return res(result);
		}),
	closeAuth: jest.fn(() => {}),
	isAvailable: () => Promise.resolve(available),
});

describe('deep-link-auth', () => {
	describe('authWithDeepRedirect', () => {
		describe('external link', () => {
			it('waits for a deep link with a token before resolving', async () => {
				const linking = Object.assign(createListener(), {
					openURL: () => {
						// Only emit the url once we actually opened the
						// original. Must be asynchronous for consistency with
						// real behavior.
						setImmediate(() => {
							linking.emit('url', { url: 'callback://url' });
						});
					},
				});
				const appState = createListener();
				const validator = jest.fn(async () => 'token');

				const val = await authWithDeepRedirect(
					'https://authurl.com/auth',
					'callback://url',
					validator,
					linking,
					appState,
					createInAppBrowser({ available: false }),
				);

				expect(val).toBe('token');
				expect(validator).toBeCalledWith('callback://url');
			});

			it('will throw if the app is foregrounded without a deep link', async () => {
				const appState = createListener();
				const linking = Object.assign(createListener(), {
					openURL: () => {
						setImmediate(() => {
							appState.emit('change', 'active');
							// This should not be able to save us,
							// the error should already be fired.
							linking.emit('url', { url: 'callback://url' });
						});
					},
				});
				const validator = jest.fn(async () => 'token');

				const promise = authWithDeepRedirect(
					'https://authurl.com/auth',
					'callback://url',
					validator,
					linking,
					appState,
					createInAppBrowser({ available: false }),
				);

				await expect(promise).rejects.toBe('Sign-in cancelled');
			});

			it('ignores the app being backgrounded and continues to wait for a deep link with a token before resolving', async () => {
				const appState = createListener();
				const linking = Object.assign(createListener(), {
					openURL: () => {
						setImmediate(() => {
							appState.emit('change', 'inactive');
							linking.emit('url', { url: 'callback://url' });
						});
					},
				});
				const validator = jest.fn(async () => 'token');

				const val = await authWithDeepRedirect(
					'https://authurl.com/auth',
					'callback://url',
					validator,
					linking,
					appState,
					createInAppBrowser({ available: false }),
				);

				expect(val).toBe('token');
				expect(validator).toBeCalledWith('callback://url');
			});

			it('will throw if the validator throws', async () => {
				const linking = Object.assign(createListener(), {
					openURL: () => {
						setImmediate(() => {
							linking.emit('url', { url: 'callback://url' });
						});
					},
				});
				const appState = createListener();
				const validator = jest.fn(async () => {
					throw 'hi';
				});

				const promise = authWithDeepRedirect(
					'https://authurl.com/auth',
					'callback://url',
					validator,
					linking,
					appState,
					createInAppBrowser({ available: false }),
				);

				await expect(promise).rejects.toBe('hi');
			});
		});

		describe('in app browser', () => {
			it('waits for a deep link with a token before resolving, and then closes browser', async () => {
				const linking = Object.assign(createListener(), {
					openURL: () => {
						throw new Error('should not be called');
					},
				});
				const appState = createListener();
				const validator = jest.fn(async () => 'token');
				const browser = createInAppBrowser({
					available: true,
					result: { type: 'success', url: 'callback://url' },
				});

				const val = await authWithDeepRedirect(
					'https://authurl.com/auth',
					'callback://url',
					validator,
					linking,
					appState,
					browser,
				);

				expect(val).toBe('token');
				expect(validator).toBeCalledWith('callback://url');
				expect(browser.closeAuth).toBeCalled();
			});

			it('will throw if the validator throws, and will close the in app browser', async () => {
				const linking = Object.assign(createListener(), {
					openURL: () => {
						throw new Error('should not be called');
					},
				});
				const appState = createListener();
				const validator = jest.fn(async () => {
					throw 'hi';
				});
				const browser = createInAppBrowser({
					available: true,
					result: { type: 'success', url: 'callback://url' },
				});

				const promise = authWithDeepRedirect(
					'https://authurl.com/auth',
					'callback://url',
					validator,
					linking,
					appState,
					browser,
				);

				await expect(promise).rejects.toBe('hi');
				expect(browser.closeAuth).toBeCalled();
			});

			it('will throw if the in app browser is closed', async () => {
				const linking = Object.assign(createListener(), {
					openURL: () => {
						throw new Error('should not be called');
					},
				});
				const appState = createListener();
				const validator = jest.fn(async () => 'token');
				const browser = createInAppBrowser({
					available: true,
					result: { type: 'cancel' },
				});

				const promise = authWithDeepRedirect(
					'https://authurl.com/auth',
					'callback://url',
					validator,
					linking,
					appState,
					browser,
				);

				await expect(promise).rejects.toBe('Sign-in cancelled');
				expect(browser.closeAuth).toBeCalled();
			});
		});
	});
});
