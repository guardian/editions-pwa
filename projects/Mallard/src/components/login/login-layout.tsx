import React, { useEffect, useState } from 'react';
import {
	Dimensions,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useInsets } from 'src/hooks/use-screen';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { ButtonAppearance } from '../Button/Button';
import { CloseButton } from '../Button/CloseButton';
import { Spinner } from '../Spinner/Spinner';
import { TitlepieceText, UiBodyCopy } from '../styled-text';

const loginHeaderStyles = StyleSheet.create({
	wrapper: {
		paddingVertical: metrics.vertical,
		paddingHorizontal: metrics.horizontal,
		backgroundColor: color.ui.sea,
		flexDirection: 'column',
	},
	actionRow: {
		alignItems: 'flex-end',
		marginBottom: metrics.vertical / 2,
	},
	title: {
		color: color.textOverPrimary,
	},
});

const LoginHeader = ({
	children,
	onDismiss,
}: {
	children: string;
	onDismiss: () => void;
}) => {
	const insets = useInsets();
	return (
		<View
			style={[
				loginHeaderStyles.wrapper,
				{ paddingTop: insets.top + metrics.vertical },
			]}
		>
			<View style={loginHeaderStyles.actionRow}>
				<CloseButton
					onPress={onDismiss}
					accessibilityHint="Closes the login screen"
					accessibilityLabel="Close the login screen"
					appearance={ButtonAppearance.skeletonBlue}
				/>
			</View>
			<View>
				<TitlepieceText style={loginHeaderStyles.title}>
					{children}
				</TitlepieceText>
			</View>
		</View>
	);
};

const loginLayoutStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	keyboardAvoider: {
		flex: 1,
	},
	inner: {
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'column',
	},
	spinnerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,.8)',
		...StyleSheet.absoluteFillObject,
	},
	inputsContainer: {
		flexDirection: 'column',
		flexGrow: 1,
		flexShrink: 0,
		paddingHorizontal: metrics.horizontal,
		paddingVertical: metrics.vertical,
	},
	error: { color: color.error, marginBottom: 10 },
});

const LoginLayout = ({
	children,
	isLoading,
	title,
	errorMessage,
	onDismiss,
}: {
	children: React.ReactNode;
	isLoading: boolean;
	title: string;
	errorMessage: string | null;
	onDismiss: () => void;
}) => {
	const [avoidKeyboard, setAvoidKeyboard] = useState(true);

	const toggleAvoidKeyboard = (e: any) => {
		e.endCoordinates.width !== Dimensions.get('window').width
			? setAvoidKeyboard(false)
			: setAvoidKeyboard(true);
	};

	// the 'floating keyboard' on ios13 causes problems for KeyboardAvoidingView
	// see: https://stackoverflow.com/questions/59871352/is-is-possible-on-ipad-os-to-detect-if-the-keyboard-is-in-floating-mode
	// here we detect the floating keyboard using the keyboard width in order to disable the view
	useEffect(() => {
		if (Platform.OS === 'ios' && DeviceInfo.isTablet()) {
			const listener = Keyboard.addListener(
				'keyboardDidChangeFrame',
				toggleAvoidKeyboard,
			);
			return () => {
				listener.remove();
			};
		}
	}, []);

	return (
		<View style={loginLayoutStyles.wrapper}>
			<KeyboardAvoidingView
				style={loginLayoutStyles.keyboardAvoider}
				behavior="padding"
				enabled={avoidKeyboard}
			>
				<View style={loginLayoutStyles.inner}>
					<LoginHeader onDismiss={onDismiss}>{title}</LoginHeader>
					<View style={loginLayoutStyles.inputsContainer}>
						{errorMessage && (
							<UiBodyCopy style={loginLayoutStyles.error}>
								{errorMessage}
							</UiBodyCopy>
						)}
						{children}
					</View>
				</View>
				{isLoading && (
					<View style={loginLayoutStyles.spinnerContainer}>
						<Spinner />
					</View>
				)}
			</KeyboardAvoidingView>
		</View>
	);
};

export { LoginLayout, LoginHeader };
