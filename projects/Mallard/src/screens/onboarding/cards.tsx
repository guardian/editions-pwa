import gql from 'graphql-tag';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonAppearance } from 'src/components/Button/Button';
import { ModalButton } from 'src/components/Button/ModalButton';
import { LinkNav } from 'src/components/link';
import {
	CardAppearance,
	OnboardingCard,
} from 'src/components/onboarding/onboarding-card';
import {
	CURRENT_CONSENT_VERSION,
	gdprSwitchSettings,
} from 'src/helpers/settings';
import { GDPR_SETTINGS_FRAGMENT } from 'src/helpers/settings/resolvers';
import {
	setGdprConsentVersion,
	setGdprFlag,
} from 'src/helpers/settings/setters';
import { Copy } from 'src/helpers/words';
import { useQuery } from 'src/hooks/apollo';

const Aligner = ({ children }: { children: React.ReactNode }) => (
	<View
		style={{
			flexDirection: 'column',
			flex: 1,
			alignItems: 'stretch',
			justifyContent: 'center',
		}}
	>
		{children}
	</View>
);

const styles = StyleSheet.create({
	consentButtonContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
});

const QUERY = gql(`{ ${GDPR_SETTINGS_FRAGMENT} }`);

const OnboardingConsent = ({
	onOpenGdprConsent,
	onContinue,
	onOpenPrivacyPolicy,
}: {
	onOpenGdprConsent: () => void;
	onContinue: () => void;
	onOpenPrivacyPolicy: () => void;
}) => {
	const query = useQuery<Record<string, boolean | null>>(QUERY);
	if (query.loading) return null;
	const { client } = query;

	const enableNulls = () => {
		gdprSwitchSettings.map((sw) => {
			setGdprFlag(client, sw, true);
		});
		setGdprConsentVersion(client, CURRENT_CONSENT_VERSION);
	};

	return (
		<Aligner>
			<OnboardingCard
				appearance={CardAppearance.blue}
				title={Copy.consentOnboarding.title}
				explainerTitle={Copy.consentOnboarding.explainerTitle}
				bottomExplainerContent={
					<>
						<View style={styles.consentButtonContainer}>
							<View>
								<ModalButton
									onPress={() => {
										onOpenGdprConsent();
									}}
									buttonAppearance={
										ButtonAppearance.skeletonBlue
									}
								>
									{Copy.consentOnboarding.optionsButton}
								</ModalButton>
							</View>
							<View>
								<ModalButton
									onPress={() => {
										enableNulls();
										onContinue();
									}}
									buttonAppearance={ButtonAppearance.dark}
								>
									{Copy.consentOnboarding.okayButton}
								</ModalButton>
							</View>
						</View>
					</>
				}
			>
				{
					<>
						The only data that is collected (through tracking
						technology) is used by the Guardian to improve your
						experience and our level of service to you. By
						continuing, you agree with the Guardian&apos;s{' '}
						<LinkNav onPress={onOpenPrivacyPolicy}>
							privacy policy
						</LinkNav>
						.
					</>
				}
			</OnboardingCard>
		</Aligner>
	);
};

export { OnboardingConsent };
