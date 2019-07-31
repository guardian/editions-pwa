type PossibleCardlengths = 1 | 2 | 3 | 4 | 5 | 6

export enum FrontCardAppearance {
    splashPage = 'splash',
    superHeroPage = 'super',
    twoStoryPage = 'two',
    threeStoryPage = 'three',
    fourStoryPage = 'four',
    fiveStoryPage = 'five',
    sixStoryPage = 'six',
}

export type FrontCardAppearanceShort = PossibleCardlengths | FrontCardAppearance

export type FrontCardList = FrontCardAppearanceShort[]

export interface FrontCardsForArticleCount {
    [countOfArticles: number]: FrontCardList
}
export interface FrontCardAppearanceInfo {
    fits: PossibleCardlengths
}

const frontCardAppearanceInfo: {
    [key in FrontCardAppearance]: FrontCardAppearanceInfo
} = {
    splash: { fits: 1 },
    super: { fits: 1 },
    two: { fits: 2 },
    three: { fits: 3 },
    four: { fits: 4 },
    five: { fits: 5 },
    six: { fits: 6 },
}

export const defaultCardAppearances: {
    [key in PossibleCardlengths]: FrontCardAppearance
} = {
    1: FrontCardAppearance.superHeroPage,
    2: FrontCardAppearance.twoStoryPage,
    3: FrontCardAppearance.threeStoryPage,
    4: FrontCardAppearance.fourStoryPage,
    5: FrontCardAppearance.fiveStoryPage,
    6: FrontCardAppearance.sixStoryPage,
}

export const getCardAppearanceInfo = (
    card: FrontCardAppearanceShort,
): FrontCardAppearanceInfo & { appearance: FrontCardAppearance } => {
    if (typeof card === 'number') {
        return {
            appearance: defaultCardAppearances[card],
            ...frontCardAppearanceInfo[defaultCardAppearances[card]],
        }
    }
    return {
        appearance: card,
        ...frontCardAppearanceInfo[card],
    }
}

const defaultLayout = (
    cover: FrontCardAppearanceShort = 1,
): FrontCardsForArticleCount => ({
    0: [],
    1: [cover],
    2: [cover, 1],
    3: [cover, 2],
    4: [cover, 3],
    5: [cover, 4],
    6: [cover, 5],
    7: [cover, 2, 4],
    8: [cover, 3, 4],
    9: [cover, 3, 5],
    10: [cover, 4, 5],
    11: [cover, 2, 3, 5],
    12: [cover, 2, 4, 5],
    13: [cover, 3, 4, 5],
    14: [cover, 3, 4, 6],
    15: [cover, 2, 3, 4, 5],
    16: [cover, 2, 3, 4, 6],
    17: [cover, 2, 3, 5, 6],
    18: [cover, 2, 4, 5, 6],
    19: [cover, 3, 4, 5, 6],
    20: [cover, 3, 4, 1, 5, 6],
    21: [cover, 2, 3, 4, 5, 6],
    22: [cover, 3, 4, 3, 5, 6],
    23: [cover, 3, 4, 5, 4, 6],
    24: [cover, 3, 5, 4, 5, 6],
    25: [cover, 5, 4, 5, 4, 6],
})

export const getCardsForFront = (
    frontName: string,
): FrontCardsForArticleCount => {
    switch (frontName) {
        case 'Crosswords':
            return {
                0: [],
                1: [2],
            }
        case 'Lifestyle':
        case 'Food':
        case 'Culture':
        case 'Review':
            return defaultLayout(FrontCardAppearance.splashPage)
        default:
            return defaultLayout(1)
    }
}
