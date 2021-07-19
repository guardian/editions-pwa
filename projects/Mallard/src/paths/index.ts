import RNFS from 'react-native-fs';
import type {
	CAPIArticle,
	Collection,
	Front,
	Image,
	ImageUse,
	Issue,
} from 'src/common';
import { frontPath, issuePath } from 'src/common';
import { imagePath } from '../../../Apps/common/src';
import { defaultRegionalEditions } from '../../../Apps/common/src/editions-defaults';

export interface PathToIssue {
	localIssueId: Issue['localId'];
	publishedIssueId: Issue['publishedId'];
}

export interface PathToArticle {
	collection: Collection['key'];
	front: Front['key'];
	article: CAPIArticle['key'];
	localIssueId: Issue['localId'];
	publishedIssueId: Issue['publishedId'];
}

export const APIPaths = {
	issue: issuePath,
	front: frontPath,
	image: imagePath,
};

const issuesDir = `${RNFS.DocumentDirectoryPath}/issues`;

const issueRoot = (localIssueId: string) => `${issuesDir}/${localIssueId}`;
const mediaRoot = (localIssueId: string) => `${issueRoot(localIssueId)}/media`;
const editionDir = (editionSlug: string) => {
	return `${issuesDir}/${editionSlug}`;
};
const edtionsDirList = async (): Promise<string[]> => {
	return defaultRegionalEditions.map((reg) => {
		return `${issuesDir}/${reg.edition}`;
	});
};

export const FSPaths = {
	issuesDir,
	editionDir,
	edtionsDirList,
	issueRoot,
	mediaRoot,
	image: (localIssueId: string, image: Image, use: ImageUse) =>
		imagePath(issueRoot(localIssueId), image, use),
	zip: (localIssueId: string, filename: string) =>
		`${issueRoot(localIssueId)}/${filename}.zip`,
	issue: (localIssueId: string) => `${issueRoot(localIssueId)}/issue`,
	front: (localIssueId: string, frontId: string) =>
		`${issueRoot(localIssueId)}/front/${frontId}`,
	downloadRoot: `${issuesDir}/download`,
	downloadIssueLocation: (localIssueId: string) =>
		`${issuesDir}/download/${localIssueId}`,
};
