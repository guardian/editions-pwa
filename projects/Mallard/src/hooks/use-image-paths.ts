import { useEffect, useState } from 'react'
import ImageResizer from 'react-native-image-resizer'
import RNFetchBlob from 'rn-fetch-blob'
import { imageForScreenSize } from 'src/helpers/screen'
import { APIPaths, FSPaths } from 'src/paths'
import { Image, ImageSize, Issue } from '../../../common/src'
import { useIssueCompositeKey } from './use-issue-id'
import { useSettingsValue } from './use-settings'

const getFsPath = (
    localIssueId: Issue['localId'],
    { source, path }: Image,
    size: ImageSize,
) => FSPaths.media(localIssueId, source, path, size)

const selectImagePath = async (
    apiUrl: string,
    localIssueId: Issue['localId'],
    publishedIssueId: Issue['publishedId'],
    { source, path }: Image,
) => {
    const imageSize = await imageForScreenSize()
    const api = `${apiUrl}${APIPaths.media(
        publishedIssueId,
        imageSize,
        source,
        path,
    )}`

    const fs = getFsPath(localIssueId, { source, path }, imageSize)
    console.log(fs)
    const fsExists = await RNFetchBlob.fs.exists(fs)
    return fsExists ? fs : api
    //should this be a file url
}

const compressImagePath = async (path: string, width: number) => {
    const resized = await ImageResizer.createResizedImage(
        path,
        width,
        99999,
        'JPEG',
        100,
        0,
    )
    return resized.uri
}

/**
 * A simple helper to get image paths.
 * This will asynchronously try the cache, otherwise will return the API url
 * if not available in the cache.
 *
 * Until the cache lookup has resolved, this will return undefined.
 * When the lookup resolves, a rerender should be triggered.
 *
 *  */

const useImagePath = (image?: Image) => {
    const key = useIssueCompositeKey()

    const [paths, setPaths] = useState<string | undefined>()
    const apiUrl = useSettingsValue.apiUrl()
    useEffect(() => {
        if (key && image) {
            const { localIssueId, publishedIssueId } = key
            selectImagePath(apiUrl, localIssueId, publishedIssueId, image).then(
                setPaths,
            )
        }
    }, [
        apiUrl,
        image,
        key ? key.publishedIssueId : undefined, // Why isn't this just key?
        key ? key.localIssueId : undefined,
    ])
    if (image === undefined) return undefined
    return paths
}

const useScaledImage = (largePath: string, width: number) => {
    const [path, setPath] = useState<string | undefined>()
    useEffect(() => {
        compressImagePath(largePath, width).then(setPath)
    }, [largePath, width])
    return path
}

export { useImagePath, useScaledImage, selectImagePath }
