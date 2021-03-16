import { Feature, Level, loggingService } from 'src/services/logging';
import type { AnyAttempt, Connectivity } from './Attempt';
import { hasRun, isOnline, isValid, NotRun, patchAttempt } from './Attempt';
import type { AsyncCache, Authorizer } from './Authorizer';

type UpdateHandler<S> = (attempt: AnyAttempt<S>) => void;

type AuthMap = Record<string, Authorizer<any, any, any, any>>;

type AuthName<I extends {}> = {
	[K in keyof I]: I[K] extends Authorizer<infer S, any, any, any> ? S : never;
}[keyof I];

const ONE_MONTH = 30 * 1000 * 60 * 60 * 24;

class AccessController<I extends AuthMap, S extends AuthName<I>> {
	private validAttemptCache: AsyncCache<number>;
	private attempt: AnyAttempt<S> = NotRun;
	private fetchingConnectivities: Set<Connectivity> = new Set();
	private subscribers: Array<UpdateHandler<S>> = [];

	constructor(
		readonly authorizerMap: I,
		validAttemptCache: AsyncCache<number>,
	) {
		this.authorizers.forEach((auth) =>
			auth.subscribe(this.reconcileAttempts.bind(this)),
		);
		this.validAttemptCache = validAttemptCache;
	}

	public subscribe(fn: UpdateHandler<S>) {
		this.subscribers.push(fn);
		return () => {
			this.subscribers = this.subscribers.filter((sub) => sub !== fn);
		};
	}

	public get authorizers(): Array<
		Authorizer<S, unknown, unknown[], ReadonlyArray<AsyncCache<unknown>>>
	> {
		return Object.values(this.authorizerMap);
	}

	private get hasAuthRun() {
		return hasRun(this.attempt);
	}

	private get isAuthOnline() {
		return hasRun(this.attempt) && isOnline(this.attempt);
	}

	/**
	 * to avoid re-authorising the user more than needed we will use a cached
	 * auth result if a valid attempt has been made within the last month
	 */
	private async isPreviousAuthValid() {
		const cachedValidAttempt = await this.validAttemptCache.get();
		return (
			cachedValidAttempt && Date.now() - cachedValidAttempt < ONE_MONTH
		);
	}

	private logReAuthentication = (expectedConnection: string) => {
		const feature = Feature.SIGN_IN;
		loggingService.log({
			level: Level.INFO,
			message: `Previous cached auth expired - re-authenticating user`,
			optionalFields: { expectedConnection, feature },
		});
	};

	public async handleConnectionStatusChanged(
		isConnected: boolean,
		isPoorConnection = false,
	) {
		const hasConnection = isConnected && !isPoorConnection;
		const isPreviousAuthValid = await this.isPreviousAuthValid();
		if (isPreviousAuthValid) {
			return this.runCachedAuth('offline');
		}
		if (!this.hasAuthRun) {
			if (hasConnection) {
				this.logReAuthentication('online');
				return this.runCachedAuth('online');
			} else {
				this.logReAuthentication('offline');
				return this.runCachedAuth('offline');
			}
		} else if (!this.isAuthOnline && hasConnection) {
			this.logReAuthentication('online');
			return this.runCachedAuth('online');
		}
	}

	public getAttempt() {
		return this.attempt;
	}

	/**
	 * This will run the authentication caches for all the authorizers
	 * the status will get updated as a results of each of these
	 * if it comes back as valid then stop running them
	 *
	 * It will only call them for authorizers that haven't run
	 */
	private async runCachedAuth(connectivity: Connectivity) {
		if (this.fetchingConnectivities.has(connectivity)) return;
		try {
			this.fetchingConnectivities.add(connectivity);
			for (const authorizer of this.authorizers) {
				if (authorizer.isAuth(connectivity)) continue;
				await authorizer.runAuthWithCachedCredentials(connectivity);
				if (isValid(this.attempt)) return;
			}
		} finally {
			this.fetchingConnectivities.delete(connectivity);
		}
	}

	private async reconcileAttempts() {
		let attempt: AnyAttempt<S> = NotRun;
		for (const authorizer of this.authorizers) {
			const candidate = authorizer.getAccessAttempt();
			attempt = patchAttempt(attempt, candidate) || attempt;
			if (isValid(attempt)) {
				break;
			}
		}
		// when we get a valid attempt we want to store this (only for new valid attempts)
		const isPreviousAuthValid = await this.isPreviousAuthValid();
		if (isValid(attempt) && !isPreviousAuthValid) {
			const feature = Feature.SIGN_IN;
			loggingService.log({
				level: Level.INFO,
				message:
					'Updating authentication cache with valid attempt date',
				optionalFields: { feature },
			});
			this.validAttemptCache.set(attempt.time);
		}
		this.updateAttempt(attempt);
	}

	private notifySubscribers() {
		this.subscribers.forEach((sub) => sub(this.attempt));
	}

	private updateAttempt(attempt: AnyAttempt<S>) {
		if (this.attempt === attempt) return;
		this.attempt = attempt;
		this.notifySubscribers();
	}
}

export { AccessController };
