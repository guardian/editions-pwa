import React from 'react';
import {
	Image,
	Linking,
	Modal,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { defaultSettings } from 'src/helpers/settings/defaults';
import { Copy } from 'src/helpers/words';
import { useDeprecationModal } from 'src/hooks/use-deprecation-screen';
import { color } from 'src/theme/color';
import { getFont } from 'src/theme/typography';
import { TitlepieceText } from '../components/styled-text';
import { useNetInfo } from '../hooks/use-net-info';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.ui.sea,
		justifyContent: 'flex-end',
	},
	textContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		padding: 28,
		maxWidth: 500,
		alignSelf: 'center',
	},
	title: {
		color: color.palette.neutral[100],
		marginBottom: 30,
	},
	subTitle: {
		color: color.primary,
	},
	logo: {
		flex: 1,
		width: '90%',
		resizeMode: 'contain',
		alignSelf: 'center',
		maxWidth: 460,
	},
	link: {
		textDecorationLine: 'underline',
	},
});

const StoreLink = () => {
	const name = Platform.OS === 'ios' ? 'App Store' : 'Google Play Store';
	const link =
		Platform.OS === 'ios'
			? defaultSettings.storeDetails.ios
			: defaultSettings.storeDetails.android;
	return (
		<Text style={styles.link} onPress={() => Linking.openURL(link)}>
			{name}
		</Text>
	);
};

const DeprecateVersionModal = () => {
	const { isConnected } = useNetInfo();
	const { showModal } = useDeprecationModal();

	return (
		<Modal visible={isConnected && showModal}>
			<SafeAreaView style={styles.container}>
				<View style={styles.textContainer}>
					<TitlepieceText
						accessibilityRole="header"
						style={[getFont('titlepiece', 2), styles.title]}
					>
						{Copy.deprecateModal.title}
					</TitlepieceText>
					<TitlepieceText
						style={[getFont('titlepiece', 1.5), styles.subTitle]}
					>
						Please go to the {StoreLink()} to update to the latest
						version
					</TitlepieceText>
				</View>

				<Image
					source={require('../assets/images/guardian-observer.png')}
					style={styles.logo}
				/>
			</SafeAreaView>
		</Modal>
	);
};

export { DeprecateVersionModal };
