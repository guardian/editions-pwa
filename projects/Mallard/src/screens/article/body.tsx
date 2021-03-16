import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
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
import { useIsAppsRendering } from 'src/hooks/use-config-provider';
import { useArticleResponse } from 'src/hooks/use-issue';
import { useIsPreview } from 'src/hooks/use-settings';
import { useToast } from 'src/hooks/use-toast';
import type { PathToArticle } from 'src/paths';
import { color } from 'src/theme/color';

const styles = StyleSheet.create({
	flex: { flexGrow: 1 },
	container: { height: '100%' },
});

export type OnIsAtTopChange = (isAtTop: boolean, articleKey: string) => void;

const ArticleScreenBody = React.memo<
	{
		navigation: NavigationScreenProp<{}>;
		path: PathToArticle;
		pillar: ArticlePillar;
		width: number;
		position?: number;
		onIsAtTopChange?: OnIsAtTopChange;
	} & HeaderControlInnerProps
>(
	({
		navigation,
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
			(value: boolean) =>
				onIsAtTopChange && onIsAtTopChange(value, path.article),

			[onIsAtTopChange],
		);
		const { isAppsRendering } = useIsAppsRendering();
		const { showToast } = useToast();
		// First time it's mounted, we make sure to report we're at the top.

		useEffect(() => handleIsAtTopChange(true), []);
		return (
			<View style={[styles.container, { width }]}>
				{isAppsRendering && showToast('EDITIONS RENDERED CONTENT')}
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
									article.article.articleType ||
									ArticleType.Article
								}
								pillar={getCollectionPillarOverride(
									pillar,
									path.collection,
								)}
							>
								<ArticleController
									navigation={navigation}
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
