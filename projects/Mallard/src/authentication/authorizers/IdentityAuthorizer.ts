import {
	legacyUserAccessTokenKeychain,
	membershipAccessTokenKeychain,
	userAccessTokenKeychain,
	userDataCache,
} from 'src/helpers/storage';
import { canViewEdition } from '../helpers';
import { Authorizer } from '../lib/Authorizer';
import type { AuthResult } from '../lib/Result';
import { flat, InvalidResult, ValidResult } from '../lib/Result';
import type { User } from '../services/identity';
import {
	fetchAuth,
	fetchMembershipToken,
	fetchUserDetails,
} from '../services/identity';
import type { MembersDataAPIResponse } from '../services/membership';
import { fetchMembershipData } from '../services/membership';

type BasicCreds = {
	email: string;
	password: string;
};

type FacebookCreds = {
	'facebook-access-token': string;
};

type GoogleCreds = {
	'google-access-token': string;
};

export type AppleCreds = {
	authorizationCode: string;
	idToken: string;
	givenName: string;
	familyName: string;
};

export const AppleSignInTokenKey = 'apple-sign-in-token';

type AppleOauthCreds = {
	'apple-sign-in-token': string;
};

export type AuthParams =
	| BasicCreds
	| FacebookCreds
	| GoogleCreds
	| AppleCreds
	| AppleOauthCreds;

export type AuthType =
	| 'apple'
	| 'google'
	| 'facebook'
	| 'email'
	| 'apple-oauth'
	| 'unknown';

export type IdentityAuthData = {
	userDetails: User;
	membershipData: MembersDataAPIResponse;
};

const authWithTokens = async (
	utoken: string,
	mtoken: string,
): Promise<AuthResult<IdentityAuthData>> => {
	const [userDetailsResult, membershipDataResult] = await Promise.all([
		fetchUserDetails(utoken),
		fetchMembershipData(mtoken),
	]);
	return flat(userDetailsResult, (userDetails) =>
		flat(membershipDataResult, async (membershipData) =>
			ValidResult({
				userDetails,
				membershipData,
			}),
		),
	);
};

export const getUserName = (authType: AuthType, params: AuthParams): string => {
	const unknown = 'unknown';
	switch (authType) {
		case 'email':
			if ('email' in params) {
				return params.email;
			}
		case 'facebook':
			return 'gu-editions::token::facebook';
		case 'google':
			return 'gu-editions::token::google';
		case 'apple':
			return 'gu-editions::token::apple';
		default:
			return unknown;
	}
};

export const detectAuthType = (params: AuthParams): AuthType => {
	if ('email' in params) return 'email';
	if ('facebook-access-token' in params) return 'facebook';
	if ('google-access-token' in params) return 'google';
	if ('apple-sign-in-token' in params) return 'apple-oauth';
	if ('idToken' in params) return 'apple';
	return 'unknown';
};

export default new Authorizer({
	name: 'identity',
	userDataCache,
	authCaches: [
		userAccessTokenKeychain,
		membershipAccessTokenKeychain,
		legacyUserAccessTokenKeychain,
	] as const,
	auth: async ([params]: [AuthParams], [utc, mtc]) => {
		const authType = detectAuthType(params);
		const username = getUserName(authType, params);
		const utokenResult = await fetchAuth<string>(params, authType);

		return flat(utokenResult, async (utoken) => {
			utc.set({ username, token: utoken });
			const mtokenResult = await fetchMembershipToken(utoken);

			return flat(mtokenResult, (mtoken) => {
				mtc.set({ username, token: mtoken });
				return authWithTokens(utoken, mtoken);
			});
		});
	},
	authWithCachedCredentials: async ([utc, mtc, lutc]) => {
		const [nutoken, lutoken, mtoken] = await Promise.all([
			utc.get(),
			lutc.get(),
			mtc.get(),
		]);
		const utoken = nutoken || lutoken;
		if (!utoken || !mtoken) return InvalidResult();
		return authWithTokens(utoken.password, mtoken.password);
	},
	checkUserHasAccess: canViewEdition,
});
