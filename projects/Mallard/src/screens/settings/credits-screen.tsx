import React, { useEffect, useState } from 'react';
import { DefaultInfoTextWebview } from './default-info-text-webview';

const CreditsScreen = () => {
	const [htmlData, setHtmlData] = useState('loading...');

	useEffect(() => {
		setHtmlData(require('src/constants/settings/credits.json').bodyHtml);
	}, []);

	return <DefaultInfoTextWebview html={htmlData} />;
};

CreditsScreen.navigationOptions = {
	title: 'Credits',
};

export { CreditsScreen };
