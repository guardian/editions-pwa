import invariant from 'invariant';
import qs from 'query-string';
import { FACEBOOK_CLIENT_ID } from '../../constants';
import { authWithDeepRedirect } from '../deep-link-auth';

const facebookRedirectURI = `fb${FACEBOOK_CLIENT_ID}://authorize`;

const getFacebookOAuthURL = (validatorString: string) =>
	`https://www.facebook.com/v3.3/dialog/oauth?${qs.stringify({
		client_id: FACEBOOK_CLIENT_ID,
		response_type: 'token',
		redirect_uri: facebookRedirectURI,
		// I think these are the two scopes required by identity and are what the apps use
		scope: ['public_profile', 'email'].join(','),
		// always re-authenticate when clicking the fb login button
		// seeing it means the user will have logged out
		auth_type: 'reauthenticate',
		// this will help prevent CSRF
		state: validatorString,
	})}`;

/**
 * Attempts to login with facebook OAuth
 *
 * Due to its dependency on `authWithDeepRedirect` it expects that auth to be completed
 * with a deep link back into the app. The `invariant` calls will throw if they fail.
 *
 * They have been written here with strings that currently are ok to show in the UI.
 */
const facebookAuthWithDeepRedirect = (
	validatorString: string,
): Promise<string> =>
	authWithDeepRedirect(
		getFacebookOAuthURL(validatorString),
		facebookRedirectURI,
		async (url) => {
			invariant(url.startsWith(facebookRedirectURI), 'Sign-in cancelled');

			const params = qs.parse(url.split('#')[1]);

			invariant(
				params.state === validatorString,
				'Sign-in session expired, please try again',
			);

			invariant(params.access_token, 'Something went wrong');

			return params.access_token as string;
		},
	);

export { facebookAuthWithDeepRedirect };
