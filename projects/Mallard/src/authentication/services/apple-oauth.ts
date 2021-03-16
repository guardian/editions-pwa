import invariant from 'invariant';
import qs from 'query-string';
import { authWithDeepRedirect } from '../deep-link-auth';

const appleRedirectURI =
	'https://idapi.theguardian.com/auth/apple/auth-redirect-editions?redirect-for=editions';

const appleDeepLinkRedirectURI =
	'theguardianeditions://auth/apple/auth-redirect';

const getAppleOAuthURL = (validatorString: string) =>
	`https://appleid.apple.com/auth/authorize?${qs.stringify(
		{
			client_id: 'com.theguardian.editions',
			response_type: 'code id_token',
			redirect_uri: appleRedirectURI,
			scope: ['name', 'email'].join(' '),
			state: validatorString,
			response_mode: 'form_post',
		},
		{ encode: true },
	)}`;

/**
 * Attempts to login with apple OAuth
 *
 * This flow is slightly different from google/facebook as we tell apple to redirect to identity,
 * which then redirects back to an app deep link.
 *
 * Due to its dependency on `authWithDeepRedirect` it expects that auth to be completed
 * with a deep link back into the app. The `invariant` calls will throw if they fail.
 *
 * They have been written here with strings that currently are ok to show in the UI.
 */
const appleAuthWithDeepRedirect = (validatorString: string): Promise<string> =>
	authWithDeepRedirect(
		getAppleOAuthURL(validatorString),
		appleDeepLinkRedirectURI,
		async (url) => {
			invariant(
				url.startsWith(appleDeepLinkRedirectURI),
				'Sign-in cancelled',
			);

			const params = qs.parse(url.split('?')[1]);

			invariant(params['apple-sign-in-token'], 'Something went wrong');
			return params['apple-sign-in-token'] as string;
		},
	);

export { appleAuthWithDeepRedirect };
