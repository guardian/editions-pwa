import fetch from 'node-fetch'
import {
    issuePath,
    frontPath,
    Issue,
    Front,
    Image,
    ImageSize,
    imagePath,
    ImageUse,
    EditionsList,
} from '../../common'
import {
    attempt,
    Attempt,
    hasFailed,
    withFailureMessage,
} from '../../../backend/utils/try'
import { RenderedArticle } from '../../../Apps/common/src'

export const URL =
    process.env.backend !== undefined
        ? `https://${process.env.backend}`
        : 'http://localhost:3131/'

export const getIssue = async (publishedId: string) => {
    const path = `${URL}${issuePath(publishedId)}`
    console.log(`Attempt to get Issue from path: ${path}`)
    const response = await fetch(path)
    const json = await response.json()
    return json as Issue
}

export const getFront = async (
    publishedId: string,
    front: string,
): Promise<Attempt<Front>> => {
    const path = `${URL}${frontPath(publishedId, front)}`
    console.log(`attempt to getFront from path: ${path}`)
    const response = await fetch(path)
    const maybeFront = await attempt(response.json() as Promise<Front>)
    if (hasFailed(maybeFront))
        return withFailureMessage(
            maybeFront,
            `Failed to download front ${front} from ${publishedId}`,
        )
    console.log(`got response: ${JSON.stringify(maybeFront.title)}`)
    return maybeFront
}

export const getImageUse = async (
    publishedId: string,
    image: Image,
    size: ImageSize,
    use: ImageUse,
): Promise<[string, Attempt<Buffer>]> => {
    const path = imagePath(publishedId, image, use, size)

    const url = `${URL}/${path}`
    const resp = attempt(fetch(url))

    const maybeResponse = await resp

    if (hasFailed(maybeResponse)) return [path, maybeResponse]

    // Throw away query string before storing the image so that the client
    // doesn't need to care about it.
    const pathWithoutQueryString = path.split('?')[0]

    return [pathWithoutQueryString, await maybeResponse.buffer()]
}

export const getEditions = async (): Promise<Attempt<EditionsList>> => {
    const path = `${URL}editions`
    console.log(`Attempt to get editions list from path: ${path}`)
    const response = await fetch(path)
    const maybeEditionsList = await attempt(response.json() as Promise<
        EditionsList
    >)
    if (hasFailed(maybeEditionsList)) {
        return withFailureMessage(
            maybeEditionsList,
            `Failed to download editions list from ${path}`,
        )
    }
    console.log(`Got response: ${JSON.stringify(maybeEditionsList)}`)
    return maybeEditionsList
}

export const getRenderedFront = async (
    publishedId: string,
    front: string,
): Promise<Attempt<RenderedArticle[]>> => {
    const path = `${URL}render/${frontPath(publishedId, front)}`
    const response = await fetch(path)
    const renderedFront = await attempt(response.json() as Promise<
        RenderedArticle[]
    >)
    if (hasFailed(renderedFront)) {
        return renderedFront
    }
    return renderedFront
}
