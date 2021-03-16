import { validAttemptCache } from 'src/helpers/storage';
import { errorService } from 'src/services/errors';
import { Feature, Level, loggingService } from 'src/services/logging';
import type { AnyAttempt, Connectivity, ResolvedAttempt } from './Attempt';
import {
	ErrorAttempt,
	hasRun,
	InvalidAttempt,
	isNotRun,
	isValid,
	NotRun,
	patchAttempt,
	ValidAttempt,
	withConnectivity,
} from './Attempt';
import type { AuthResult } from './Result';
import { cataResult, InvalidResult, ValidResult } from './Result';

type UpdateHandler<T> = (data: AnyAttempt<T>) => void;

export type AsyncCache<T> = {
	get: () => Promise<T | null>;
	set: (data: T) => Promise<void>;
	reset: () => Promise<void>;
};

class Authorizer<
	S extends string,
	T,
	A extends any[],
	C extends ReadonlyArray<AsyncCache<any>>
> {
	private subscribers: Array<UpdateHandler<T>> = [];
	private attempt: AnyAttempt<T> = NotRun;
	private accessAttempt: AnyAttempt<S> = NotRun;
	readonly name: S;
	private userDataCache: AsyncCache<T>;
	private authCaches: C;
	/**
	 * the main method for authing against a backend, takes the raw credentials
	 * that would be input by the user and returns either an object representing
	 * the valid data representing a known user, or null when they failed to
	 * authenticate. All errors thrown will be caught and will set create an InvalidAttempt.
	 */
	private auth: (args: A, caches: C) => Promise<AuthResult<T>>;
	/**
	 * This should hit live endpoints with credentials stored on the
	 * device (probably the keychain), in order to re-validate a user
	 * e.g. at app open. This basically for silently logging in a user.
	 */
	private authWithCachedCredentials: (
		authCaches: C,
	) => Promise<AuthResult<T>>;
	private checkUserHasAccess: (
		data: T,
		connectivity: Connectivity,
	) => boolean;

	constructor({
		name,
		userDataCache,
		authCaches,
		auth,
		authWithCachedCredentials,
		checkUserHasAccess,
	}: {
		name: S;
		userDataCache: AsyncCache<T>;
		authCaches: C;
		auth: (args: A, caches: C) => Promise<AuthResult<T>>;
		authWithCachedCredentials: (authCaches: C) => Promise<AuthResult<T>>;
		checkUserHasAccess: (data: T, connectivity: Connectivity) => boolean;
	}) {
		this.name = name;
		this.userDataCache = userDataCache;
		this.authCaches = authCaches;
		this.auth = auth;
		this.authWithCachedCredentials = authWithCachedCredentials;
		this.checkUserHasAccess = checkUserHasAccess;
	}

	private logAuthCacheClear = (feature: Feature, reason?: string) => {
		loggingService.log({
			level: Level.INFO,
			message: 'Clearing all authentication caches',
			optionalFields: { reason, feature },
		});
	};

	private async handleAuthPromise(
		promise: Promise<AuthResult<T>>,
		connectivity: Connectivity,
	) {
		let attempt: ResolvedAttempt<T>;
		const feature = Feature.SIGN_IN;
		try {
			const result = await promise;

			attempt = cataResult<T, ResolvedAttempt<T>>(result, {
				valid: (data) => ValidAttempt(data, connectivity),
				invalid: (reason) => {
					this.logAuthCacheClear(feature, reason);
					this.clearCaches();
					return InvalidAttempt(connectivity, reason);
				},
				error: (reason) => {
					loggingService.log({
						level: Level.ERROR,
						message:
							'Authorization service has returned an error, error attempt created',
						optionalFields: { feature, reason },
					});
					return ErrorAttempt(connectivity, reason);
				},
			});
		} catch (e) {
			errorService.captureException(e);
			loggingService.log({
				level: Level.ERROR,
				message:
					'Authorization attempt threw exception, invalid attempt created',
				optionalFields: { feature },
			});
			attempt = InvalidAttempt('online', 'Something went wrong');
		}
		this.upgradeAttempt(attempt);

		// return this to allow caller to check errors
		return attempt;
	}

	public async runAuth(...args: A) {
		const attempt = await this.handleAuthPromise(
			this.auth(args, this.authCaches),
			'online',
		);

		/**
		 * This may not correspond to the attempt stored in `this.attempt`
		 * as, if we've already logged in, `getAttempt` this attempt will not
		 * overwrite that attempt.
		 * However, it's useful here to return the _actual_ attempt for the login
		 * here for the UI to display a message,.
		 *
		 * That said, this will likely never be run if we're already logged in anyway.
		 */
		return {
			attempt,
			/**
			 * ideally we could convert this to a `ResolvedAttempt`
			 * using a generic with `toAccessAttempt` and type checking
			 * we're passing in a `ResolvedAttempt` (rather than an `AnyAttempt`)
			 * but TS can'd do this :'(
			 * https://github.com/microsoft/TypeScript/issues/13995
			 */
			accessAttempt: this.toAccessAttempt(attempt) as ResolvedAttempt<S>,
		};
	}

	private async getLastKnownAuthStatus(): Promise<AuthResult<T>> {
		try {
			const data = await this.userDataCache.get();
			return data ? ValidResult(data) : InvalidResult();
		} catch (e) {
			return InvalidResult();
		}
	}

	public async runAuthWithCachedCredentials(connectivity: Connectivity) {
		return withConnectivity(connectivity, {
			offline: () =>
				this.handleAuthPromise(
					this.getLastKnownAuthStatus(),
					'offline',
				),
			online: () =>
				this.handleAuthPromise(
					this.authWithCachedCredentials(this.authCaches),
					'online',
				),
		});
	}

	private clearCaches() {
		return Promise.all(
			this.authCaches
				.map((cache) => cache.reset())
				.concat(this.userDataCache.reset())
				.concat(validAttemptCache.reset()),
		).then(() => {});
	}

	/**
	 * This sets the attempt to Invalid
	 */
	public signOut() {
		const feature = Feature.SIGN_IN;
		this.updateAttempt(InvalidAttempt('online'));
		this.logAuthCacheClear(feature, 'sign out');
		return this.clearCaches();
	}

	/**
	 * This returns an access attempt from  an auth attempt
	 *
	 * You may be able to authenticate with an authroizer but it
	 * may be invalid
	 *
	 * This is probably a bit of a weird conecpt to go on this class
	 * but still
	 */
	public toAccessAttempt(attempt: AnyAttempt<T>): AnyAttempt<S> {
		if (isNotRun(attempt)) return attempt;
		try {
			return isValid(attempt) &&
				this.checkUserHasAccess(attempt.data, attempt.connectivity)
				? ValidAttempt(this.name, attempt.connectivity, attempt.time)
				: InvalidAttempt(
						attempt.connectivity,
						(!isValid(attempt) && attempt.reason) ||
							'Subscription not found',
						attempt.time,
				  );
		} catch {
			return InvalidAttempt(
				attempt.connectivity,
				'Something went wrong',
				attempt.time,
			);
		}
	}

	public getAttempt() {
		return this.attempt;
	}

	public getAccessAttempt() {
		return this.accessAttempt;
	}

	public getUserData() {
		return isValid(this.attempt) ? this.attempt.data : null;
	}

	public isAuth(connectivity: Connectivity) {
		return (
			hasRun(this.attempt) && this.attempt.connectivity === connectivity
		);
	}

	/**
	 * This should subscribe a user to any updates to the
	 * authentication status, it returns an unsubscribe function
	 */
	public subscribe(fn: UpdateHandler<T>): () => void {
		this.subscribers.push(fn);
		return () => {
			this.subscribers = this.subscribers.filter((sub) => sub !== fn);
		};
	}

	/**
	 * this will only overwrite the attempt if the attempt is more
	 * prevalent than the last, if it's "more online" or "more valid"
	 */
	private upgradeAttempt(attempt: ResolvedAttempt<T>) {
		const next = patchAttempt(this.attempt, attempt);
		if (!next) return;
		return this.updateAttempt(next);
	}

	private updateAttempt(attempt: ResolvedAttempt<T>) {
		if (isValid(attempt)) {
			// this is async maybe we could await this?
			this.userDataCache.set(attempt.data);
		}
		this.attempt = attempt;
		this.accessAttempt = this.toAccessAttempt(attempt);
		this.notifySubscribers();
	}

	private notifySubscribers() {
		this.subscribers.forEach((sub) => sub(this.attempt));
	}
}

export { Authorizer };
