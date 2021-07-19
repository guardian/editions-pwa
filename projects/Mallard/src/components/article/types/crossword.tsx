import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import type { CrosswordArticle } from 'src/common';
import { getBundleUri } from 'src/helpers/webview';

const styles = StyleSheet.create({ flex: { flex: 1 } });

const Crossword = ({
	crosswordArticle,
}: {
	crosswordArticle: CrosswordArticle;
}) => {
	return (
		<WebView
			key={crosswordArticle.key}
			originWhitelist={['*']}
			source={{ uri: getBundleUri('crosswords') }}
			injectedJavaScript={`
                window.loadCrosswordData("${
					crosswordArticle.key
				}", ${JSON.stringify(crosswordArticle.crossword)}); true;
            `}
			onMessage={(event) => {
				console.log(JSON.stringify(event));
			}} // This is important, with onMessage JS will not be injected, doc: https://github.com/react-native-webview/react-native-webview/blob/d6672c87eb61827c9b0215733a4766c14f68d01a/docs/Guide.md
			allowFileAccess={true}
			javaScriptEnabled={true}
			style={styles.flex}
		/>
	);
};

export { Crossword };
