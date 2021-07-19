import { attempt, hasFailed, hasSucceeded } from '../utils/try'
import { Content } from '@guardian/content-api-models/v1/content'
import { Blocks } from '@guardian/content-api-models/v1/blocks'
import { ElementType } from '@guardian/content-api-models/v1/elementType'
import { ContentType } from '@guardian/content-api-models/v1/contentType'
import { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime'
import {
    Article,
    GalleryArticle,
    CrosswordArticle,
    PictureArticle,
    CapiDateTime as CapiDateTime32,
    MediaAtomElement,
    TrailImage,
} from '../common'
import { elementParser } from './elements'
import fetch from 'node-fetch'
import { fromPairs } from 'ramda'
import { kickerPicker } from './kickerPicker'
import { getBylineImages } from './byline'
import { rationaliseAtoms } from './atoms'
import { articleTypePicker, headerTypePicker } from './articleTypePicker'
import { getImages } from './articleImgPicker'
import { capiSearchDecoder } from './decoders'
import {
    CAPIEndpoint,
    generateCapiEndpoint,
    getPreviewHeaders,
} from '../utils/article'

type NotInCAPI =
    | 'key'
    | 'showByline'
    | 'showQuotedHeadline'
    | 'mediaType'
    | 'slideshowImages'
    | 'sportScore'

type OptionalInCAPI = 'kicker' | 'bylineImages' | 'trail' | 'articleType'

interface CAPIExtras {
    path: string
    trailImage: TrailImage | undefined
}

export type CArticle = Omit<Article, NotInCAPI | OptionalInCAPI> &
    Partial<Pick<Article, OptionalInCAPI>> &
    CAPIExtras
export type CGallery = Omit<GalleryArticle, NotInCAPI | OptionalInCAPI> &
    Partial<Pick<Article, OptionalInCAPI>> &
    CAPIExtras
export type CPicture = Omit<PictureArticle, NotInCAPI | OptionalInCAPI> &
    Partial<Pick<Article, OptionalInCAPI>> &
    CAPIExtras
export type CCrossword = Omit<CrosswordArticle, NotInCAPI | OptionalInCAPI> &
    Partial<Pick<Article, OptionalInCAPI>> &
    CAPIExtras

export type CAPIContent = CArticle | CGallery | CCrossword | CPicture

const truncateDateTime = (date: CapiDateTime): CapiDateTime32 => ({
    iso8601: date.iso8601,
    dateTime: date.dateTime.toNumber(),
})

/**
 * We look for a very specific pattern which we know represent a header video
 * on an article. The video/media ID is sort of a UUID which can be later used
 * by the client to build a URL from, ex.
 * https://embed.theguardian.com/embed/atom/media/1c35effc-5275-45b1-802b-719ec45f0087
 */
const getMainMediaAtom = (
    capiBlocks?: Blocks,
): MediaAtomElement | undefined => {
    if (capiBlocks == null) return
    const { main } = capiBlocks
    if (main == null || main.elements == null || main.elements.length !== 1)
        return
    const element = main.elements[0]
    if (element.type !== ElementType.CONTENTATOM) return
    const { contentAtomTypeData: data } = element
    if (data == null || data.atomType !== 'media') return
    return { id: 'media-atom', atomId: data.atomId } //, html: main.bodyHtml
}

const parseArticleResult = async (
    result: Content,
    isFromPrint: boolean,
): Promise<[number, CAPIContent]> => {
    const path = result.id
    console.log(`Parsing CAPI response for ${path}`)
    const internalPageCode = result.fields && result.fields.internalPageCode
    if (internalPageCode == null)
        throw new Error(`internalPageCode was undefined in ${path}!`)

    const title = (result.fields && result.fields.headline) || result.webTitle

    const atomData = rationaliseAtoms(result.atoms)

    const parser = elementParser(path, atomData)
    const kicker = kickerPicker(result, title)

    const articleType = articleTypePicker(result)

    const headerType = headerTypePicker(result)

    const displayHint = (result.fields && result.fields.displayHint) || ''

    const trail = result.fields && result.fields.trailText

    const byline = result.fields && result.fields.byline
    const bylineHtml = result.fields && result.fields.bylineHtml
    const bylineImages = getBylineImages(result)

    const images = getImages(result, articleType)

    const starRating = result.fields && result.fields.starRating

    const blocks =
        result.blocks &&
        result.blocks.body &&
        result.blocks.body.map(_ => _.elements)

    const body = blocks && blocks.reduce((acc, cur) => [...acc, ...cur], [])
    if (body == null) throw new Error(`Body was undefined in ${path}!`)

    const elements = await attempt(Promise.all(body.map(parser)))
    if (hasFailed(elements)) {
        console.error(elements)
        throw new Error(`Element parsing failed in ${path}!`) //This should not fire, the parser should log if anything async fails and then return the remainder.
    }

    if (elements == null) throw new Error(`Elements was undefined in ${path}!`)

    const webUrl = !isFromPrint ? result.webUrl : undefined

    switch (result.type) {
        case ContentType.ARTICLE:
            const article: [number, CArticle] = [
                internalPageCode,
                {
                    type: 'article',
                    path: path,
                    headline: title,
                    kicker,
                    articleType,
                    headerType,
                    displayHint,
                    trail,
                    ...images,
                    byline: byline || '',
                    bylineHtml: bylineHtml || '',
                    bylineImages,
                    standfirst: trail || '',
                    elements,
                    starRating,
                    mainMedia: getMainMediaAtom(result.blocks),
                    isFromPrint,
                    webUrl,
                    internalPageCode,
                },
            ]
            return article

        case ContentType.GALLERY:
            const galleryArticle: [number, CGallery] = [
                internalPageCode,
                {
                    type: 'gallery',
                    path: path,
                    headline: title,
                    trail,
                    kicker,
                    articleType,
                    headerType,
                    ...images,
                    byline: byline || '',
                    bylineHtml: bylineHtml || '',
                    standfirst: trail || '',
                    elements,
                    isFromPrint,
                    webUrl,
                    internalPageCode,
                },
            ]

            return galleryArticle

        case ContentType.PICTURE:
            const pictureArticle: [number, CPicture] = [
                internalPageCode,
                {
                    type: 'picture',
                    path: path,
                    headline: title,
                    trail,
                    kicker,
                    articleType,
                    headerType,
                    ...images,
                    byline: byline || '',
                    bylineHtml: bylineHtml || '',
                    standfirst: trail || '',
                    elements,
                    isFromPrint,
                    webUrl,
                    internalPageCode,
                },
            ]

            return pictureArticle

        case ContentType.CROSSWORD:
            if (result.crossword == null)
                throw new Error(
                    `No crossword defined in Crossword article: ${path}`,
                )
            const crossword64 = result.crossword
            const dateSolutionAvailable =
                crossword64.dateSolutionAvailable &&
                truncateDateTime(crossword64.dateSolutionAvailable)
            const date = truncateDateTime(crossword64.date)

            const entries = crossword64.entries.map(entry => {
                const separatorLocations =
                    entry.separatorLocations &&
                    fromPairs(Object.entries(entry.separatorLocations))
                return { ...entry, separatorLocations }
            })

            const crossword = {
                ...crossword64,
                date,
                dateSolutionAvailable,
                entries,
            }

            const crosswordArticle: [number, CAPIContent] = [
                internalPageCode,
                {
                    type: 'crossword',
                    trail,
                    path: path,
                    headline: title,
                    headerType: headerType,
                    trailImage: undefined,
                    byline: byline || '',
                    bylineHtml: bylineHtml || '',
                    standfirst: trail || '',
                    crossword,
                    isFromPrint,
                    webUrl,
                    internalPageCode,
                },
            ]

            return crosswordArticle

        default:
            return [
                internalPageCode,
                {
                    type: 'article',
                    path: path,
                    headline: title,
                    trail,
                    kicker,
                    ...images,
                    byline: byline || '',
                    bylineHtml: bylineHtml || '',
                    standfirst: trail || '',
                    headerType: headerType,
                    elements: [
                        {
                            id: 'html',
                            html: `We can't render content type ${
                                ContentType[result.type]
                            } currently`,
                        },
                        {
                            id: 'html',
                            html: `<pre>${JSON.stringify(result.apiUrl)}</pre>`,
                        },
                    ],
                    isFromPrint,
                    webUrl,
                    internalPageCode,
                },
            ]
    }
}

const isScheduledInNext30Days = (dateiso8601: string): boolean => {
    const date = new Date(dateiso8601)
    const oneMonthAway = new Date(new Date().setDate(date.getDate() + 30))
    return date < oneMonthAway
}

const removeUnscheduledDraftContent = (content: Content[]): Content[] => {
    return content.filter(
        c =>
            c.fields &&
            c.fields.scheduledPublicationDate &&
            isScheduledInNext30Days(c.fields.scheduledPublicationDate.iso8601),
    )
}

export const getArticles = async (
    ids: number[],
    capi: CAPIEndpoint,
): Promise<{ [key: string]: CAPIContent }> => {
    const isFromPrint = capi === 'printsent'
    const endpoint = generateCapiEndpoint(ids, capi)
    const headers = capi === 'preview' ? await getPreviewHeaders(endpoint) : {}

    if (endpoint.length > 1000) {
        console.warn(
            `Unusually long CAPI request of ${endpoint.length}, splitting`,
            ids,
        )
        const midpoint = ~~(ids.length / 2) //Coerece into int, even though apparently you can slice on a float
        const firstRequest = attempt(getArticles(ids.slice(0, midpoint), capi))
        const last = await attempt(getArticles(ids.slice(midpoint), capi))
        const first = await firstRequest
        if (hasFailed(first)) {
            console.error(first.error)
            throw new Error('Error when spliting CAPI request (first half)')
        }
        if (hasFailed(last)) {
            console.error(last.error)
            throw new Error('Error when spliting CAPI request (second half)')
        }
        const firstArray = Object.entries(first)
        const lastArray = Object.entries(last)
        return fromPairs(firstArray.concat(lastArray))
    }
    console.log('Debug link (CAPI query):', endpoint.replace(/thrift/g, 'json'))
    const resp = await attempt(fetch(endpoint, { headers }))
    if (hasFailed(resp)) throw new Error('Could not connect to CAPI.')
    if (resp.status != 200) {
        console.warn(`Non 200 status code: ${resp.status} ${resp.statusText}`)
    }
    const buffer = await resp.buffer()
    const data = await capiSearchDecoder(buffer)
    const results: Content[] = data.results
    const filteredResults =
        capi === 'preview' ? removeUnscheduledDraftContent(results) : results
    const articlePromises = await Promise.all(
        filteredResults.map(result =>
            attempt(parseArticleResult(result, isFromPrint)),
        ),
    )

    //If we fail to get an article in a collection we just ignore it and move on.
    articlePromises.forEach(attempt => {
        if (hasFailed(attempt)) {
            console.log('failure when parsing', attempt.error)
        }
    })
    const articleEntries = articlePromises.filter(hasSucceeded)
    return fromPairs(articleEntries)
}
