import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import { AccessContext } from 'src/authentication/AccessContext';
import { isValid } from 'src/authentication/lib/Attempt';
import { LoginButton } from 'src/components/login/login-button';
import { LoginInput } from 'src/components/login/login-input';
import { LoginLayout } from 'src/components/login/login-layout';
import { useModal } from 'src/components/modal';
import { SubFoundModalCard } from 'src/components/sub-found-modal-card';
import { useFormField } from 'src/hooks/use-form-field';
import { getFont } from 'src/theme/typography';

const styles = StyleSheet.create({
	image: { height: 200, width: undefined },
	casExplainerTitle: { ...getFont('headline', 1, 'bold') },
	casExplainerBody: { ...getFont('headline', 1, 'regular') },
});

const CasSignInScreen = ({
	navigation,
}: {
	navigation: NavigationScreenProp<{}>;
}) => {
	const { authCAS } = useContext(AccessContext);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { open } = useModal();

	const [shouldShowError, setShouldShowError] = useState(false);

	const subscriberID = useFormField('', {
		validator: (subId) => (subId ? null : 'Please enter a subscriber ID'),
		onSet: () => setErrorMessage(null),
	});
	const password = useFormField('', {
		validator: (password) =>
			password ? null : 'Please enter a postcode or surname',
		onSet: () => setErrorMessage(null),
	});

	const handleSubmit = async () => {
		if (subscriberID.error || password.error) {
			setShouldShowError(true);
			return;
		}
		const { accessAttempt } = await authCAS(
			subscriberID.value,
			password.value,
		);
		if (isValid(accessAttempt)) {
			navigation.goBack();
			open((close) => <SubFoundModalCard close={close} />);
		} else {
			setErrorMessage(accessAttempt.reason || 'Something went wrong');
		}
		setIsLoading(false);
	};

	return (
		<LoginLayout
			title="Activate your subscription"
			onDismiss={() => navigation.goBack()}
			isLoading={isLoading}
			errorMessage={errorMessage}
		>
			<View>
				<LoginInput
					error={shouldShowError ? subscriberID.error : null}
					onChangeText={subscriberID.setValue}
					label="Subscriber ID (including all zeros)"
					accessibilityLabel="subscriber id input"
					value={subscriberID.value}
				/>
				<LoginInput
					error={shouldShowError ? password.error : null}
					onChangeText={password.setValue}
					label="Postcode or surname"
					accessibilityLabel="postcode or surname input"
					value={password.value}
				/>
				<LoginButton type="cta" onPress={handleSubmit}>
					Submit
				</LoginButton>
				<Text style={styles.casExplainerTitle}>
					What&apos;s a subscriber ID?
				</Text>
				<Text style={styles.casExplainerBody}>
					You can find your subscriber ID on your subscription
					confirmation email. If you collect your paper, your
					subscriber ID is on your voucher.
				</Text>

				<Image
					resizeMode="contain"
					style={styles.image}
					source={require(`src/assets/images/cas-voucher.jpg`)}
				/>
			</View>
		</LoginLayout>
	);
};

export { CasSignInScreen };
