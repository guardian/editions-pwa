import gql from 'graphql-tag';
import { useEffect } from 'react';
import type {
	NavigationScreenProp,
	NavigationTransitionProps,
} from 'react-navigation';
import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	StackViewTransitionConfigs,
} from 'react-navigation';
import { CURRENT_CONSENT_VERSION } from 'src/helpers/settings';
import { useQuery } from 'src/hooks/apollo';
import { EditionsMenuScreen } from 'src/screens/editions-menu-screen';
import { AuthSwitcherScreen } from 'src/screens/identity-login-screen';
import { LightboxScreen } from 'src/screens/lightbox';
import { OnboardingConsentScreen } from 'src/screens/onboarding-screen';
import { AlreadySubscribedScreen } from 'src/screens/settings/already-subscribed-screen';
import { ApiScreen } from 'src/screens/settings/api-screen';
import { BetaProgrammeFAQsScreen } from 'src/screens/settings/beta-programme-faqs';
import { CasSignInScreen } from 'src/screens/settings/cas-sign-in-screen';
import { CreditsScreen } from 'src/screens/settings/credits-screen';
import { EditionsScreen } from 'src/screens/settings/editions-screen';
import { FAQScreen } from 'src/screens/settings/faq-screen';
import {
	GdprConsentScreen,
	GdprConsentScreenForOnboarding,
} from 'src/screens/settings/gdpr-consent-screen';
import { HelpScreen } from 'src/screens/settings/help-screen';
import {
	ManageEditionScreenFromIssuePicker,
	ManageEditionsScreen,
} from 'src/screens/settings/manage-editions-screen';
import {
	PrivacyPolicyScreen,
	PrivacyPolicyScreenForOnboarding,
} from 'src/screens/settings/privacy-policy-screen';
import { SubscriptionDetailsScreen } from 'src/screens/settings/subscription-details-screen';
import { TermsAndConditionsScreen } from 'src/screens/settings/terms-and-conditions-screen';
import StorybookScreen from 'src/screens/storybook-screen';
import { WeatherGeolocationConsentScreen } from 'src/screens/weather-geolocation-consent-screen';
import { color } from 'src/theme/color';
import { ArticleScreen } from '../screens/article-screen';
import { HomeScreen } from '../screens/home-screen';
import { IssueScreen } from '../screens/issue-screen';
import { SettingsScreen } from '../screens/settings-screen';
import { mapNavigationToProps } from './helpers/base';
import { createArticleNavigator } from './navigators/article';
import { createHeaderStackNavigator } from './navigators/header';
import { createModalNavigator } from './navigators/modal';
import { createSidebarNavigator } from './navigators/sidebar';
import { routeNames } from './routes';

const navOptionsWithGraunHeader = {
	headerStyle: {
		backgroundColor: color.primary,
		borderBottomColor: color.text,
	},
	headerTintColor: color.textOverPrimary,
};

/* The screens you add to IOS_MODAL_ROUTES will have the modal transition. I.e they will slide up from the bottom. */
const IOS_MODAL_ROUTES = [
	routeNames.onboarding.PrivacyPolicyInline,
	routeNames.onboarding.OnboardingConsentInline,
];

const dynamicModalTransition = (
	transitionProps: NavigationTransitionProps,
	prevTransitionProps: NavigationTransitionProps,
) => {
	const isModal = IOS_MODAL_ROUTES.some(
		(screenName) =>
			screenName === transitionProps.scene.route.routeName ||
			(prevTransitionProps &&
				screenName === prevTransitionProps.scene.route.routeName),
	);

	return StackViewTransitionConfigs.defaultTransitionConfig(
		transitionProps,
		prevTransitionProps,
		isModal,
	);
};

const AppStack = createModalNavigator(
	createSidebarNavigator(createArticleNavigator(IssueScreen, ArticleScreen), {
		[routeNames.IssueList]: HomeScreen,
		[routeNames.EditionsMenu]: EditionsMenuScreen,
	}),
	{
		[routeNames.ManageEditions]: createHeaderStackNavigator({
			[routeNames.ManageEditions]: ManageEditionScreenFromIssuePicker,
		}),
		[routeNames.Settings]: createHeaderStackNavigator(
			{
				[routeNames.Settings]: SettingsScreen,
				[routeNames.Endpoints]: ApiScreen,
				[routeNames.Edition]: EditionsScreen,
				[routeNames.GdprConsent]: GdprConsentScreen,
				[routeNames.PrivacyPolicy]: PrivacyPolicyScreen,
				[routeNames.ManageEditionsSettings]: ManageEditionsScreen,
				[routeNames.TermsAndConditions]: TermsAndConditionsScreen,
				[routeNames.BetaProgrammeFAQs]: BetaProgrammeFAQsScreen,
				[routeNames.Help]: HelpScreen,
				[routeNames.Credits]: CreditsScreen,
				[routeNames.FAQ]: FAQScreen,
				[routeNames.AlreadySubscribed]: AlreadySubscribedScreen,
				[routeNames.SubscriptionDetails]: SubscriptionDetailsScreen,
				// Turned off to remove Promise rejection error on Android
				[routeNames.Storybook]: StorybookScreen,
			},
			{
				defaultNavigationOptions: {
					...navOptionsWithGraunHeader,
				},
			},
		),
		[routeNames.WeatherGeolocationConsent]: createHeaderStackNavigator({
			[routeNames.WeatherGeolocationConsent]: WeatherGeolocationConsentScreen,
		}),
	},
);

const OnboardingStack = createModalNavigator(
	createStackNavigator(
		{
			[routeNames.onboarding.OnboardingConsent]: createStackNavigator(
				{
					Main: {
						screen: mapNavigationToProps(
							OnboardingConsentScreen,
							(nav) => ({
								onContinue: () => nav.navigate('App'),
								onOpenGdprConsent: () =>
									nav.navigate(
										routeNames.onboarding
											.OnboardingConsentInline,
									),
								onOpenPrivacyPolicy: () =>
									nav.navigate(
										routeNames.onboarding
											.PrivacyPolicyInline,
									),
							}),
						),
						navigationOptions: {
							header: null,
						},
					},
					[routeNames.onboarding
						.OnboardingConsentInline]: GdprConsentScreenForOnboarding,
					[routeNames.onboarding
						.PrivacyPolicyInline]: PrivacyPolicyScreenForOnboarding,
				},
				{
					headerMode: 'none',
					transitionConfig: dynamicModalTransition,
					defaultNavigationOptions: {
						...navOptionsWithGraunHeader,
					},
				},
			),
		},
		{
			headerMode: 'none',
		},
	),
	{},
);

const ONBOARDING_QUERY = gql(`{
    gdprAllowEssential @client
    gdprAllowPerformance @client
    gdprAllowFunctionality @client
    gdprConsentVersion @client
}`);

type OnboardingQueryData = {
	gdprAllowEssential: boolean;
	gdprAllowPerformance: boolean;
	gdprAllowFunctionality: boolean;
	gdprConsentVersion: number;
};

const hasOnboarded = (data: OnboardingQueryData) =>
	data.gdprAllowEssential != null &&
	data.gdprAllowFunctionality != null &&
	data.gdprAllowPerformance != null &&
	data.gdprConsentVersion == CURRENT_CONSENT_VERSION;

const RootNavigator = createAppContainer(
	createStackNavigator(
		{
			AppRoot: createSwitchNavigator(
				{
					Main: ({
						navigation,
					}: {
						navigation: NavigationScreenProp<{}>;
					}) => {
						const query = useQuery<OnboardingQueryData>(
							ONBOARDING_QUERY,
						);
						useEffect(() => {
							/** Setting is still loading, do nothing yet. */
							if (query.loading) return;
							const { data } = query;
							// If any flag is unknown still, we want to onboard.
							// We expected people to give explicit yay/nay to
							// each GDPR bucket.
							if (!hasOnboarded(data)) {
								navigation.navigate('Onboarding');
							} else {
								navigation.navigate('App');
							}
						});
						return null;
					},
					App: AppStack,
					Onboarding: OnboardingStack,
				},
				{
					initialRouteName: 'Main',
				},
			),
			[routeNames.SignIn]: AuthSwitcherScreen,
			[routeNames.CasSignIn]: CasSignInScreen,
			[routeNames.Lightbox]: LightboxScreen,
		},
		{
			initialRouteName: 'AppRoot',
			mode: 'modal',
			headerMode: 'none',
		},
	),
);

export { RootNavigator };
