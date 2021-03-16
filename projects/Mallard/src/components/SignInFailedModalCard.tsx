import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Copy } from 'src/helpers/words';
import { metrics } from 'src/theme/spacing';
import { ModalButton } from './Button/ModalButton';
import { CardAppearance, OnboardingCard } from './onboarding/onboarding-card';
import { UiBodyCopy } from './styled-text';

const styles = StyleSheet.create({
	bottomContentContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: metrics.vertical * 2,
	},
});

interface FailureModalText {
	title: string;
	bodyCopy: string;
	tryAgainText: string;
}

const failureModalText = (
	isAppleRelayEmail: boolean,
	email: string,
): FailureModalText => {
	return isAppleRelayEmail
		? {
				title: Copy.failedSignIn.appleRelayTitle,
				bodyCopy: Copy.failedSignIn.appleRelayBody,
				tryAgainText: Copy.failedSignIn.appleRelayRetry,
		  }
		: {
				title: Copy.failedSignIn.title,
				bodyCopy: Copy.failedSignIn.body.replace('%email%', email),
				tryAgainText: Copy.failedSignIn.retryButtonTitle,
		  };
};

const SignInFailedModalCard = ({
	close,
	onLoginPress,
	onOpenCASLogin,
	onDismiss,
	onFaqPress,
	email,
}: {
	close: () => void;
	onLoginPress: () => void;
	onOpenCASLogin: () => void;
	onDismiss: () => void;
	onFaqPress: () => void;
	email: string;
}) => {
	const isAppleRelayEmail = email.includes('privaterelay.appleid.com');
	const modalText = failureModalText(isAppleRelayEmail, email);
	return (
		<OnboardingCard
			title={modalText.title}
			appearance={CardAppearance.blue}
			onDismissThisCard={() => {
				close();
				onDismiss();
			}}
			size="small"
			bottomContent={
				<>
					<UiBodyCopy weight="bold">{modalText.bodyCopy}</UiBodyCopy>
					<View style={styles.bottomContentContainer}>
						<View>
							<ModalButton
								onPress={() => {
									close();
									onLoginPress();
								}}
							>
								{modalText.tryAgainText}
							</ModalButton>
							<ModalButton
								onPress={() => {
									close();
									onOpenCASLogin();
								}}
							>
								Activate with subscriber ID
							</ModalButton>
							{isAppleRelayEmail && (
								<ModalButton
									onPress={() => {
										close();
										onFaqPress();
									}}
								>
									How can I sign in with Apple?
								</ModalButton>
							)}
						</View>
					</View>
				</>
			}
		/>
	);
};

export { SignInFailedModalCard };
