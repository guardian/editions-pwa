import invariant from 'invariant';
import qs from 'query-string';
import { GOOGLE_CLIENT_ID } from '../../constants';
import { authWithDeepRedirect } from '../deep-link-auth';

const googleRedirectURI = `com.googleusercontent.apps.${GOOGLE_CLIENT_ID}:authorize`;

const DEFAULT_AUTHORIZATION_ENDPOINT =
	'https://accounts.google.com/o/oauth2/v2/auth';

const getGoogleOAuthURL = (validatorString: string) =>
	fetch('https://accounts.google.com/.well-known/openid-configuration')
		.then((res) => {
			if (res.ok) return res.json();
			throw new Error(); // knock us into the `catch` below
		})
		/**
		 * The above is the right way to find the auth endpoint but, in case of an error,
		 * return auth endpoint for google OAuth that is correct at time of writing
		 */
		.catch(() => DEFAULT_AUTHORIZATION_ENDPOINT)
		.then(
			(json) =>
				`${json.authorization_endpoint}?${qs.stringify({
					client_id: `${GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
					response_type: 'code',
					redirect_uri: googleRedirectURI,
					// I think these are the two scopes required by identity and are what the apps use
					scope: 'profile email',
					// always re-authenticate when clicking the fb login button
					// seeing it means the user will have logged out
					prompt: 'select_account',
					// this will help prevent CSRF
					state: validatorString,
				})}`,
		);

/**
 * Unlike Facebook, Google will not return a token directly, instead will return a code
 * that we then have to exchange for a token. This is ostensibly so that a user can't
 * intercept a token an pretend to be the app (tokens are signed to the app rather than a user).
 *
 * This normally requires a client secret to prove that we are the app, but given the nature of the
 * problem with storing secrets in apps, this restriction is relaxed for iOS / Android apps
 * and we can simply call the endpoint without a secret. See https://developers.google.com/identity/protocols/OAuth2InstalledApp#exchange-authorization-code under `client_secret`.
 */
const getGoogleTokenFromCode = (code: string) =>
	fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: qs.stringify({
			code,
			client_id: GOOGLE_CLIENT_ID,
			redirect_uri: googleRedirectURI,
			grant_type: 'authorization_code',
		}),
	})
		.then((res) => res.json())
		.then((json) => json.access_token);

/**
 * Attempts to login with facebook OAuth
 *
 * Due to its dependency on `authWithDeepRedirect` it expects that auth to be completed
 * with a deep link back into the app. The `invariant` calls will throw if they fail.
 *
 * They have been written here with strings that currently are ok to show in the UI.
 */
const googleAuthWithDeepRedirect = (validatorString: string): Promise<string> =>
	getGoogleOAuthURL(validatorString).then((authUrl) =>
		authWithDeepRedirect(authUrl, googleRedirectURI, async (url) => {
			invariant(url.startsWith(googleRedirectURI), 'Sign-in cancelled');

			const params = qs.parse(url.split('?')[1]);

			invariant(
				params.state === validatorString,
				'Sign-in session expired, please try again',
			);

			invariant(params.code, 'Something went wrong');

			return getGoogleTokenFromCode(params.code as string);
		}),
	);

export { googleAuthWithDeepRedirect };
