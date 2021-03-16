import React from 'react';
import { DefaultInfoTextWebview } from './default-info-text-webview';

const termsAndConditionsHtml = require('src/constants/settings/terms-of-service.json')
	.bodyHtml;

const TermsAndConditionsScreen = () => (
	<DefaultInfoTextWebview html={termsAndConditionsHtml} />
);

TermsAndConditionsScreen.navigationOptions = {
	title: 'Terms & Conditions',
};

export { TermsAndConditionsScreen };
