import striptags from 'striptags'
import { oc } from 'ts-optchain'
import {
    BlockElement,
    ArticleType,
    IssuePublicationIdentifier,
    TrailImage,
    ImageDeviceUses,
} from '../Apps/common/src'
import { CAPIContent, getArticles } from './capi/articles'
import {
    CAPIArticle,
    Collection,
    CreditedImage,
    Front,
    Image,
    PillarAppearance,
} from './common'
import {
    PublishedCardImage,
    PublishedCollection,
    PublishedFront,
    PublishedIssue,
    PublishedFurniture,
} from './fronts/issue'
import { getImageFromURL } from './image'
import { LastModifiedUpdater } from './lastModified'
import { isPreview } from './preview'
import { Path, s3fetch } from './s3'
import { createCards } from './utils/collection'
import { getCrosswordArticleOverrides } from './utils/crossword'
import {
    attempt,
    Attempt,
    failure,
    hasFailed,
    hasSucceeded,
    withFailureMessage,
} from './utils/try'
import { articleShouldHaveDropCap, isHTMLElement } from './utils/article'
import { buildIssueObjectPath } from './utils/issue'

// overrideArticleMainMedia may be false in most cases
const getImage = (
    overrideArticleMainMedia: boolean,
    maybeImageOverride: Image | undefined,
    maybeArticleImage: CreditedImage | undefined,
): CreditedImage | undefined => {
    return overrideArticleMainMedia && maybeImageOverride !== undefined
        ? maybeImageOverride
        : maybeArticleImage
}

const getCardImages = (
    maybeCoverCardImages: PublishedCardImage | undefined,
): { cardImage: Image; cardImageTablet: Image } | undefined => {
    const maybeCardImage = getImageFromURL(
        oc(maybeCoverCardImages).mobile.src(),
    )
    const maybeCardImageTablet = getImageFromURL(
        oc(maybeCoverCardImages).tablet.src(),
    )
    if (maybeCardImage && maybeCardImageTablet) {
        return {
            cardImage: maybeCardImage,
            cardImageTablet: maybeCardImageTablet,
        }
    }
}

const getTrailImage = (
    maybeMainImage: CreditedImage | undefined,
    maybeCapiTrailImage: Image | undefined,
    maybeImageOverride: Image | undefined,
    imageUse: ImageDeviceUses,
): TrailImage | undefined => {
    const chosenTrailImage =
        maybeImageOverride || maybeMainImage || maybeCapiTrailImage
    return (
        chosenTrailImage && {
            ...chosenTrailImage,
            use: imageUse,
        }
    )
}

export const getImages = (
    article: CAPIContent,
    furniture: PublishedFurniture,
    imageUse: ImageDeviceUses,
): {
    image?: CreditedImage
    cardImage?: Image
    cardImageTablet?: Image
    trailImage: TrailImage | undefined
} => {
    const {
        overrideArticleMainMedia,
        imageSrcOverride: maybeImageSrcOverride,
        coverCardImages: maybeCoverCardImages,
    } = furniture

    const maybeArticleImage = oc(article).image()

    const maybeCapiTrailImage = oc(article).trailImage()

    const maybeImageOverride = getImageFromURL(oc(maybeImageSrcOverride).src())

    const maybeMainImage = getImage(
        overrideArticleMainMedia,
        maybeImageOverride,
        maybeArticleImage,
    )

    const maybeCardImages = getCardImages(maybeCoverCardImages) || {}
    const maybeTrailImage = getTrailImage(
        maybeMainImage,
        maybeCapiTrailImage,
        maybeImageOverride,
        imageUse,
    )

    return {
        image: maybeMainImage,
        trailImage: maybeTrailImage,
        ...maybeCardImages,
    }
}

const commonFields = (
    article: CAPIContent,
    furniture: PublishedFurniture,
    imageUse: ImageDeviceUses,
) => {
    const kicker = oc(furniture).kicker() || article.kicker || '' // I'm not sure where else we should check for a kicker
    const headline = oc(furniture).headlineOverride() || article.headline
    const trail = striptags(
        oc(furniture).trailTextOverride() || article.trail || '',
    )
    const byline = oc(furniture).bylineOverride() || article.byline
    const showByline = furniture.showByline
    const showQuotedHeadline = furniture.showQuotedHeadline
    const mediaType = furniture.mediaType
    const images = getImages(article, furniture, imageUse)
    return {
        key: article.path,
        kicker,
        headline,
        trail,
        standfirst: trail,
        byline,
        showByline,
        showQuotedHeadline,
        mediaType,
        ...images,
    }
}

export const patchArticleElements = (article: {
    articleType?: ArticleType
    elements: BlockElement[]
}): BlockElement[] => {
    const [head, ...tail] = article.elements
    return !articleShouldHaveDropCap(article) || !isHTMLElement(head)
        ? article.elements
        : [{ ...head, hasDropCap: true }, ...tail]
}

export const patchArticle = (
    article: CAPIContent,
    furniture: PublishedFurniture,
    imageUse: ImageDeviceUses,
): [string, CAPIArticle] => {
    const sportScore = oc(furniture).sportScore()
    switch (article.type) {
        case 'crossword':
            return [
                article.path,
                {
                    ...article,
                    ...commonFields(article, furniture, imageUse),
                    ...getCrosswordArticleOverrides(article),
                    sportScore,
                },
            ]

        case 'gallery':
            return [
                article.path,
                {
                    ...article,
                    ...commonFields(article, furniture, imageUse),
                    key: article.path,
                    sportScore,
                },
            ]

        case 'picture':
            return [
                article.path,
                {
                    ...article,
                    ...commonFields(article, furniture, imageUse),
                    key: article.path,
                    sportScore,
                },
            ]

        case 'article':
            const fields = commonFields(article, furniture, imageUse)
            return [
                article.path,
                {
                    ...article,
                    ...fields,
                    elements: patchArticleElements(article),
                    byline: fields.byline || '',
                    sportScore,
                },
            ]

        default:
            const msg: never = article
            throw new TypeError(`Unknown type: ${msg}`)
    }
}

export const parseCollection = async (
    collectionResponse: PublishedCollection,
    i: number,
    front: PublishedFront,
): Promise<Attempt<Collection>> => {
    const articleFragmentList = collectionResponse.items.map((itemResponse): [
        number,
        PublishedFurniture,
    ] => [itemResponse.internalPageCode, itemResponse.furniture])

    const ids: number[] = articleFragmentList.map(([id]) => id)
    const [
        capiPrintArticles,
        capiSearchArticles,
        capiPreviewArticles,
    ] = await Promise.all([
        attempt(getArticles(ids, 'printsent')),
        attempt(getArticles(ids, 'live')),
        attempt(getArticles(ids, 'preview')),
    ])

    if (hasFailed(capiPrintArticles)) {
        return withFailureMessage(
            capiPrintArticles,
            'Could not connect to capi print sent',
        )
    }
    if (hasFailed(capiSearchArticles))
        return withFailureMessage(
            capiSearchArticles,
            'Could not connect to CAPI',
        )
    if (hasFailed(capiPreviewArticles))
        return withFailureMessage(
            capiPreviewArticles,
            'Could not connect to preview CAPI',
        )

    const articles: [CAPIContent, PublishedFurniture][] = articleFragmentList
        .filter(([key]) => {
            const inResponse =
                key in capiPrintArticles ||
                key in capiSearchArticles ||
                key in capiPreviewArticles
            if (!inResponse) {
                console.warn(`Removing ${key} as not in CAPI response.`)
            }
            return inResponse
        })
        .map(([key, furniture]) => [
            capiSearchArticles[key] ||
                capiPrintArticles[key] ||
                capiPreviewArticles[key],
            furniture,
        ])

    return {
        key: `${i}:${collectionResponse.name}`,
        cards: createCards(articles, front),
    }
}

const getDisplayName = (front: string) => {
    const split = front.split('/').pop() || front
    return split.charAt(0).toUpperCase() + split.slice(1)
}

export const fetchPublishedIssue = async (
    issue: IssuePublicationIdentifier,
    frontId: string,
    lastModifiedUpdater: LastModifiedUpdater,
): Promise<Attempt<PublishedIssue>> => {
    const path: Path = buildIssueObjectPath(issue, isPreview)

    const issueData = await s3fetch(path)

    if (hasFailed(issueData)) {
        return withFailureMessage(
            issueData,
            `Attempt to fetch ${issue.issueDate} and ${frontId} failed.`,
        )
    }

    lastModifiedUpdater(issueData.lastModified)

    const issueResponse: PublishedIssue = (await issueData.json()) as PublishedIssue
    return issueResponse
}

export const transformToFront = async (
    frontId: string,
    publishedIssue: PublishedIssue,
): Promise<Attempt<Front>> => {
    const { issueDate } = publishedIssue
    const front = publishedIssue.fronts.find(_ => _.name === frontId)
    if (!front) {
        return failure({ httpStatus: 404, error: new Error('Front not found') })
    }

    const appearance: PillarAppearance = {
        type: 'pillar',
        name: front.swatch,
    }

    const collections = await Promise.all(
        front.collections
            .filter(collection => collection.items.length > 0)
            .map((collection, i) => parseCollection(collection, i, front)),
    )

    collections.filter(hasFailed).forEach(failedCollection => {
        console.error(
            `silently removing collection from ${issueDate}/${frontId} ${JSON.stringify(
                failedCollection,
            )}`,
        )
    })

    return {
        ...front,
        appearance,
        displayName: getDisplayName(frontId),
        collections: collections.filter(hasSucceeded),
        key: frontId,
    }
}

export const getFront = async (
    issue: IssuePublicationIdentifier,
    frontId: string,
    lastModifiedUpdater: LastModifiedUpdater,
): Promise<Attempt<Front>> => {
    const publishedIssue = await fetchPublishedIssue(
        issue,
        frontId,
        lastModifiedUpdater,
    )

    if (hasFailed(publishedIssue)) {
        return publishedIssue
    }

    return transformToFront(frontId, publishedIssue)
}
