import type ApolloClient from 'apollo-client';
import { findIssueSummaryByKey } from 'src/helpers/files';
import { imageForScreenSize } from 'src/helpers/screen';
import { getIssueSummary } from 'src/hooks/use-issue-summary';
import { pushTracking } from 'src/notifications/push-tracking';
import { errorService } from 'src/services/errors';
import { Feature } from '../../../Apps/common/src/logging';
import { clearOldIssues } from './clear-issues-and-editions';
import { downloadAndUnzipIssue } from './download-and-unzip';

const downloadViaNotification = async (
	key: string,
	apolloClient: ApolloClient<object>,
) => {
	try {
		const screenSize = await imageForScreenSize();

		await pushTracking('pushScreenSize', screenSize, Feature.DOWNLOAD);

		const issueSummaries = await getIssueSummary();

		await pushTracking('pushIssueSummaries', 'received', Feature.DOWNLOAD);

		// Check to see if we can find the image summary for the one that is pushed
		const pushImageSummary = findIssueSummaryByKey(issueSummaries, key);

		await pushTracking(
			'pushImageSummary',
			JSON.stringify(pushImageSummary),
			Feature.DOWNLOAD,
		);

		await downloadAndUnzipIssue(apolloClient, pushImageSummary, screenSize);

		await pushTracking(
			'pushDownloadComplete',
			'completed',
			Feature.DOWNLOAD,
		);
	} catch (e) {
		await pushTracking(
			'pushDownloadError',
			JSON.stringify(e),
			Feature.DOWNLOAD,
		);
		errorService.captureException(e);
		throw e;
	} finally {
		// No matter what happens, always clear up old issues
		await clearOldIssues();
	}
};

export { downloadViaNotification };
