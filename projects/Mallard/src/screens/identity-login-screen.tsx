import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import { AccessContext } from 'src/authentication/AccessContext';
import type { AuthParams } from 'src/authentication/authorizers/IdentityAuthorizer';
import { isValid } from 'src/authentication/lib/Attempt';
import {
	appleNativeAuth,
	getErrorString,
} from 'src/authentication/services/apple';
import { appleAuthWithDeepRedirect } from 'src/authentication/services/apple-oauth';
import { facebookAuthWithDeepRedirect } from 'src/authentication/services/facebook';
import { googleAuthWithDeepRedirect } from 'src/authentication/services/google';
import { useModal } from 'src/components/modal';
import { SignInFailedModalCard } from 'src/components/SignInFailedModalCard';
import { SubFoundModalCard } from 'src/components/sub-found-modal-card';
import { withConsent } from 'src/helpers/settings';
import { Copy } from 'src/helpers/words';
import { useFormField } from 'src/hooks/use-form-field';
import { routeNames } from 'src/navigation/routes';
import isEmail from 'validator/lib/isEmail';
import { Login } from './log-in';

const useRandomState = () =>
	useState(Math.random().toString().split('.')[1])[0];

const AuthSwitcherScreen = ({
	navigation,
}: {
	navigation: NavigationScreenProp<{}>;
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState<string | null>(null);

	const email = useFormField('', {
		validator: (email) =>
			email
				? isEmail(email)
					? null
					: Copy.authSwitcherScreen.invalidEmail
				: Copy.authSwitcherScreen.emptyEmail,
		onSet: () => setError(null),
	});
	const password = useFormField('', {
		validator: (password) =>
			password ? null : Copy.authSwitcherScreen.invalidPassword,
		onSet: () => setError(null),
	});

	const validatorString = useRandomState();

	const { authIdentity } = useContext(AccessContext);
	const { open } = useModal();

	const handleAuthClick = async (
		runGetIdentityAuthParams: () => Promise<AuthParams>,
		{
			requiresFunctionalConsent,
			signInName,
		}: { requiresFunctionalConsent: boolean; signInName?: string },
	) => {
		setError(null);
		withConsent(
			requiresFunctionalConsent ? 'gdprAllowFunctionality' : null,
			{
				allow: async () => {
					setIsLoading(true);
					try {
						const { attempt, accessAttempt } = await authIdentity(
							await runGetIdentityAuthParams(),
						);
						if (isValid(attempt)) {
							setIsLoading(false);
							if (!isValid(accessAttempt)) {
								open((close) => (
									<SignInFailedModalCard
										email={
											attempt.data.userDetails
												.primaryEmailAddress
										}
										onDismiss={() => navigation.popToTop()}
										onOpenCASLogin={() =>
											navigation.navigate(
												routeNames.CasSignIn,
											)
										}
										onLoginPress={() =>
											navigation.navigate(
												routeNames.SignIn,
											)
										}
										onFaqPress={() =>
											navigation.navigate(routeNames.FAQ)
										}
										close={close}
									/>
								));
							} else {
								open((close) => (
									<SubFoundModalCard close={close} />
								));
							}
							navigation.goBack();
						} else {
							attempt.reason && setError(attempt.reason);
							// push this into the catch logic below
							throw attempt.reason;
						}
					} catch (e) {
						const appleErrorString = getErrorString(e);
						appleErrorString && setError(appleErrorString);
						setIsLoading(false);
					}
				},
				deny: async () => {
					Alert.alert(
						Copy.authSwitcherScreen.socialSignInDisabledTitle.replace(
							'%signInName%',
							signInName || 'Social',
						),
						Copy.authSwitcherScreen.socialSignInDisabledSubtitle.replace(
							'%signInName%',
							signInName || 'social',
						),
					);
				},
			},
		);
	};

	return (
		<Login
			title={Copy.authSwitcherScreen.title}
			resetLink="https://profile.theguardian.com/reset"
			emailProgressText={Copy.authSwitcherScreen.nextButton}
			submitText="Sign me in"
			email={email}
			password={password}
			isLoading={isLoading}
			onDismiss={() => navigation.goBack()}
			onHelpPress={() =>
				navigation.navigate(routeNames.AlreadySubscribed)
			}
			onFacebookPress={() =>
				handleAuthClick(
					() =>
						facebookAuthWithDeepRedirect(validatorString).then(
							(token) => ({
								'facebook-access-token': token,
							}),
						),
					{ requiresFunctionalConsent: true, signInName: 'Facebook' },
				)
			}
			onGooglePress={() =>
				handleAuthClick(
					() =>
						googleAuthWithDeepRedirect(validatorString).then(
							(token) => ({
								'google-access-token': token,
							}),
						),
					{ requiresFunctionalConsent: true, signInName: 'Google' },
				)
			}
			onAppleOAuthPress={() => {
				handleAuthClick(
					() =>
						appleAuthWithDeepRedirect(validatorString).then(
							(token) => {
								return {
									'apple-sign-in-token': token,
								};
							},
						),
					{
						requiresFunctionalConsent: true,
						signInName: 'AppleOauth',
					},
				);
			}}
			onApplePress={() =>
				handleAuthClick(() => appleNativeAuth(validatorString), {
					requiresFunctionalConsent: true,
					signInName: 'Apple',
				})
			}
			onSubmit={() =>
				handleAuthClick(
					async () => ({
						email: email.value,
						password: password.value,
					}),
					{ requiresFunctionalConsent: false },
				)
			}
			errorMessage={error}
		/>
	);
};

export { AuthSwitcherScreen };
