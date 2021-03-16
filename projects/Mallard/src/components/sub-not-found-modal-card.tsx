import React from 'react';
import { Copy } from 'src/helpers/words';
import { ModalButton } from './Button/ModalButton';
import { CardAppearance, OnboardingCard } from './onboarding/onboarding-card';

const SubNotFoundModalCard = ({
	close,
	onOpenCASLogin,
	onLoginPress,
	onDismiss,
}: {
	close: () => void;
	onOpenCASLogin: () => void;
	onLoginPress: () => void;
	onDismiss: () => void;
}) => (
	<OnboardingCard
		title={Copy.subNotFound.title}
		appearance={CardAppearance.blue}
		size="small"
		explainerTitle={Copy.subNotFound.explainer}
		onDismissThisCard={() => {
			close();
			onDismiss();
		}}
		explainerSubtitle={Copy.subNotFound.explainerSubtitle}
		bottomContent={
			<>
				<ModalButton
					onPress={() => {
						close();
						onLoginPress();
					}}
				>
					{Copy.subNotFound.signIn}
				</ModalButton>
				<ModalButton
					onPress={() => {
						close();
						onOpenCASLogin();
					}}
				>
					{Copy.subNotFound.subscriberButton}
				</ModalButton>
			</>
		}
		bottomExplainerContent={
			<>
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
	></OnboardingCard>
);

export { SubNotFoundModalCard };
