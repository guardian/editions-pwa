import {
	casCredentialsKeychain,
	casDataCache,
	legacyCASPasswordCache,
	legacyCASUsernameCache,
} from 'src/helpers/storage';
import { Authorizer } from '../lib/Authorizer';
import { ErrorResult, flat, ValidResult } from '../lib/Result';
import { fetchCASSubscription } from '../services/cas';

export default new Authorizer({
	name: 'cas',
	userDataCache: casDataCache,
	authCaches: [
		casCredentialsKeychain,
		legacyCASUsernameCache,
		legacyCASPasswordCache,
	] as const,
	auth: async ([subscriberId, password]: [string, string], [creds]) => {
		const casResult = await fetchCASSubscription(subscriberId, password);
		return flat(casResult, async (expiry) => {
			creds.set({
				username: subscriberId,
				token: password,
			});
			return ValidResult(expiry);
		});
	},
	authWithCachedCredentials: async ([
		credsCache,
		lsubscriberIdCache,
		lpasswordCache,
	]) => {
		const creds = await credsCache.get();

		if (creds) return fetchCASSubscription(creds.username, creds.password);

		const [username, password] = await Promise.all([
			lsubscriberIdCache.get(),
			lpasswordCache.get(),
		]);
		if (username && password) {
			return fetchCASSubscription(username, password);
		}
		return ErrorResult();
	},
	checkUserHasAccess: (expiry) =>
		new Date(expiry.expiryDate).getTime() > Date.now(),
});
