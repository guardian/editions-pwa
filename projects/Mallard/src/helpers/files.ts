import RNFS from 'react-native-fs';
import { unzip } from 'react-native-zip-archive';
import type { Issue, IssueSummary } from 'src/common';
import { updateListeners } from 'src/download-edition/download-and-unzip';
import { editionsListCache } from 'src/helpers/storage';
import { getSelectedEditionSlug } from 'src/hooks/use-edition-provider';
import { FSPaths } from 'src/paths';
import { errorService } from 'src/services/errors';
import { getEditionIds } from '../../../Apps/common/src/helpers';
import { londonTime } from './date';
import { withCache } from './fetch/cache';
import { imageForScreenSize } from './screen';
import { getSetting } from './settings';
import { defaultSettings } from './settings/defaults';

// matches the issue date, i.e. 2020-02-01
const ISSUE_DATE_REGEX = /\d{4}-\d{2}-\d{2}/gm;

export type DLStatus =
	| { type: 'download'; data: number }
	| { type: 'unzip'; data: 'start' }
	| { type: 'success' }
	| { type: 'failure' };

export const ensureDirExists = (dir: string): Promise<void> =>
	RNFS.mkdir(dir).catch(() => Promise.resolve());

/*
We always try to prep the file system before accessing issuesDir
*/
export const prepFileSystem = async (): Promise<void> => {
	await ensureDirExists(FSPaths.issuesDir);
	await ensureDirExists(FSPaths.downloadRoot);
	const editionsList = await editionsListCache.get();
	const editionIds = getEditionIds(editionsList);

	await Promise.all(
		editionIds.map((edition) =>
			ensureDirExists(`${FSPaths.issuesDir}/${edition}`),
		),
	);
	await Promise.all(
		editionIds.map((edition) =>
			ensureDirExists(`${FSPaths.downloadRoot}/${edition}`),
		),
	);
};

export const readFileAsJSON = <T extends any>(path: string): Promise<T> =>
	RNFS.readFile(path, 'utf8').then((d) => JSON.parse(d));

export const downloadNamedIssueArchive = async ({
	localIssueId,
	assetPath,
	filename,
	withProgress,
}: {
	localIssueId: Issue['localId'];
	assetPath: string;
	filename: string;
	withProgress: boolean;
}) => {
	const apiUrl = await getSetting('apiUrl');
	const zipUrl = `${apiUrl}${assetPath}`;
	const downloadFolderLocation = FSPaths.downloadIssueLocation(localIssueId);
	await prepFileSystem();
	await ensureDirExists(FSPaths.issueRoot(localIssueId));
	await ensureDirExists(downloadFolderLocation);

	const returnable = RNFS.downloadFile({
		fromUrl: zipUrl,
		toFile: `${downloadFolderLocation}/${filename}`,
		readTimeout: 300 * 1000, // set it to 5 mins, default is 15sec (android & iOS)
		connectionTimeout: 30 * 1000, // set it to 30sec, default is 5sec (android only)
		background: true,
		begin: () => console.log('start download'),
		progress: (response) => {
			if (withProgress) {
				const percentage =
					(response.bytesWritten / response.contentLength) * 100;
				updateListeners(localIssueId, {
					type: 'download',
					data: percentage,
				});
			}
		},
		progressInterval: 1,
	});

	const { clear } = withCache('issue');
	clear(localIssueId);
	return await returnable.promise;
};

export const unzipNamedIssueArchive = async (zipFilePath: string) => {
	const outputPath = FSPaths.issuesDir;

	try {
		await unzip(zipFilePath, outputPath);
		return RNFS.unlink(zipFilePath);
	} catch (e) {
		e.message = `${e.message} - zipFilePath: ${zipFilePath} - outputPath: ${outputPath}`;
		errorService.captureException(e);
		console.log('Unzip Error: ' + JSON.stringify(e));
	}
};

/**
 * Only return true if we have both directories
 */
export const isIssueOnDevice = async (
	localIssueId: Issue['localId'],
): Promise<boolean> =>
	(
		await Promise.all([
			RNFS.exists(FSPaths.issue(localIssueId)),
			RNFS.exists(FSPaths.mediaRoot(localIssueId)),
			RNFS.exists(`${FSPaths.issueRoot(localIssueId)}/front`),
			RNFS.exists(`${FSPaths.issueRoot(localIssueId)}/thumbs`),
		])
	).every((_) => _);

const withPathPrefix = (prefix: string) => (str: string) => `${prefix}/${str}`;

export const getLocalIssues = async (editionSlug: string) => {
	const editionDirectory = await FSPaths.editionDir(editionSlug);
	return RNFS.readdir(editionDirectory).then((files) =>
		files.map(withPathPrefix(editionSlug)),
	);
};

export const getIssuesCountStrings = async () => {
	const editionDirList = await FSPaths.edtionsDirList();
	const result: string[] = [];
	for (let i = 0; i < editionDirList.length; i++) {
		const dir = editionDirList[i];
		const files = await RNFS.readdir(dir);
		const issueFiles = files.filter(
			(file) => file.match(ISSUE_DATE_REGEX) != null,
		);
		result.push(`${dir.split('/').pop()}: ${issueFiles.length} issues`);
	}
	return result;
};

export const getIssuesToDelete = async (files: string[]) => {
	const maxAvailableEditions = await getSetting('maxAvailableEditions');
	const totalIssues = files.length;

	if (totalIssues <= maxAvailableEditions) {
		console.log(
			`No Issues to delete: downloaded issues are ${files.length} and max number is ${maxAvailableEditions}`,
		);
		return [];
	}

	// sort in descending order so we can loop through it and keep the latest issues
	files.sort().reverse();

	const deleteList: string[] = [];
	let keepIssues = 0;

	for (let i = 0; i < totalIssues; i++) {
		const isAnIssue = files[i].match(ISSUE_DATE_REGEX) != null;
		if (isAnIssue && keepIssues < maxAvailableEditions) {
			keepIssues++;
			continue;
		}

		const canDelete = !files[i].endsWith('/issues');
		if (canDelete) deleteList.push(files[i]);
	}

	return deleteList;
};

export const findIssueSummaryByKey = (
	issueSummaries: IssueSummary[],
	key: string,
): IssueSummary => {
	const summaryMatch = issueSummaries.find(
		(issueSummary) => issueSummary.key === key,
	) as IssueSummary;
	return summaryMatch || null;
};

export const readIssueSummary = async (): Promise<IssueSummary[]> => {
	const editionSlug = await getSelectedEditionSlug();
	const editionDirectory = FSPaths.editionDir(editionSlug);
	return RNFS.readFile(editionDirectory + defaultSettings.issuesPath, 'utf8')
		.then((data) => {
			try {
				return JSON.parse(data);
			} catch (e) {
				e.message = `readIssueSummary: ${e.message} - with: ${data}`;
				console.log(e.message);
				errorService.captureException(e);
				throw e;
			}
		})
		.catch((e) => {
			throw e;
		});
};

const silentlyDeleteFile = async (filePath: string) => {
	try {
		await RNFS.unlink(filePath);
	} catch (error) {
		console.log('Silent file deletion failed: ' + JSON.stringify(error));
	}
};

export const fetchAndStoreIssueSummary = async (): Promise<IssueSummary[]> => {
	const apiUrl = await getSetting('apiUrl');
	const edition = await getSelectedEditionSlug();
	const editionDirectory = FSPaths.editionDir(edition);

	const fetchIssueSummaryUrl = `${apiUrl}${edition}/issues`;

	try {
		const issueSummaryRequest = await fetch(fetchIssueSummaryUrl);
		const issueSummary = await issueSummaryRequest.json();
		if (!issueSummary) {
			throw new Error('No Issume Summary Avaialble');
		}

		const issueSummaryString = JSON.stringify(issueSummary);
		// There is a known issue with this fs library where it append content of the file
		// rather than overwrite it and result in malfomed json content. As a workaround we
		// are deleting the file first before writing it.
		// https://github.com/itinance/react-native-fs/issues/700
		const filePath = editionDirectory + defaultSettings.issuesPath;
		silentlyDeleteFile(filePath);
		await RNFS.writeFile(filePath, issueSummaryString, 'utf8');

		// The above saves it locally, if successful we return it
		return issueSummary;
	} catch (e) {
		const issueSummary = await readIssueSummary();
		if (!issueSummary && e.message !== 'Network request failed') {
			e.message = `Failed to fetch valid issue summary and empty cache: ${e.message}`;
			errorService.captureException(e);
		}
		// Got a problem with the endpoint, return the last saved version
		return issueSummary;
	}
};

const cleanFileDisplay = (stat: RNFS.ReadDirItem | RNFS.StatResult) => ({
	path: stat.path.replace(FSPaths.issuesDir, ''),
	lastModified: londonTime(Number(stat.mtime)).format(),
	type: stat.isDirectory() ? 'directory' : 'file',
});

export const getFileList = async () => {
	const imageFolders: RNFS.ReadDirItem[] = [];
	const editionSlug = await getSelectedEditionSlug();
	const editionDirectory = await FSPaths.editionDir(editionSlug);
	const files = await RNFS.readDir(editionDirectory);

	const subfolders = await Promise.all(
		files.map((file) =>
			file.isDirectory()
				? RNFS.readDir(file.path).then((filestat) => ({
						[file.name]: filestat.map((deepfile) => {
							if (
								deepfile.name === 'media' ||
								deepfile.name === 'thumbs'
							) {
								imageFolders.push(deepfile);
							}
							return cleanFileDisplay(deepfile);
						}),
				  }))
				: {},
		),
	);

	const cleanSubfolders = subfolders.filter(
		(value) => Object.keys(value).length !== 0,
	);

	const imageSize = await imageForScreenSize();

	// Grab one images from each image folder to confirm successful unzip
	const imageFolderSearch = await Promise.all(
		imageFolders.map(async (file: RNFS.ReadDirItem) => {
			return await RNFS.readDir(
				file.name === 'media'
					? `${file.path}/${imageSize}/media`
					: `${file.path}/${imageSize}/thumb/media`,
			)
				.then((filestat) =>
					filestat
						.map((deepfile) => cleanFileDisplay(deepfile))
						.slice(0, 1),
				)
				.catch((e) => {
					console.error(e);
				});
		}),
	);

	const issuesFile = await RNFS.stat(editionDirectory + '/issues');

	const cleanIssuesFile = [
		{
			issues: cleanFileDisplay(issuesFile),
		},
	];

	return [...cleanSubfolders, ...cleanIssuesFile, ...imageFolderSearch];
};
