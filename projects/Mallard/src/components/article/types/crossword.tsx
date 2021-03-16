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
			allowFileAccess={true}
			javaScriptEnabled={true}
			style={styles.flex}
		/>
	);
};

export { Crossword };
