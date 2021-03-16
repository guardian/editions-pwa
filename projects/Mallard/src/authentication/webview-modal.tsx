import React from 'react';
import { Modal, View } from 'react-native';
import WebView from 'react-native-webview';
import type { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';

export const WebviewModal = ({
	url,
	visible,
	onStateChange,
	setVisible,
}: {
	url: string;
	visible: boolean;
	onStateChange: (url: string) => void;
	setVisible: (v: boolean) => void;
}) => {
	return (
		<Modal
			visible={visible}
			onRequestClose={() => {
				setVisible(false);
			}}
		>
			<View style={{ flex: 1, backgroundColor: 'black' }}>
				<WebView
					source={{ uri: url }}
					onNavigationStateChange={(newState: WebViewNavigation) => {
						const { url } = newState;
						onStateChange(url);
					}}
				/>
			</View>
		</Modal>
	);
};
