import type ApolloClient from 'apollo-client';
import { findIssueSummaryByKey, isIssueOnDevice } from 'src/helpers/files';
import { todayAsKey } from 'src/helpers/issues';
import { imageForScreenSize } from 'src/helpers/screen';
import { getIssueSummary } from 'src/hooks/use-issue-summary';
import { errorService } from 'src/services/errors';
import { downloadAndUnzipIssue } from './download-and-unzip';

const downloadTodaysIssue = async (client: ApolloClient<object>) => {
	const todaysKey = await todayAsKey();
	try {
		const issueSummaries = await getIssueSummary();

		// Find the todays issue summary from the list of summary
		const todaysIssueSummary = findIssueSummaryByKey(
			issueSummaries,
			todaysKey,
		);

		// If there isnt one for today, then fahgettaboudit...
		if (!todaysIssueSummary) return null;

		const isTodaysIssueOnDevice = await isIssueOnDevice(
			todaysIssueSummary.localId,
		);

		// Only download it if its not on the device
		if (!isTodaysIssueOnDevice) {
			const imageSize = await imageForScreenSize();
			return downloadAndUnzipIssue(client, todaysIssueSummary, imageSize);
		}
	} catch (e) {
		e.message = `Unable to download todays issue: ${e.message}`;
		errorService.captureException(e);
		console.log(e.message);
	}
};

export { downloadTodaysIssue };
