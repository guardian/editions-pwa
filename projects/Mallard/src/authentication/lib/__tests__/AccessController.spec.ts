import { Authorizer, AsyncCache } from '../Authorizer';
import { AccessController } from '../AccessController';
import { AnyAttempt } from '../Attempt';
import { AuthResult, ValidResult, InvalidResult } from '../Result';

class AsyncStorage<T> {
	constructor(private data: T | null = null) {}
	async get() {
		return this.data;
	}
	async set(data: T) {
		this.data = data;
	}

	async reset() {
		this.data = null;
	}
}

export { AsyncStorage };

type UserData = { id: string };

const getValidUserData = async (): Promise<AuthResult<UserData>> =>
	ValidResult({
		id: '123',
	});

const getInvalidUserData = async (): Promise<AuthResult<UserData>> =>
	InvalidResult();

const createSimpleAccessController = ({
	existingOfflineCache = false,
	invalidFromLiveCredentials = false,
	invalidFromCachedCredentials = false,
	grantAccessFromUserData = true,
	existingValidAttempt = false,
} = {}) => {
	let attempt: AnyAttempt<string> | null = null;

	const handler = (_attempt: AnyAttempt<string>) => {
		attempt = _attempt;
	};
	const cache = new AsyncStorage<UserData>(
		existingOfflineCache ? { id: '123' } : undefined,
	);

	const validAttemptCache = new AsyncStorage<number>(
		existingValidAttempt ? Date.now() : undefined,
	);

	const controller = new AccessController(
		{
			a: new Authorizer({
				name: 'a',
				userDataCache: cache,
				authCaches: [] as AsyncCache<any>[],
				auth: invalidFromLiveCredentials
					? getInvalidUserData
					: getValidUserData,
				authWithCachedCredentials: invalidFromCachedCredentials
					? getInvalidUserData
					: getValidUserData,
				checkUserHasAccess: () => grantAccessFromUserData,
			}),
		},
		validAttemptCache,
	);

	controller.subscribe(handler);

	attempt = controller.getAttempt();

	return {
		cache,
		controller,
		validAttemptCache,
		attempt: {
			// this allows us to read an attempt as seen by a subscriber
			get current() {
				return attempt;
			},
		},
	};
};

describe('AccessController', () => {
	it('handles errors from an Authorizer', async () => {
		let attempt: AnyAttempt<string> | null = null;

		const handler = (_attempt: AnyAttempt<string>) => {
			attempt = _attempt;
		};

		const cache = new AsyncStorage<UserData>({ id: '123' });

		const validAttemptCache = new AsyncStorage<number>();

		const controller = new AccessController(
			{
				a: new Authorizer({
					name: 'a',
					userDataCache: cache,
					authCaches: [] as AsyncCache<any>[],
					auth: async () => {
						throw new Error();
					},
					authWithCachedCredentials: getValidUserData,
					checkUserHasAccess: () => true,
				}),
			},
			validAttemptCache,
		);

		controller.subscribe(handler);

		await controller.authorizerMap.a.runAuth();

		expect(controller.authorizerMap.a.getAccessAttempt()).toMatchObject({
			type: 'invalid-attempt',
		});

		expect(attempt).toMatchObject({
			connectivity: 'online',
			type: 'invalid-attempt',
		});
	});

	describe('handleConnectionStatusChanged', () => {
		it('the access contoller is initialised with an attempt of not-run', async () => {
			const { attempt } = createSimpleAccessController();

			expect(attempt.current).toMatchObject({
				type: 'not-run-attempt',
			});
		});

		it('runs the offline auth methods when the first connection status is offline', async () => {
			const { controller, attempt } = createSimpleAccessController();

			await controller.handleConnectionStatusChanged(false);

			expect(attempt.current).toMatchObject({
				connectivity: 'offline',
			});
		});

		it('returns an invalid offline attempt if there is nothing in the userData cache of any of the validators', async () => {
			const { controller, attempt } = createSimpleAccessController();

			await controller.handleConnectionStatusChanged(false);

			expect(attempt.current).toMatchObject({
				connectivity: 'offline',
				type: 'invalid-attempt',
			});
		});

		it('returns a valid offline attempt if there is something in the userData cache of any of the validators', async () => {
			const { controller, attempt } = createSimpleAccessController({
				existingOfflineCache: true,
			});

			await controller.handleConnectionStatusChanged(false);

			expect(attempt.current).toMatchObject({
				connectivity: 'offline',
				type: 'valid-attempt',
				data: 'a', // the name of the validator that it succeeded with
			});
		});

		it('replaces offline attempts with online attempts where possible, even if the online attempt invalidates a valid offline attempt', async () => {
			const { controller, attempt } = createSimpleAccessController({
				existingOfflineCache: true,
				invalidFromCachedCredentials: true,
				grantAccessFromUserData: false,
			});

			await controller.handleConnectionStatusChanged(false);
			await controller.handleConnectionStatusChanged(true);

			expect(attempt.current).toMatchObject({
				connectivity: 'online',
				type: 'invalid-attempt',
			});
		});

		it('does not replace online attempts with offline attempts, even if the offline attempt validates an invalid offline attempt', async () => {
			const { controller, attempt } = createSimpleAccessController({
				existingOfflineCache: true,
				invalidFromCachedCredentials: true,
				grantAccessFromUserData: false,
			});

			await controller.handleConnectionStatusChanged(true);
			await controller.handleConnectionStatusChanged(false);

			expect(attempt.current).toMatchObject({
				connectivity: 'online',
				type: 'invalid-attempt',
			});
		});

		it('returns valid offline attempt when previous auth is valid', async () => {
			const { controller, attempt } = createSimpleAccessController({
				existingOfflineCache: true,
				grantAccessFromUserData: true,
				existingValidAttempt: true,
			});
			await controller.handleConnectionStatusChanged(true);

			expect(attempt.current).toMatchObject({
				connectivity: 'offline',
				type: 'valid-attempt',
			});
		});
	});

	describe('authorizerMap', () => {
		it('updates the access controller when auth is called from the authorizer map', async () => {
			const { controller, attempt } = createSimpleAccessController({
				existingOfflineCache: true,
			});

			await controller.authorizerMap.a.runAuth();

			expect(attempt.current).toMatchObject({
				connectivity: 'online',
				type: 'valid-attempt',
			});
		});

		it('allows arguments to be passed to the auth function', async () => {
			let arg: string | null = null;
			const cache = new AsyncStorage<UserData>({ id: '123' });
			const validAttemptCache = new AsyncStorage<number>();
			const controller = new AccessController(
				{
					a: new Authorizer({
						name: 'a',
						userDataCache: cache,
						authCaches: [] as AsyncCache<any>[],
						auth: async ([a]: [string]) => {
							arg = a;
							return ValidResult({
								id: '123',
							});
						},
						authWithCachedCredentials: getValidUserData,
						checkUserHasAccess: () => true,
					}),
				},
				validAttemptCache,
			);

			await controller.authorizerMap.a.runAuth('sstring');

			expect(arg).toBe('sstring');
		});
	});

	describe('checkUserHasAccess', () => {
		it('validates user data from an authorizer to allow them to be logged in via that authorizer, yet still not granting access', async () => {
			const { controller, attempt } = createSimpleAccessController({
				grantAccessFromUserData: false,
			});

			await controller.authorizerMap.a.runAuth();

			expect(controller.authorizerMap.a.getUserData()).toMatchObject({
				id: '123',
			});

			expect(attempt.current).toMatchObject({
				connectivity: 'online',
				type: 'invalid-attempt',
			});
		});
	});

	describe('userDataCache', () => {
		it('is populated with the successful auth values after valid auths', async () => {
			const { controller, cache } = createSimpleAccessController({
				grantAccessFromUserData: false,
			});

			await expect(cache.get()).resolves.toBe(null);

			await controller.authorizerMap.a.runAuth();

			await expect(cache.get()).resolves.toMatchObject({ id: '123' });
		});

		it('is purged after invalid auths', async () => {
			const { controller, cache } = createSimpleAccessController({
				grantAccessFromUserData: false,
				invalidFromLiveCredentials: true,
				existingOfflineCache: true,
			});

			await expect(cache.get()).resolves.toMatchObject({ id: '123' });

			await controller.authorizerMap.a.runAuth();

			await expect(cache.get()).resolves.toBe(null);
		});
	});

	describe('asyncCaches', () => {
		it('is not purged after erroring auth requests', async () => {
			const cache = new AsyncStorage<UserData>();
			const cacheA = new AsyncStorage('a');
			const cacheB = new AsyncStorage(1);
			const validAttemptCache = new AsyncStorage<number>();
			const controller = new AccessController(
				{
					a: new Authorizer({
						name: 'a',
						userDataCache: cache,
						authCaches: [cacheA, cacheB] as const,
						auth: async (): Promise<AuthResult<UserData>> => {
							throw new Error();
						},
						authWithCachedCredentials: getValidUserData,
						checkUserHasAccess: () => false,
					}),
				},
				validAttemptCache,
			);

			await expect(cacheA.get()).resolves.toEqual('a');
			await expect(cacheB.get()).resolves.toEqual(1);

			await controller.authorizerMap.a.runAuth();

			await expect(cacheA.get()).resolves.toBe('a');
			await expect(cacheB.get()).resolves.toBe(1);
			await expect(validAttemptCache.get()).toBeDefined();
		});

		it('is not purged after Invalid auth requests', async () => {
			const cache = new AsyncStorage<UserData>();
			const cacheA = new AsyncStorage('a');
			const cacheB = new AsyncStorage(1);
			const validAttemptCache = new AsyncStorage<number>();
			const controller = new AccessController(
				{
					a: new Authorizer({
						name: 'a',
						userDataCache: cache,
						authCaches: [cacheA, cacheB] as const,
						auth: getInvalidUserData,
						authWithCachedCredentials: getValidUserData,
						checkUserHasAccess: () => false,
					}),
				},
				validAttemptCache,
			);

			await expect(cacheA.get()).resolves.toEqual('a');
			await expect(cacheB.get()).resolves.toEqual(1);

			await controller.authorizerMap.a.runAuth();

			await expect(cacheA.get()).resolves.toBe(null);
			await expect(cacheB.get()).resolves.toBe(null);
		});
	});

	describe('validAttemptCache', () => {
		it('is populated with the attempt date after valid auths', async () => {
			const {
				controller,
				validAttemptCache,
			} = createSimpleAccessController({
				grantAccessFromUserData: true,
			});
			await expect(validAttemptCache.get()).resolves.toBe(null);

			await controller.authorizerMap.a.runAuth();

			await expect(validAttemptCache.get()).resolves.toBeDefined();
		});
	});
});
