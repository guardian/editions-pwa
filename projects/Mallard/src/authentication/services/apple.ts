import type { RNAppleAuth } from '@invertase/react-native-apple-authentication';
import appleAuth, {
	AppleAuthError,
	AppleAuthRequestOperation,
	AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import type { AppleCreds } from 'src/authentication/authorizers/IdentityAuthorizer';

const mapCredentials = (
	appleCredentials: RNAppleAuth.AppleAuthRequestResponse,
): AppleCreds => {
	const { identityToken, authorizationCode, fullName } = appleCredentials;
	const givenName = fullName ? fullName.givenName : '';
	const familyName = fullName ? fullName.familyName : '';

	return {
		authorizationCode: authorizationCode || '',
		givenName: givenName || '',
		familyName: familyName || '',
		idToken: identityToken || '',
	};
};

export const getErrorString = (err: any): string | undefined => {
	if (err.code) {
		switch (err.code) {
			case AppleAuthError.CANCELED:
				return 'Apple sign in cancelled.';
			case AppleAuthError.FAILED:
				return 'Apple sign in failed, please try again.';
			default:
				return 'Something went wrong with sign in, please try again.';
		}
	} else {
		return undefined;
	}
};

export const appleNativeAuth = async (
	validatorString: string,
): Promise<AppleCreds> => {
	const appleAuthRequestResponse = await appleAuth.performRequest({
		state: validatorString,
		requestedOperation: AppleAuthRequestOperation.LOGIN,
		requestedScopes: [
			AppleAuthRequestScope.EMAIL,
			AppleAuthRequestScope.FULL_NAME,
		],
	});

	return mapCredentials(appleAuthRequestResponse);
};
