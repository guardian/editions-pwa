// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import { ApolloProvider } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import type ApolloClient from 'apollo-client';
import React from 'react';
import { AppState, StatusBar, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import type { NavigationState } from 'react-navigation';
import { eventEmitter } from 'src/helpers/event-emitter';
import { weatherHider } from 'src/helpers/weather-hider';
import {
	ConfigProvider,
	largeDeviceMemory,
} from 'src/hooks/use-config-provider';
import { NavPositionProvider } from 'src/hooks/use-nav-position';
import { RootNavigator } from 'src/navigation';
import type { ScreenTrackingMapping } from 'src/services/ophan';
import {
	ScreenTracking,
	sendAppScreenEvent,
	setUserId,
} from 'src/services/ophan';
import { AccessProvider } from './authentication/AccessContext';
import type { IdentityAuthData } from './authentication/authorizers/IdentityAuthorizer';
import type { AnyAttempt } from './authentication/lib/Attempt';
import { isValid } from './authentication/lib/Attempt';
import { BugButtonHandler } from './components/Button/BugButtonHandler';
import { ErrorBoundary } from './components/layout/ui/errors/error-boundary';
import { Modal, ModalRenderer } from './components/modal';
import { NetInfoDevOverlay } from './components/NetInfoDevOverlay';
import { NetInfoAutoToast } from './components/toast/net-info-auto-toast';
import { prepareAndDownloadTodaysIssue } from './download-edition/prepare-and-download-issue';
import { prepFileSystem } from './helpers/files';
import { nestProviders } from './helpers/provider';
import { pushDownloadFailsafe } from './helpers/push-download-failsafe';
import { EditionProvider } from './hooks/use-edition-provider';
import { ToastProvider } from './hooks/use-toast';
import { pushNotificationRegistration } from './notifications/push-notifications';
import { DeprecateVersionModal } from './screens/deprecate-screen';
import { apolloClient } from './services/apollo-singleton';
import { errorService } from './services/errors';
import { loggingService } from './services/logging';
import { remoteConfigService } from './services/remote-config';

// Log Intitialisation
if (!__DEV__) {
	errorService.init(apolloClient);
}
loggingService.init(apolloClient);
remoteConfigService.init();

// --- SETUP OPERATIONS ---
pushNotificationRegistration();
prepFileSystem();

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		backgroundColor: '#000',
	},
});

const persistenceKey = 'dev-nav-key-232asfdffgdfg1asdffgfdgfdga3413';

const persistNavigationState = async (navState: any) => {
	try {
		await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState));
	} catch (e) {
		console.log('Unable to persist state');
	}
};

const loadNavigationState = async () => {
	try {
		const jsonString = await AsyncStorage.getItem(persistenceKey);
		return jsonString && JSON.parse(jsonString);
	} catch (e) {
		console.log('Unable to load the navigation state');
	}
};

const rootNavigationProps = null && {
	persistNavigationState,
	loadNavigationState,
};

function getActiveRouteName(
	navigationState: NavigationState,
): ScreenTrackingMapping | null {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	// dive into nested navigators
	if (route.routes) {
		return getActiveRouteName(route as NavigationState);
	}
	return route.routeName as ScreenTrackingMapping;
}

const onNavigationStateChange = (
	prevState: NavigationState,
	currentState: NavigationState,
) => {
	const prevScreen: ScreenTrackingMapping | null = getActiveRouteName(
		prevState,
	);
	const currentScreen: ScreenTrackingMapping | null = getActiveRouteName(
		currentState,
	);
	if (
		currentScreen &&
		ScreenTracking[currentScreen] &&
		currentScreen !== prevScreen
	) {
		sendAppScreenEvent({
			screenName: ScreenTracking[currentScreen],
		});
	}
};

const isReactNavPersistenceError = (e: Error) =>
	__DEV__ && e.message.includes('There is no route defined for');

const WithProviders = nestProviders(
	Modal,
	ToastProvider,
	NavPositionProvider,
	ConfigProvider,
	EditionProvider,
);

const handleIdStatus = (attempt: AnyAttempt<IdentityAuthData>) =>
	setUserId(isValid(attempt) ? attempt.data.userDetails.id : null);

const shouldHavePushFailsafe = async (client: ApolloClient<object>) => {
	const largeRAM = await largeDeviceMemory();
	if (largeRAM) {
		pushDownloadFailsafe(client);
	}
};

export default class App extends React.Component {
	componentDidMount() {
		SplashScreen.hide();
		prepareAndDownloadTodaysIssue(apolloClient);
		shouldHavePushFailsafe(apolloClient);
		loggingService.postLogs();

		AppState.addEventListener('change', async (appState) => {
			if (appState === 'active') {
				prepareAndDownloadTodaysIssue(apolloClient);
				loggingService.postLogs();
			}
		});

		{
			eventEmitter.on('editionCachesSet', () => {
				weatherHider(apolloClient);
			});
		}
	}

	async componentDidCatch(e: Error) {
		/**
		 * use an heuristic to check whether this is a react-nav error
		 * if it is then ditch our persistence and try to re-render
		 */
		if (isReactNavPersistenceError(e)) {
			await AsyncStorage.removeItem(persistenceKey);
			this.forceUpdate();
		}
	}
	/**
	 * When the component is mounted. This happens asynchronously and simply
	 * re-renders when we're good to go.
	 */
	render() {
		return (
			<ErrorBoundary>
				<ApolloProvider client={apolloClient}>
					<NetInfoDevOverlay>
						<WithProviders>
							<AccessProvider
								onIdentityStatusChange={handleIdStatus}
							>
								<StatusBar
									barStyle="light-content"
									backgroundColor="#041f4a"
								/>
								<View style={styles.appContainer}>
									<RootNavigator
										{...rootNavigationProps}
										enableURLHandling={__DEV__}
										onNavigationStateChange={
											onNavigationStateChange
										}
									/>
									<NetInfoAutoToast />
								</View>
								<ModalRenderer />
								<BugButtonHandler />
								<DeprecateVersionModal />
							</AccessProvider>
						</WithProviders>
					</NetInfoDevOverlay>
				</ApolloProvider>
			</ErrorBoundary>
		);
	}
}

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */

export const APP_NAME = 'Mallard';
