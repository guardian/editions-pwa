import type { Issue } from 'src/common';
import { fetchIssue } from 'src/helpers/fetch';
import type { CachedOrPromise } from 'src/helpers/fetch/cached-or-promise';
import { chain } from 'src/helpers/fetch/cached-or-promise';
import { withResponse } from 'src/helpers/response';
import {
	flattenCollectionsToCards,
	flattenFlatCardsToFront,
} from 'src/helpers/transform';
import { ERR_404_REMOTE } from 'src/helpers/words';
import type { PathToArticle } from 'src/paths';
import { useCachedOrPromise } from './use-cached-or-promise';

export const useIssueWithResponse = <T>(
	getter: CachedOrPromise<T>,
	deps: unknown[] = [],
) => withResponse<T>(useCachedOrPromise<T>(getter, deps));

export const useIssueResponse = (
	issue: {
		localIssueId: Issue['localId'];
		publishedIssueId: Issue['publishedId'];
	},
	forceAPIFetch = false,
) => {
	return useIssueWithResponse(
		fetchIssue(issue.localIssueId, issue.publishedIssueId, forceAPIFetch),
		[issue],
	);
};

export const getArticleResponse = ({
	article,
	localIssueId,
	publishedIssueId,
	front,
}: PathToArticle) =>
	chain(fetchIssue(localIssueId, publishedIssueId, false), (issue) => {
		const maybeFront = issue.fronts.find((f) => f.key === front);
		if (!maybeFront) throw ERR_404_REMOTE;

		const allArticles = flattenFlatCardsToFront(
			flattenCollectionsToCards(maybeFront.collections),
		);
		const articleContent = allArticles.find(
			({ article: { key } }) => key === article,
		);

		if (articleContent) {
			return chain.end({ ...articleContent, origin: issue.origin });
		}
		throw ERR_404_REMOTE;
	});

export const useArticleResponse = (path: PathToArticle) =>
	useIssueWithResponse(getArticleResponse(path), [
		path.article,
		path.collection,
		path.front,
		path.localIssueId,
		path.publishedIssueId,
	]);
