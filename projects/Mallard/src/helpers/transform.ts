import type { PillarColours } from '@guardian/pasteup/palette';
import { palette } from '@guardian/pasteup/palette';
import type { Appearance, CAPIArticle, Collection } from 'src/common';
import { FrontCardAppearance } from 'src/common';
import type { ArticlePillar } from '../../../Apps/common/src';

export interface FlatCard {
	collection: Collection;
	appearance: FrontCardAppearance | null;
	articles: CAPIArticle[];
}

const colorMap = {
	news: palette.news,
	opinion: palette.opinion,
	sport: palette.sport,
	culture: palette.culture,
	lifestyle: palette.lifestyle,
	neutral: {
		dark: palette.neutral[7],
		main: palette.neutral[7],
		bright: palette.neutral[20],
		pastel: palette.neutral[60],
		faded: palette.neutral[97],
		tint: palette.neutral[100],
	},
};

// Extending the colour map rather than refactoring it everywhere
const colorMapWithTint = {
	...colorMap,
	news: { ...colorMap.news, tint: palette.neutral[93] },
	sport: { ...colorMap.sport, tint: palette.highlight.main },
	culture: { ...colorMap.culture, tint: palette.culture.faded },
	lifestyle: { ...colorMap.lifestyle, tint: palette.lifestyle.faded },
};

export interface PillarColoursWithTint extends PillarColours {
	tint?: string;
}

export const getPillarColors = (
	pillar: ArticlePillar,
): PillarColoursWithTint => {
	return colorMapWithTint[pillar];
};

export const getColor = (app: Appearance): string => {
	switch (app.type) {
		case 'pillar': {
			return getPillarColors(app.name).main;
		}
		case 'custom': {
			return app.color;
		}
		default: {
			return colorMap.neutral.main;
		}
	}
};

export const flattenCollectionsToCards = (
	collections: Collection[],
): FlatCard[] =>
	collections
		.map((collection) =>
			collection.cards.map(({ articles, appearance }, index) => {
				/**
				 * We cannot have the server return us these value directly
				 * because it would break compatibility with older versions of
				 * the app. Instead, it sends 2 or 3-story cards, that we
				 * convert into "starter" cards with bigger headline if they
				 * happen to be in first position of their collection.
				 */
				if (index === 0) {
					if (appearance === FrontCardAppearance.twoStoryPage)
						appearance = FrontCardAppearance.twoStoryStarter;
					else if (appearance === FrontCardAppearance.threeStoryPage)
						appearance = FrontCardAppearance.threeStoryStarter;
				}
				return {
					articles: Object.values(articles || {}),
					appearance,
					collection,
				};
			}),
		)
		.reduce((acc, val) => acc.concat(val), []);

export const flattenFlatCardsToFront = (
	flatCards: FlatCard[],
): Array<{ article: CAPIArticle; collection: Collection }> =>
	flatCards
		.map(({ articles, collection }) =>
			articles.map((article) => ({ article, collection })),
		)
		.reduce((acc, val) => acc.concat(val), []);
