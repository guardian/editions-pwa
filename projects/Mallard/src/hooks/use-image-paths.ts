import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { imageForScreenSize } from 'src/helpers/screen';
import { APIPaths, FSPaths } from 'src/paths';
import type {
	Image,
	ImageSize,
	ImageUse,
	Issue,
} from '../../../Apps/common/src';
import { useIssueSummary } from './use-issue-summary';
import { useApiUrl } from './use-settings';

export type GetImagePath = (
	image?: Image,
	use?: ImageUse,
	forceRemotePath?: boolean,
) => string | undefined;

const getFsPath = (
	localIssueId: Issue['localId'],
	image: Image,
	size: ImageSize,
	use: ImageUse,
) => FSPaths.image(localIssueId, size, image, use);

export const selectImagePath = async (
	apiUrl: string,
	localIssueId: Issue['localId'],
	publishedIssueId: Issue['publishedId'],
	image: Image,
	use: ImageUse,
) => {
	const imageSize = await imageForScreenSize();
	const api = `${apiUrl}${APIPaths.image(
		publishedIssueId,
		imageSize,
		image,
		use,
	)}`;

	const fs = getFsPath(localIssueId, image, imageSize, use);
	const fsExists = await RNFS.exists(fs);

	const fsUpdatedPath = Platform.OS === 'android' ? 'file:///' + fs : fs;
	return fsExists ? fsUpdatedPath : api;
};

/**
 * A simple helper to get image paths.
 * This will asynchronously try the cache, otherwise will return the API url
 * if not available in the cache.
 *
 * Until the cache lookup has resolved, this will return undefined.
 * When the lookup resolves, a rerender should be triggered.
 *
 *  */

export const useImagePath = (image?: Image, use: ImageUse = 'full-size') => {
	const { issueId } = useIssueSummary();

	const [path, setPath] = useState<string | undefined>();

	// FIXME: we should handle the loading status correctly.
	const apiUrl = useApiUrl() || '';

	useEffect(() => {
		let localSetPath = setPath;
		if (issueId && image) {
			const { localIssueId, publishedIssueId } = issueId;
			selectImagePath(
				apiUrl,
				localIssueId,
				publishedIssueId,
				image,
				use,
			).then((newPath) => localSetPath(newPath));
		}
		return () => void (localSetPath = () => {});
	}, [
		apiUrl,
		image,
		use,

		issueId ? issueId.publishedIssueId : undefined, // Why isn't this just issueId?

		issueId ? issueId.localIssueId : undefined,
	]);
	if (image === undefined) return undefined;
	return path;
};
