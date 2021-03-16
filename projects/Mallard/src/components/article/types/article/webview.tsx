import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import type { WebViewProps } from 'react-native-webview';
import { WebView } from 'react-native-webview';
import type {
	Article,
	ArticleType,
	GalleryArticle,
	Image,
	ImageSize,
	ImageUse,
	IssueOrigin,
	PictureArticle,
} from 'src/common';
import { defaultSettings } from 'src/helpers/settings/defaults';
import { useQuery } from 'src/hooks/apollo';
import { useArticle } from 'src/hooks/use-article';
import {
	useIsAppsRendering,
	useLargeDeviceMemory,
} from 'src/hooks/use-config-provider';
import type { PathToArticle } from 'src/paths';
import { APIPaths, FSPaths } from 'src/paths';
import { renderArticle } from '../../html/article';
import { onShouldStartLoadWithRequest } from './helpers';

type QueryValue = { imageSize: ImageSize; apiUrl: string };
const QUERY = gql`
	{
		imageSize @client
		apiUrl @client
	}
`;

const WebviewWithArticle = ({
	article,
	path,
	type,
	_ref,
	topPadding,
	origin,
	...webViewProps
}: {
	article: Article | PictureArticle | GalleryArticle;
	path: PathToArticle;
	type: ArticleType;
	_ref?: (ref: WebView) => void;
	topPadding: number;
	origin: IssueOrigin;
} & WebViewProps & { onScroll?: any }) => {
	const client = useApolloClient();
	// This line ensures we don't re-render the article when
	// the network connection changes, see the comments around
	// `fetchImmediate` where it is defined
	const data = client.readQuery<{ netInfo: { isConnected: boolean } }>({
		query: gql('{ netInfo @client { isConnected @client } }'),
	});
	const [isConnected] = useState(
		data != null ? data.netInfo.isConnected : false,
	);
	const { isAppsRendering } = useIsAppsRendering();

	// FIXME: pass this as article data instead so it's never out-of-sync?
	const [, { pillar }] = useArticle();

	const largeDeviceMemory = useLargeDeviceMemory();

	const res = useQuery<QueryValue>(QUERY);
	// Hold off rendering until we have all the necessary data.
	if (res.loading) return null;
	const { imageSize, apiUrl } = res.data;
	const { localIssueId, publishedIssueId } = path;

	const getImagePath = (
		image?: Image,
		use: ImageUse = 'full-size',
		forceRemotePath = false,
	) => {
		if (image == null) return undefined;

		const issueId = publishedIssueId;

		if (forceRemotePath) {
			// Duplicates the below, but we want an early return
			const imagePath = APIPaths.image(issueId, imageSize, image, use);
			return `${apiUrl}${imagePath}`;
		}

		if (origin === 'filesystem') {
			const fs = FSPaths.image(localIssueId, imageSize, image, use);
			return Platform.OS === 'android' ? 'file:///' + fs : fs;
		}

		const imagePath = APIPaths.image(issueId, imageSize, image, use);
		return `${apiUrl}${imagePath}`;
	};

	const html = renderArticle(article.elements, {
		pillar,
		article,
		type,
		imageSize,
		showWebHeader: true,
		showMedia: isConnected,
		publishedId: publishedIssueId || null,
		topPadding,
		getImagePath,
	});

	const clientRenderingSource = {
		html,
		baseUrl:
			'' /* required as per https://stackoverflow.com/a/51931187/609907 */,
	};

	const appsRenderingSource = {
		uri: `${defaultSettings.appsRenderingService}${article.key}?editions`,
	};

	const source = isAppsRendering
		? appsRenderingSource
		: clientRenderingSource;

	return (
		<WebView
			{...webViewProps}
			bounces={largeDeviceMemory ? true : false}
			originWhitelist={['*']}
			scrollEnabled={true}
			source={source}
			ref={_ref}
			onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
			allowFileAccess={true}
		/>
	);
};

export { WebviewWithArticle };
