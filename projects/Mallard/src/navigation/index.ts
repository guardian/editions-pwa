import { useEffect } from 'react'
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    NavigationScreenProp,
} from 'react-navigation'
import { shouldShowOnboarding } from 'src/helpers/settings'
import { useOtherSettingsValues } from 'src/hooks/use-settings'
import { AuthSwitcherScreen } from 'src/screens/identity-login-screen'
import {
    OnboardingConsentScreen,
    OnboardingIntroScreen,
} from 'src/screens/onboarding-screen'
import { AlreadySubscribedScreen } from 'src/screens/settings/already-subscribed-screen'
import { ApiScreen } from 'src/screens/settings/api-screen'
import { CasSignInScreen } from 'src/screens/settings/cas-sign-in-screen'
import { CreditsScreen } from 'src/screens/settings/credits-screen'
import { DownloadScreen } from 'src/screens/settings/download-screen'
import { FAQScreen } from 'src/screens/settings/faq-screen'
import {
    GdprConsentScreen,
    GdprConsentScreenForOnboarding,
} from 'src/screens/settings/gdpr-consent-screen'
import { HelpScreen } from 'src/screens/settings/help-screen'
import { PrivacyPolicyScreen } from 'src/screens/settings/privacy-policy-screen'
import { TermsAndConditionsScreen } from 'src/screens/settings/terms-and-conditions-screen'
import { color } from 'src/theme/color'
import { ArticleScreen } from '../screens/article-screen'
import { HomeScreen } from '../screens/home-screen'
import { IssueScreen } from '../screens/issue-screen'
import { SettingsScreen } from '../screens/settings-screen'
import { mapNavigationToProps } from './helpers/base'
import { createArticleNavigator } from './navigators/article'
import { createHeaderStackNavigator } from './navigators/header'
import { createModalNavigator } from './navigators/modal'
import { createUnderlayNavigator } from './navigators/underlay'
import { routeNames } from './routes'

const navOptionsWithGraunHeader = {
    headerStyle: {
        backgroundColor: color.primary,
        borderBottomColor: color.text,
    },
    headerTintColor: color.textOverPrimary,
}

const AppStack = createModalNavigator(
    createUnderlayNavigator(
        createArticleNavigator(IssueScreen, ArticleScreen),
        {
            [routeNames.IssueList]: HomeScreen,
        },
    ),
    {
        [routeNames.Settings]: createHeaderStackNavigator(
            {
                [routeNames.Settings]: SettingsScreen,
                [routeNames.Downloads]: DownloadScreen,
                [routeNames.Endpoints]: ApiScreen,
                [routeNames.GdprConsent]: GdprConsentScreen,
                [routeNames.PrivacyPolicy]: PrivacyPolicyScreen,
                [routeNames.TermsAndConditions]: TermsAndConditionsScreen,
                [routeNames.Help]: HelpScreen,
                [routeNames.Credits]: CreditsScreen,
                [routeNames.FAQ]: FAQScreen,
                [routeNames.AlreadySubscribed]: AlreadySubscribedScreen,
            },
            {
                defaultNavigationOptions: {
                    ...navOptionsWithGraunHeader,
                },
            },
        ),
    },
)

const OnboardingStack = createModalNavigator(
    createStackNavigator(
        {
            [routeNames.onboarding.OnboardingStart]: mapNavigationToProps(
                OnboardingIntroScreen,
                nav => ({
                    onContinue: () =>
                        nav.navigate(routeNames.onboarding.OnboardingConsent),
                }),
            ),
            [routeNames.onboarding.OnboardingConsent]: createStackNavigator(
                {
                    Main: {
                        screen: mapNavigationToProps(
                            OnboardingConsentScreen,
                            nav => ({
                                onContinue: () => nav.navigate('App'),
                                onOpenGdprConsent: () =>
                                    nav.navigate(
                                        routeNames.onboarding
                                            .OnboardingConsentInline,
                                    ),
                            }),
                        ),
                        navigationOptions: {
                            header: null,
                        },
                    },
                },
                {
                    mode: 'modal',
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
    {
        [routeNames.onboarding.OnboardingConsentInline]: createStackNavigator(
            {
                GdprConsentScreenForOnboarding,
            },
            { headerMode: 'none' },
        ),
    },
)
const RootNavigator = createAppContainer(
    createStackNavigator(
        {
            AppRoot: createSwitchNavigator(
                {
                    Main: ({
                        navigation,
                    }: {
                        navigation: NavigationScreenProp<{}>
                    }) => {
                        const settings = useOtherSettingsValues()
                        useEffect(() => {
                            if (shouldShowOnboarding(settings)) {
                                navigation.navigate('Onboarding')
                            } else {
                                navigation.navigate('App')
                            }
                        })
                        return null
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
        },
        {
            initialRouteName: 'AppRoot',
            mode: 'modal',
            headerMode: 'none',
        },
    ),
)

export { RootNavigator }
