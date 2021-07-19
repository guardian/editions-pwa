import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ArticlePillar } from 'src/common';
import { ArticleType } from 'src/common';
import { ArticleController } from 'src/components/article';
import type { HeaderControlInnerProps } from 'src/components/article/types/article';
import { FlexErrorMessage } from 'src/components/layout/ui/errors/flex-error-message';
import { UiBodyCopy } from 'src/components/styled-text';
import {
	getCollectionPillarOverride,
	WithArticle,
} from 'src/hooks/use-article';
import { useArticleResponse } from 'src/hooks/use-issue';
import { useIsPreview } from 'src/hooks/use-settings';
import type { PathToArticle } from 'src/paths';
import { color } from 'src/theme/color';

const styles = StyleSheet.create({
	flex: { flexGrow: 1 },
	container: { height: '100%' },
});

export type OnIsAtTopChange = (isAtTop: boolean, articleKey: string) => void;

const ArticleScreenBody = React.memo<
	{
		path: PathToArticle;
		pillar: ArticlePillar;
		width: number;
		position?: number;
		onIsAtTopChange?: OnIsAtTopChange;
	} & HeaderControlInnerProps
>(
	({
		path,
		pillar,
		width,
		position,
		onIsAtTopChange,
		...headerControlProps
	}) => {
		const articleResponse = useArticleResponse(path);
		const preview = useIsPreview();
		const previewNotice = preview
			? `${path.collection}:${position}`
			: undefined;

		const handleIsAtTopChange = useCallback(
			(value: boolean) => onIsAtTopChange?.(value, path.article),
			[onIsAtTopChange],
		);

		// First time it's mounted, we make sure to report we're at the top.
		useEffect(() => handleIsAtTopChange(true), []);
		return (
			<View style={[styles.container, { width }]}>
				{articleResponse({
					error: ({ message }) => (
						<FlexErrorMessage
							title={message}
							style={{ backgroundColor: color.background }}
						/>
					),
					pending: () => (
						<FlexErrorMessage
							title={'loading'}
							style={{ backgroundColor: color.background }}
						/>
					),
					success: (article) => (
						<>
							{previewNotice && (
								<UiBodyCopy>{previewNotice}</UiBodyCopy>
							)}

							<WithArticle
								type={
									article.article.articleType ??
									ArticleType.Article
								}
								pillar={getCollectionPillarOverride(
									pillar,
									path.collection,
								)}
							>
								<ArticleController
									{...headerControlProps}
									path={path}
									article={article.article}
									onIsAtTopChange={handleIsAtTopChange}
									origin={article.origin}
								/>
							</WithArticle>
						</>
					),
				})}
			</View>
		);
	},
);

export { ArticleScreenBody };
