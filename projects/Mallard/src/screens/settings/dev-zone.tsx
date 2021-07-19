import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import gql from 'graphql-tag';
import type { ReactNode } from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Clipboard, Platform, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { AccessContext } from 'src/authentication/AccessContext';
import { isValid } from 'src/authentication/lib/Attempt';
import { DEV_getLegacyIAPReceipt } from 'src/authentication/services/iap';
import { Button } from 'src/components/Button/Button';
import { Footer, Heading } from 'src/components/layout/ui/row';
import { List } from 'src/components/lists/list';
import { UiBodyCopy } from 'src/components/styled-text';
import { deleteIssueFiles } from 'src/download-edition/clear-issues-and-editions';
import { clearCache } from 'src/helpers/fetch/cache';
import { getFileList, getIssuesCountStrings } from 'src/helpers/files';
import { locale } from 'src/helpers/locale';
import { isInBeta, isInTestFlight } from 'src/helpers/release-stream';
import { imageForScreenSize } from 'src/helpers/screen';
import { ALL_SETTINGS_FRAGMENT } from 'src/helpers/settings/resolvers';
import { setIsUsingProdDevtools } from 'src/helpers/settings/setters';
import {
	pushRegisteredTokens,
	showAllEditionsCache,
} from 'src/helpers/storage';
import { useQuery } from 'src/hooks/apollo';
import { useEditions } from 'src/hooks/use-edition-provider';
import { useNetInfo } from 'src/hooks/use-net-info';
import { useToast } from 'src/hooks/use-toast';
import { RouteNames } from 'src/navigation/NavigationModels';
import {
	clearPushTracking,
	getPushTracking,
} from 'src/notifications/push-tracking';
import { FSPaths } from 'src/paths';
import { metrics } from 'src/theme/spacing';

const ButtonList = ({ children }: { children: ReactNode }) => {
	return (
		<Footer>
			<View style={{ width: '100%' }}>
				{React.Children.map(children, (button, i) => (
					<View
						key={i}
						style={{
							marginVertical: metrics.vertical / 2,
							marginHorizontal: metrics.horizontal,
						}}
					>
						{button}
					</View>
				))}
			</View>
		</Footer>
	);
};

const DevZone = () => {
	const navigation = useNavigation();
	const {
		isDevButtonShown: showNetInfoButton,
		setIsDevButtonShown: setShowNetInfoButton,
	} = useNetInfo();
	const [showAllEditions, setShowAllEditions] = useState(false);

	const onToggleShowAllEditions = () => {
		showAllEditionsCache.set(!showAllEditions);
		setShowAllEditions(!showAllEditions);
	};
	const onToggleNetInfoButton = () =>
		setShowNetInfoButton(!showNetInfoButton);
	const {
		selectedEdition: { edition },
	} = useEditions();

	const { attempt, signOutCAS } = useContext(AccessContext);
	const { showToast } = useToast();

	const [files, setFiles] = useState('fetching...');
	const [pushTrackingInfo, setPushTrackingInfo] = useState('fetching...');
	const [imageSize, setImageSize] = useState('fetching...');
	const [pushTokens, setPushTokens] = useState('fetching...');
	const [downloadedIssues, setDownloadedIssues] = useState('fetching...');

	// initialise local showAllEditions property
	useEffect(() => {
		showAllEditionsCache
			.get()
			.then((v) => v != null && setShowAllEditions(v));
	}, []);

	useEffect(() => {
		getIssuesCountStrings().then((stats) => {
			setDownloadedIssues(stats.join('\n'));
		});
	}, []);

	useEffect(() => {
		pushRegisteredTokens.get().then((tokens) => {
			setPushTokens(JSON.stringify(tokens, null, 2));
		});
	}, []);

	useEffect(() => {
		getFileList().then((fileList) => {
			setFiles(JSON.stringify(fileList, null, 2));
		});
	}, []);

	useEffect(() => {
		getPushTracking().then((pushTracking) => {
			pushTracking && setPushTrackingInfo(pushTracking);
		});
	}, []);

	useEffect(() => {
		imageForScreenSize().then(
			(imageSize) => imageSize && setImageSize(imageSize),
		);
	}, []);

	const query = useQuery<Record<string, unknown>>(
		gql(`{ ${ALL_SETTINGS_FRAGMENT} }`),
	);
	if (query.loading) return null;
	const { data, client } = query;
	const { apiUrl } = data;
	if (typeof apiUrl !== 'string') throw new Error('expected string');

	return (
		<>
			<Heading>🦆 SECRET DUCK MENU 🦆</Heading>
			<Footer>
				<UiBodyCopy>
					Only wander here if you know what you are doing!!
				</UiBodyCopy>
			</Footer>
			<ButtonList>
				<Button
					onPress={() => {
						navigation.navigate(RouteNames.OnboardingConsent);
					}}
				>
					Show Startup Consent
				</Button>
				<Button
					onPress={() => {
						// go back to the main to simulate a fresh app
						Alert.alert(
							'Delete all issue files',
							'You sure?',
							[
								{
									text: 'Delete issue files',
									onPress: () => {
										deleteIssueFiles();
									},
								},
								{
									style: 'cancel',
									text: `No don't do it`,
								},
							],
							{ cancelable: false },
						);
					}}
				>
					Delete issue files
				</Button>
				<Button
					onPress={() => {
						showToast('Toast title', { subtitle: 'Subtitle' });
					}}
				>
					Pop a toast
				</Button>
				{isInBeta() && Platform.OS === 'ios' && (
					<Button onPress={() => DEV_getLegacyIAPReceipt()}>
						Add legacy IAP receipt
					</Button>
				)}
				<Button
					onPress={() => {
						Alert.alert(
							'Clear caches',
							'You sure?',
							[
								{
									text: 'Delete fetch cache',
									onPress: () => {
										clearCache();
									},
								},
								{
									text: 'Delete EVERYTHING',
									onPress: () => {
										AsyncStorage.clear();
									},
								},
								{
									style: 'cancel',
									text: `No don't do it`,
								},
							],
							{ cancelable: false },
						);
					}}
				>
					Clear caches
				</Button>
			</ButtonList>
			<List
				data={[
					{
						key: 'Endpoints',
						title: 'API Endpoint',
						explainer: apiUrl,
						onPress: () => {
							navigation.navigate(RouteNames.Endpoints);
						},
					},
					{
						key: 'Editions',
						title: 'Editions',
						explainer: edition,
						onPress: () => {
							navigation.navigate(RouteNames.Edition);
						},
					},
					{
						key: 'Show All Editions',
						title: 'Show All Editions',
						explainer:
							'Show all editions in the editions menu - including expired editions and those with 0 issues',
						onPress: onToggleNetInfoButton,
						proxy: (
							<Switch
								value={showAllEditions}
								onValueChange={onToggleShowAllEditions}
							/>
						),
					},
					{
						key: 'Hide this menu',
						title: 'Hide this menu',
						explainer: 'Tap the version 7 times to bring it back',
						onPress: () => {
							setIsUsingProdDevtools(client, false);
						},
					},
					{
						key: 'Clear CAS caches',
						title: 'Clear CAS caches',
						onPress: signOutCAS,
					},
					{
						key: 'Locale',
						title: 'Device locale',
						explainer: locale,
					},
					{
						key: 'Reports as in test flight',
						title: 'Reports as in test flight',
						explainer: isInTestFlight().toString(),
					},
					{
						key: 'Copy local path to clipboard',
						title: 'Copy local path to clipboard',
						explainer: 'does what it says on the tin',
						onPress: () => {
							Clipboard.setString(FSPaths.issuesDir);
							Alert.alert(FSPaths.issuesDir);
						},
					},
					{
						key: 'Display NetInfo Button',
						title: 'Display NetInfo Button',
						onPress: onToggleNetInfoButton,
						proxy: (
							<Switch
								value={showNetInfoButton}
								onValueChange={onToggleNetInfoButton}
							/>
						),
					},
					{
						key: 'Image Size used for Editions',
						title: 'Image Size used for Editions',
						explainer: imageSize,
					},
					{
						key: 'Push Tokens',
						title: 'Registered push tokens',
						explainer: pushTokens,
					},
					{
						key: 'All Downloaded Issues',
						title: 'All Downloaded Issues',
						explainer: downloadedIssues,
					},
					{
						key: 'Files in Issues',
						title: 'Files in Issues',
						explainer: files,
					},
					{
						key: 'Clear Push Tracking',
						title: 'Clear Push Tracking',
						explainer:
							'Clears out tracking information relating to pushes',
						onPress: () =>
							Alert.alert(
								'Are you sure?',
								'Are you sure you want to delete the push tracking infromation. Please note this will be unrecoverable',
								[
									{
										text: 'Cancel',
										onPress: () => null,
									},
									{
										text: 'Delete',
										onPress: () => {
											clearPushTracking();
											setPushTrackingInfo('fetching...');
										},
										style: 'cancel',
									},
								],
							),
					},
					{
						key: 'Push Tracking Information',
						title: 'Push Tracking Information',
						explainer:
							pushTrackingInfo !== 'fetching...'
								? JSON.stringify(
										JSON.parse(pushTrackingInfo),
										null,
										2,
								  )
								: pushTrackingInfo,
					},
				]}
			/>
			<Heading>Your settings</Heading>
			<List
				data={Object.entries(data)
					.map(([title, explainer]) => ({
						key: title,
						title,
						explainer: explainer ? `${explainer} ` : 'false',
					}))
					.concat([
						{
							key: 'Authentication details',
							title: 'Authentication details',
							explainer: `Signed in ${isValid(attempt)} : ${
								isValid(attempt) && attempt.data
							}`,
						},
					])}
			/>
		</>
	);
};

export { DevZone };
