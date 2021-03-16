import React from 'react';
import { Linking, Platform, StyleSheet, View } from 'react-native';
import { Copy } from 'src/helpers/words';
import { Action, ComponentType, sendComponentEvent } from 'src/services/ophan';
import { getFont } from 'src/theme/typography';
import { ButtonAppearance } from './Button/Button';
import { ModalButton } from './Button/ModalButton';
import { Link } from './link';
import { CardAppearance, OnboardingCard } from './onboarding/onboarding-card';

const styles = StyleSheet.create({
	bottomContentContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexGrow: 1,
		marginRight: 15,
	},
});

const SignInModalCard = ({
	close,
	onLoginPress,
	onDismiss,
}: {
	close: () => void;
	onLoginPress: () => void;
	onDismiss: () => void;
}) => {
	return (
		<OnboardingCard
			onDismissThisCard={onDismiss}
			title={Copy.signIn.title}
			subtitle={Copy.signIn.subtitle}
			appearance={CardAppearance.blue}
			size="medium"
			bottomContent={
				<>
					<View style={styles.bottomContentContainer}>
						<ModalButton
							onPress={() => {
								close();
								onLoginPress();
								sendComponentEvent({
									componentType: ComponentType.appButton,
									action: Action.click,
									value: 'sign_in_continue_clicked',
								});
							}}
						>
							Sign in
						</ModalButton>
						<Link
							style={{ ...getFont('sans', 0.9, 'bold') }}
							href="https://www.theguardian.com/help/identity-faq"
						>
							Need help signing in?
						</Link>
					</View>
				</>
			}
			explainerTitle={Copy.signIn.explainerTitle}
			explainerSubtitle={Copy.signIn.explainerSubtitle}
			bottomExplainerContent={
				<>
					{/* Added only for Android - https://trello.com/c/FsoQQx3m/707-already-a-subscriber-hide-the-learn-more-button */}
					{Platform.OS === 'android' ? (
						<ModalButton
							onPress={() => {
								Linking.openURL(
									'https://support.theguardian.com/uk/subscribe/digital',
								);
							}}
							buttonAppearance={ButtonAppearance.dark}
						>
							{Copy.signIn.freeTrial}
						</ModalButton>
					) : null}
					{/* Being hidden temporarily - https://trello.com/c/FsoQQx3m/707-already-a-subscriber-hide-the-learn-more-button */}
					{/* <ModalButton
                    onPress={() => {
                        if (Platform.OS === 'android') {
                            Linking.openURL(
                                'https://support.theguardian.com/uk/subscribe/digital',
                            )
                        }
                    }}
                    buttonAppearance={ButtonAppearance.dark}
                >
                    {Platform.OS === 'ios'
                        ? 'Learn more'
                        : 'Get your free 14 day trial'}
                </ModalButton> */}
				</>
			}
		/>
	);
};

export { SignInModalCard };
