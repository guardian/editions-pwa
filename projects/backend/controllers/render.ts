import { Content } from '@guardian/content-api-models/v1/content'
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

interface RenderedArticle {
    success: boolean
    status: number
    body: string
}

const fetchRenderedArticle = async (
    url: string,
    buffer: Buffer,
): Promise<RenderedArticle> => {
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: buffer,
    })
    const responseBody = await response.text()
    return {
        success: response.statusText === 'OK',
        status: response.status,
        body: responseBody,
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
        const results: Content[] = data.results
        if (results) return data
        return Promise.reject('Invalid capi response')
    } catch (error) {
        return Promise.reject(error)
    }
}

const fetchCapiContent = async (
    internalPageCode: number,
): Promise<SearchResponse> => {
    return (
        (await fetchSingleCapiContent(internalPageCode, 'live')) ||
        (await fetchSingleCapiContent(internalPageCode, 'printsent')) ||
        (await fetchSingleCapiContent(internalPageCode, 'preview')) ||
        Promise.reject(
            `Failed to fetch article:${internalPageCode} from live, printsent or preview`,
        )
    )
}

const sendError = (message: string, errCode: number, res: Response) => {
    console.error(`${message}`)
    res.status(errCode).send(message)
}

export const renderController = async (req: Request, res: Response) => {
    const internalPageCode: number = req.params.internalPageCode
    try {
        const searchResponse = await fetchCapiContent(internalPageCode)
        if (searchResponse.results.length < 1) {
            const msg = `Failed to fetch content for internalPageCode: ${internalPageCode}`
            sendError(msg, 400, res)
            return
        }

        const stage = process.env.stage || 'dev'
        const renderingUrl =
            stage == 'dev'
                ? 'http://localhost:8080/editions-article'
                : `${process.env.APPS_RENDERING_URL}`

        // TODO modify the 'content' if required before re-encode
        // we may need to modify the pillar based on 'front'
        const content = searchResponse.results[0]

        // re-encode the response to send to AR backend
        const bufferData = await encodeContent(content)
        const renderedArticle = await fetchRenderedArticle(
            renderingUrl,
            bufferData,
        )
        if (renderedArticle.success) {
            res.setHeader('Content-Type', 'text/html')
            res.send(renderedArticle.body)
        } else {
            const message = `Failed to fetch story from ${renderingUrl}. Response: ${renderedArticle.body}`
            sendError(message, renderedArticle.status, res)
        }
    } catch (error) {
        const message = `Failed to fetch story for internalPageCode ${internalPageCode}.`
        sendError(message, 400, res)
    }
}
