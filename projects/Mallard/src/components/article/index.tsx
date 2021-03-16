import React from 'react';
import type { NavigationScreenProp } from 'react-navigation';
import type { CAPIArticle } from 'src/common';
import { FlexErrorMessage } from 'src/components/layout/ui/errors/flex-error-message';
import type { PathToArticle } from 'src/paths';
import { color } from 'src/theme/color';
import type { IssueOrigin } from '../../../../Apps/common/src';
import { ErrorBoundary } from '../layout/ui/errors/error-boundary';
import type { HeaderControlProps } from './types/article';
import { Article } from './types/article';
import { Crossword } from './types/crossword';

/*
This is the article view! For all of the articles.
it gets everything it needs from its route
*/

const ArticleController = ({
	navigation,
	article,
	path,
	origin,
	...headerControlProps
}: {
	navigation: NavigationScreenProp<{}>;
	article: CAPIArticle;
	path: PathToArticle;
	origin: IssueOrigin;
} & HeaderControlProps) => {
	if (article.type === 'crossword') {
		return <Crossword crosswordArticle={article} />;
	}

	return (
		<ErrorBoundary
			error={
				<FlexErrorMessage
					title={'Unable to render article'}
					style={{ backgroundColor: color.background }}
				/>
			}
		>
			<Article
				navigation={navigation}
				article={article}
				path={path}
				origin={origin}
				{...headerControlProps}
			/>
		</ErrorBoundary>
	);
};

export { ArticleController };
