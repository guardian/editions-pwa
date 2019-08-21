import { useEffect } from 'react'
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation'
import { HomeScreen } from '../screens/home-screen'
import { IssueScreen } from '../screens/issue-screen'
import { ArticleScreen } from '../screens/article-screen'
import { SettingsScreen } from '../screens/settings-screen'
import { color } from 'src/theme/color'
import { Animated, Easing } from 'react-native'
import { useSettings } from 'src/hooks/use-settings'
import {
    OnboardingIntroScreen,
    OnboardingConsentScreen,
} from 'src/screens/onboarding-screen'
import { AlreadySubscribedScreen } from 'src/screens/settings/already-subscribed-screen'
import { GdprConsentScreen } from 'src/screens/settings/gdpr-consent-screen'
import { CasSignInScreen } from 'src/screens/settings/cas-sign-in-screen'
import { NavigationScreenProp } from 'react-navigation'
import { mapNavigationToProps } from './helpers'
import { shouldShowOnboarding } from 'src/helpers/settings'
import {
    issueToArticleScreenInterpolator,
    issueToIssueListInterpolator,
} from './interpolators'
import { supportsTransparentCards } from 'src/helpers/features'
import { AuthSwitcherScreen } from 'src/screens/identity-login-screen'
import { routeNames } from './routes'
import { DownloadScreen } from 'src/screens/settings/download-screen'
import { ApiScreen } from 'src/screens/settings/api-screen'
import { PrivacyPolicyScreen } from 'src/screens/settings/privacy-policy-screen'
import { TermsAndConditionsScreen } from 'src/screens/settings/terms-and-conditions-screen'
import { HelpScreen } from 'src/screens/settings/help-screen'
import { CreditsScreen } from 'src/screens/settings/credits-screen'
import { FAQScreen } from 'src/screens/settings/faq-screen'
import { createModalNavigator } from './navigators/modal'
import { createHeaderStackNavigator } from './navigators/header'
import { createUnderlayNavigator } from './navigators/underlay'

const navOptionsWithGraunHeader = {
    headerStyle: {
        backgroundColor: color.primary,
        borderBottomColor: color.text,
    },
    headerTintColor: color.textOverPrimary,
}

const transitionOptionsOverArtboard = (bounces: boolean) => ({
    containerStyle: {
        backgroundColor: color.artboardBackground,
    },
    transitionSpec: {
        duration: bounces ? 600 : 400,
        easing: Easing.elastic(bounces ? 1 : 0.5),
        timing: Animated.timing,
        useNativeDriver: true,
    },
})

const AppStack = createModalNavigator(
    createUnderlayNavigator(
        createStackNavigator(
            {
                [routeNames.Issue]: IssueScreen,
                [routeNames.Article]: ArticleScreen,
            },
            {
                transparentCard: true,
                initialRouteName: routeNames.Issue,
                mode: 'modal',
                headerMode: 'none',
                cardOverlayEnabled: true,
                transitionConfig: () => ({
                    ...transitionOptionsOverArtboard(true),
                    screenInterpolator: issueToArticleScreenInterpolator,
                }),
                defaultNavigationOptions: {
                    gesturesEnabled: false,
                },
            },
        ),
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
        [routeNames.onboarding
            .OnboardingConsentInline]: createHeaderStackNavigator({
            GdprConsentScreen,
        }),
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
                        const [settings] = useSettings()
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
