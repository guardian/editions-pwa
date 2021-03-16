import type { PillarColours } from '@guardian/pasteup/palette';
import React, { createContext, useContext, useState } from 'react';
import { getPillarColors } from 'src/helpers/transform';
import { DevTools } from 'src/hooks/article/dev-tools';
import type { Appearance, ArticlePillar, Collection } from '../common';
import { ArticleType } from '../common';
import { useIsUsingProdDevtools } from './use-settings';

/*
  Exports
 */
const ArticlePillarContext = createContext<ArticlePillar>('neutral');
const ArticleTypeContext = createContext<ArticleType>(ArticleType.Article);

export const WithArticlePillar = ArticlePillarContext.Provider;
export const WithArticleType = ArticleTypeContext.Provider;

interface PropTypes {
	type: ArticleType;
	pillar: ArticlePillar;
	children: Element;
}

export const Providers = ({ type, pillar, children }: PropTypes) => (
	<WithArticleType value={type}>
		<WithArticlePillar value={pillar}>{children}</WithArticlePillar>
	</WithArticleType>
);

const ProvidersAndDevtools = ({ type, pillar, children }: PropTypes) => {
	const [modifiedPillar, setPillar] = useState(pillar);
	const [modifiedType, setType] = useState(type);

	return (
		<>
			<Providers type={modifiedType} pillar={modifiedPillar}>
				{children}
			</Providers>
			<DevTools
				pillar={modifiedPillar}
				type={modifiedType}
				setPillar={setPillar}
				setType={setType}
			/>
		</>
	);
};

export const WithArticle = (props: PropTypes) => {
	const isUsingProdDevtools = useIsUsingProdDevtools();

	if (isUsingProdDevtools) return <ProvidersAndDevtools {...props} />;
	return <Providers {...props} />;
};

export const useArticle = (): [
	PillarColours,
	{
		pillar: ArticlePillar;
		type: ArticleType;
	},
] => {
	const pillar = useContext(ArticlePillarContext);
	const type = useContext(ArticleTypeContext);
	return [
		getPillarColors(pillar),
		{
			pillar,
			type,
		},
	];
};

export const getAppearancePillar = (app: Appearance) =>
	app.type === 'custom' ? 'neutral' : app.name;

export const getCollectionPillarOverride = (
	pillar: ArticlePillar,
	collection: Collection['key'],
) => {
	const col = collection.split(':').pop();
	return col === 'Obituaries' ? 'neutral' : pillar;
};
