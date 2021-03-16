import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, Text, View } from 'react-native';
import type { NavigationInjectedProps } from 'react-navigation';
import { Button, ButtonAppearance } from 'src/components/Button/Button';
import { ScrollContainer } from 'src/components/layout/ui/container';
import { Footer, Separator, TallRow } from 'src/components/layout/ui/row';
import type { ThreeWaySwitchValue } from 'src/components/layout/ui/switch';
import { ThreeWaySwitch } from 'src/components/layout/ui/switch';
import { LinkNav } from 'src/components/link';
import { LoginHeader } from 'src/components/login/login-layout';
import { UiBodyCopy } from 'src/components/styled-text';
import type { GdprSwitchSettings } from 'src/helpers/settings';
import {
	CURRENT_CONSENT_VERSION,
	gdprAllowFunctionalityKey,
	gdprAllowPerformanceKey,
	GdprBuckets,
	gdprConsentVersionKey,
	gdprSwitchSettings,
	getSetting,
	storeSetting,
} from 'src/helpers/settings';
import { GDPR_CONSENT_VERSION } from 'src/helpers/settings/setters';
import {
	PREFS_SAVED_MSG,
	PRIVACY_SETTINGS_HEADER_TITLE,
} from 'src/helpers/words';
import { useToast } from 'src/hooks/use-toast';
import { routeNames } from 'src/navigation/routes';
import { WithAppAppearance } from 'src/theme/appearance';

interface GdprConfig {
	gdprAllowPerformance: ThreeWaySwitchValue;
	gdprAllowFunctionality: ThreeWaySwitchValue;
	gdprCurrentVersion: number | null;
}

interface GdprSwitch {
	key: keyof GdprSwitchSettings;
	name: string;
	services: string;
	description: string;
}
type EssentialGdprSwitch = Omit<GdprSwitch, 'key'>;

const essentials: EssentialGdprSwitch = {
	name: 'Essential',
	services:
		'Ophan - YouTube Player - Firebase Cloud Messaging - Firebase Remote Config',
	description:
		'These are essential to provide you with services that you have requested. These services support the ability for you to watch videos, see service-related messages, download content automatically and receive new features without app releases.',
};

const setGDPRCurrentVersion = () => {
	storeSetting(GDPR_CONSENT_VERSION, CURRENT_CONSENT_VERSION);
};

export const setConsent = (
	consentBucketKey: keyof GdprSwitchSettings,
	value: ThreeWaySwitchValue,
) => {
	storeSetting(consentBucketKey, value);
	GdprBuckets[consentBucketKey].forEach((key) => {
		storeSetting(key, value);
	});
	setGDPRCurrentVersion();
};

const consentToAll = () => {
	gdprSwitchSettings.forEach((sw) => {
		setConsent(sw, true);
	});
	setGDPRCurrentVersion();
};

export const resetAll = () => {
	gdprSwitchSettings.forEach((sw) => {
		setConsent(sw, null);
	});
	setGDPRCurrentVersion();
};

const GdprConsent = ({
	shouldShowDismissableHeader = false,
	navigation,
	continueText,
}: {
	shouldShowDismissableHeader?: boolean;
	continueText: string;
} & NavigationInjectedProps) => {
	const { showToast } = useToast();

	const [updateFlag, setDataUpdated] = useState(false);
	const [gdprData, updateGdprData] = useState<GdprConfig>({
		gdprAllowPerformance: null,
		gdprAllowFunctionality: null,
		gdprCurrentVersion: null,
	});

	const fetchAndSetGdprData = async () => {
		const perfData = await getSetting(gdprAllowPerformanceKey);
		const funcData = await getSetting(gdprAllowFunctionalityKey);
		const currentVersion = await getSetting(gdprConsentVersionKey);
		updateGdprData({
			gdprAllowPerformance: perfData,
			gdprAllowFunctionality: funcData,
			gdprCurrentVersion: currentVersion,
		});
	};

	useEffect(() => {
		fetchAndSetGdprData();
	}, [updateFlag]);

	const setConsentAndUpdate = (
		consentBucketKey: keyof GdprSwitchSettings,
		value: ThreeWaySwitchValue,
	) => {
		setConsent(consentBucketKey, value);
		setDataUpdated(!updateFlag); // force to re-render UI with updated value
	};

	const consentAllAndUpdate = () => {
		consentToAll();
		setDataUpdated(!updateFlag);
	};

	const resetAllAndUpdate = () => {
		resetAll();
		setDataUpdated(!updateFlag);
	};

	const switches: { [key in keyof GdprSwitchSettings]: GdprSwitch } = {
		gdprAllowPerformance: {
			key: gdprAllowPerformanceKey,
			name: 'Performance',
			services: 'Sentry - Logging - Crashlytics',
			description:
				'Enabling these allow us to observe and measure how you use our services. We use this information to fix bugs more quickly so that users have a better experience. For example, we would be able to see the journey you have taken and where the error was encountered. Your data will only be stored in our servers for two weeks. If you disable this, we will not be able to observe and measure your use of our services, and we will have less information about their performance and details of any issues encountered.',
		},
		gdprAllowFunctionality: {
			key: gdprAllowFunctionalityKey,
			name: 'Functionality',
			services: 'Apple - Google - Facebook',
			description:
				'Enabling these allow us to provide extra sign-in functionality. It enables us to offer alternative options for you to sign-in to your Guardian account using your Apple, Google, or Facebook credentials. If you disable this, you won’t be able to sign-in with the third-party services above.',
		},
	};

	const onEnableAllAndContinue = () => {
		consentAllAndUpdate();
		showToast(PREFS_SAVED_MSG);
		navigation.navigate('App');
	};

	const onDismiss = () => {
		if (
			gdprData.gdprAllowFunctionality != null &&
			gdprData.gdprAllowPerformance != null &&
			gdprData.gdprCurrentVersion === CURRENT_CONSENT_VERSION
		) {
			showToast(PREFS_SAVED_MSG);
			navigation.navigate('App');
		} else {
			Alert.alert(
				'Before you go',
				`Please set your preferences for 'Performance' and 'Functionality'.`,
				[
					{ text: 'Manage preferences', onPress: () => {} },
					{
						text: continueText,
						onPress: () => onEnableAllAndContinue(),
					},
				],
				{ cancelable: false },
			);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			{shouldShowDismissableHeader ? (
				<LoginHeader onDismiss={onDismiss}>
					{PRIVACY_SETTINGS_HEADER_TITLE}
				</LoginHeader>
			) : (
				<></>
			)}
			<ScrollView>
				<TallRow
					title={''}
					explainer={
						<Text>
							Below you can manage your privacy settings for
							cookies and similar technologies for this service.
							These technologies are provided by us and by our
							third-party partners. To find out more, read our{' '}
							<LinkNav
								onPress={() =>
									navigation.navigate(
										routeNames.onboarding
											.PrivacyPolicyInline,
									)
								}
							>
								privacy policy
							</LinkNav>
							. If you disable a category, you may need to restart
							the app for your changes to fully take effect.
						</Text>
					}
					proxy={
						<Button
							appearance={ButtonAppearance.skeleton}
							onPress={() => onEnableAllAndContinue()}
						>
							{continueText}
						</Button>
					}
				></TallRow>
				<Separator></Separator>
				<TallRow
					title={essentials.name}
					subtitle={essentials.services}
					explainer={essentials.description}
				></TallRow>

				<FlatList
					ItemSeparatorComponent={Separator}
					ListFooterComponent={Separator}
					ListHeaderComponent={Separator}
					data={Object.values(switches)}
					keyExtractor={({ key }) => key}
					renderItem={({ item }) => (
						<TallRow
							title={item.name}
							subtitle={item.services}
							explainer={item.description}
							proxy={
								<ThreeWaySwitch
									onValueChange={(value) => {
										setConsentAndUpdate(item.key, value);
										showToast(PREFS_SAVED_MSG);
									}}
									value={
										gdprData.gdprCurrentVersion !==
										CURRENT_CONSENT_VERSION
											? null
											: gdprData[item.key]
									}
								/>
							}
						></TallRow>
					)}
				/>
				<Footer>
					<UiBodyCopy weight="bold" style={{ fontSize: 14 }}>
						You can change the above settings any time by selecting
						Privacy Settings from the Settings menu.
					</UiBodyCopy>
				</Footer>
				{__DEV__ ? (
					<Footer>
						<Button onPress={resetAllAndUpdate.bind(undefined)}>
							Reset
						</Button>
					</Footer>
				) : null}
			</ScrollView>
		</View>
	);
};

const GdprConsentScreen = ({ navigation }: NavigationInjectedProps) => (
	<WithAppAppearance value={'settings'}>
		<ScrollContainer>
			<GdprConsent
				navigation={navigation}
				continueText={'Enable all'}
			></GdprConsent>
		</ScrollContainer>
	</WithAppAppearance>
);

const GdprConsentScreenForOnboarding = ({
	navigation,
}: NavigationInjectedProps) => (
	<WithAppAppearance value={'settings'}>
		<GdprConsent
			shouldShowDismissableHeader={true}
			continueText={'Enable all and continue'}
			navigation={navigation}
		></GdprConsent>
	</WithAppAppearance>
);

GdprConsentScreen.navigationOptions = {
	title: PRIVACY_SETTINGS_HEADER_TITLE,
};

export { GdprConsent, GdprConsentScreenForOnboarding, GdprConsentScreen };
