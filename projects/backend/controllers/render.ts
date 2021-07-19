import { SearchResponse } from '@guardian/content-api-models/v1/searchResponse'
import { Request, Response } from 'express'
import fetch from 'node-fetch'
import { capiSearchDecoder } from '../capi/decoders'
import { encodeContent } from '../capi/encoders'
import {
    CAPIEndpoint,
    generateCapiEndpoint,
    getPreviewHeaders,
} from '../utils/article'
import { attempt, hasFailed } from '../utils/try'
import { isPreview } from '../preview'
import { decodeVersionOrPreview } from '../utils/issue'
import { lastModified, LastModifiedUpdater } from '../lastModified'
import { IssuePublicationIdentifier, RenderedArticle } from '../common'
import { fetchPublishedIssue } from '../fronts'
import {
    PublishedFront,
    PublishedFurniture,
    Swatch,
    Theme,
} from '../fronts/issue'
import { Content } from '@guardian/content-api-models/v1/content'
import { Tag } from '@guardian/content-api-models/v1/tag'
import { TagType } from '@guardian/content-api-models/v1/tagType'
import { oc } from 'ts-optchain'
import { Attempt } from '../common'

const fetchRenderedArticle = async (
    internalPageCode: number,
    url: string,
    proxyHeaderKey: string,
    buffer: Buffer,
): Promise<RenderedArticle> => {
    console.log('Making Rendering request to: ' + url)
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/octet-stream',
            'proxy-key': proxyHeaderKey,
        },
        body: buffer,
    })
    console.log(
        'Rendered response: ' + response.status + ' ' + response.statusText,
    )
    const responseBody = await response.text()
    return {
        success: response.statusText === 'OK',
        message: 'success',
        body: responseBody,
        internalPageCode,
    }
}

const fetchSingleCapiContent = async (
    internalPageCode: number,
    capi: CAPIEndpoint,
): Promise<SearchResponse> => {
    try {
        const endpoint = generateCapiEndpoint([internalPageCode], capi)
        const headers =
            capi === 'preview' ? await getPreviewHeaders(endpoint) : {}
        console.log('Debug link:', endpoint.replace(/thrift/g, 'json'))
        const resp = await attempt(fetch(endpoint, { headers }))

        if (hasFailed(resp)) throw new Error('Could not connect to CAPI.')

        if (resp.status != 200) {
            console.warn(
                `Non 200 status code: ${resp.status} ${resp.statusText}`,
            )
        }

        const buffer = await resp.buffer()
        const data = await capiSearchDecoder(buffer)
        console.log(
            'Fetched data from CAPI: ' +
                capi +
                ' internalCode: ' +
                internalPageCode,
        )
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const fetchCapiContent = async (
    internalPageCode: number,
): Promise<SearchResponse> => {
    const capiEnviroments = ['live', 'printsent', 'preview']
    for (const capi of capiEnviroments) {
        try {
            const response = await fetchSingleCapiContent(
                internalPageCode,
                capi as CAPIEndpoint,
            )
            if (response.results.length > 0) {
                return response
            }
        } catch (e) {
            console.log(
                `No result found for ${internalPageCode} from capi '${capi}'`,
            )
        }
    }

    return Promise.reject(
        `Failed to fetch article with internalPageCode=${internalPageCode} from live, printsent or preview`,
    )
}

const sendError = (message: string, res: Response) => {
    console.error(`${message}`)
    res.status(400).send(message)
}

const getTags = (kicker: string): Tag[] => [
    {
        id: '',
        type: TagType.SERIES,
        webTitle: kicker,
        webUrl: '',
        apiUrl: '',
        references: [],
        internalName: '',
    },
]

const mapFurnitureToContent = (
    furniture: PublishedFurniture,
    content: Content,
): Content => {
    const headline =
        oc(furniture).headlineOverride() || oc(content).fields.headline()
    const byline = furniture.showByline
        ? oc(furniture).bylineOverride() || oc(content).fields.byline()
        : ''
    const standfirst =
        oc(furniture).trailTextOverride() || oc(content).fields.standfirst()
    return {
        ...content,
        tags: furniture.kicker ? getTags(furniture.kicker) : content.tags,
        fields: {
            ...content.fields,
            headline,
            byline,
            standfirst,
        },
    }
}

const processArticleRendering = async (
    internalPageCode: number,
    furniture: PublishedFurniture,
    theme: Theme | null,
): Promise<RenderedArticle> => {
    try {
        const searchResponse = await fetchCapiContent(internalPageCode)
        if (searchResponse.results.length < 1) {
            const msg = `Failed to fetch content for internalPageCode: ${internalPageCode}`
            return {
                success: false,
                message: msg,
                body: '',
                internalPageCode,
            }
        }

        const appsRenderingProxyUrl =
            process.env.APPS_RENDERING_URL || 'apps rendering url missing'
        const appsRenderingProxyHeader =
            process.env.APPS_RENDERING_PROXY_HEADER_KEY ||
            'proxy header missing'

        const content = searchResponse.results[0]
        const patchedContent = mapFurnitureToContent(furniture, content)

        // re-encode the response to send to AR backend
        const bufferData = await encodeContent(patchedContent)
        const url = `${appsRenderingProxyUrl}?theme=${theme}`
        const renderedArticle = await fetchRenderedArticle(
            internalPageCode,
            url,
            appsRenderingProxyHeader,
            bufferData,
        )
        if (renderedArticle.success) {
            console.log(
                'successfully rendered article for id: ' + internalPageCode,
            )
            return renderedArticle
        } else {
            const msg = `Failed to fetch story from ${appsRenderingProxyUrl}. Response: ${renderedArticle.body}`
            return {
                success: false,
                message: msg,
                body: '',
                internalPageCode,
            }
        }
    } catch (error) {
        const msg = `Failed to fetch story for internalPageCode ${internalPageCode}.`
        return {
            success: false,
            message: msg,
            body: '',
            internalPageCode,
        }
    }
}

const fetchPublishedFront = async (
    req: Request,
    frontId: string,
    lastModifiedUpdater: LastModifiedUpdater,
): Promise<Attempt<PublishedFront>> => {
    const issueDate: string = req.params.date
    const version: string = decodeVersionOrPreview(
        req.params.version,
        isPreview,
    )
    const edition = req.params.edition
    const issue: IssuePublicationIdentifier = {
        issueDate,
        version,
        edition,
    }

    const publishedIssue = await fetchPublishedIssue(
        issue,
        frontId,
        lastModifiedUpdater,
    )

    if (hasFailed(publishedIssue)) {
        return publishedIssue
    }

    const front = publishedIssue.fronts.find(_ => _.name === frontId)
    if (!front) {
        throw Error('Failed to find front ' + frontId)
    }

    return front
}

const mapSwatchToTheme = (swatch: Swatch) => {
    switch (swatch) {
        case 'neutral':
        case 'news':
            return Theme.News
        case 'opinion':
            return Theme.Opinion
        case 'culture':
            return Theme.Culture
        case 'lifestyle':
            return Theme.Lifestyle
        case 'sport':
            return Theme.Sport
        default:
            return null
    }
}

export const renderFrontController = async (req: Request, res: Response) => {
    const frontId: string = req.params[0]
    const [date, updater] = lastModified()
    const front = await fetchPublishedFront(req, frontId, updater)
    if (hasFailed(front)) {
        sendError(
            `Failed to find front '${frontId}' from the published issue`,
            res,
        )
        return
    }

    const mappedTheme = mapSwatchToTheme(front.swatch)

    const idFurniturePair = front.collections
        .map(collection =>
            collection.items.map((item): [number, PublishedFurniture] => {
                return [item.internalPageCode, item.furniture]
            }),
        )
        .reduce((acc, val) => acc.concat(val), [])
        .map(r => {
            return { internalPageCode: r[0], furniture: r[1] }
        })

    const finalResult: RenderedArticle[] = []
    for (const pair of idFurniturePair) {
        const result = await processArticleRendering(
            pair.internalPageCode,
            pair.furniture,
            mappedTheme,
        )
        finalResult.push(result)
    }

    if (finalResult.length < 1) {
        const msg = 'Rendered article process failed'
        console.log('Failed: ' + JSON.stringify(finalResult))
        sendError(msg, res)
    } else {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Last-Modifed', date())
        res.send(JSON.stringify(finalResult))
    }
}

export const renderItemController = async (req: Request, res: Response) => {
    console.log(JSON.stringify(req.params))
    const internalPageCode = req.params[0] as number
    const frontId: string = req.query['frontId']
    console.log(
        `Rendering single article with internalPageCode=${internalPageCode} within a front: ${frontId}`,
    )

    const [date, updater] = lastModified()
    const front = await fetchPublishedFront(req, frontId, updater)
    if (hasFailed(front)) {
        sendError(
            `Failed to find front '${frontId}' from the published issue`,
            res,
        )
        return
    }
    const mappedTheme = mapSwatchToTheme(front.swatch)

    // find the corresponding furniture for the article so we can apply the fronts overrides
    const idFurniturePair = front.collections
        .map(collection =>
            collection.items.map((item): [number, PublishedFurniture] => {
                return [item.internalPageCode, item.furniture]
            }),
        )
        .reduce((acc, val) => acc.concat(val), [])
        .map(r => {
            return { internalPageCode: r[0], furniture: r[1] }
        })
        .filter(item => item.internalPageCode == internalPageCode)

    if (idFurniturePair.length != 1) {
        // there should be only one article within a front, if not then throw error
        sendError(
            `Failed to find item with internalPageCode: ${internalPageCode} in front: ${frontId}`,
            res,
        )
        return
    }

    const renderedArticle = await processArticleRendering(
        idFurniturePair[0].internalPageCode,
        idFurniturePair[0].furniture,
        mappedTheme,
    )

    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Last-Modifed', date())
    res.send(renderedArticle.body)
}
