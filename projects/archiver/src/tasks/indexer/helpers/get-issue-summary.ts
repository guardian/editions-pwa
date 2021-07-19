import { fromPairs } from 'ramda'
import { oc } from 'ts-optchain'
import {
    IssuePublicationIdentifier,
    IssueSummary,
    ImageSize,
    imageSizes,
    notNull,
} from '../../../../common'
import { getPublishedId } from '../../../utils/path-builder'
import { issue } from '../../../../main'
import { getEditionDisplayName } from '../../../services/editions-mappings'
import { Bucket, s3 } from '../../../utils/s3'

// from a list of S3 keys, create an object of the basename to filename
const identifyAssetFiles = (assetKeys: string[]) => {
    return fromPairs(
        assetKeys
            .map((key): [ImageSize | 'data' | 'html', string] | null => {
                //get the name of the zip file by splitting into path segments
                //taking the last one
                //and removing the suffix
                const filename = key
                    .split('/')
                    .slice(-1)[0]
                    .replace('.zip', '')

                // special case the data and html bundle
                if (filename === 'data' || filename === 'html') {
                    return [filename, key]
                }

                // drop any unrecognised asset zips
                const breakpoint = imageSizes.find(size => size === filename)
                if (breakpoint === undefined) return null
                return [breakpoint, key]
            })
            .filter(notNull),
    )
}

// This mainly exists to narrow the type form and object to an object where the keys are ImageSize
const makeImageAssetObject = (assetFiles: {
    [key: string]: string
}): { [key in ImageSize]?: string } => {
    return fromPairs(
        imageSizes
            .map((size): [ImageSize, string] | null => {
                const asset = assetFiles[size]
                if (asset == null) return null
                return [size, asset]
            })
            .filter(notNull),
    )
}

const getAssestKeysFromBucket = async (
    bucket: Bucket,
    prefix: string,
): Promise<string[]> => {
    const assetKeyList = await s3
        .listObjectsV2({
            Bucket: bucket.name,
            Prefix: prefix,
        })
        .promise()

    const assetKeys = oc(assetKeyList)
        .Contents([])
        .map(_ => _.Key)
        .filter(notNull)

    console.log(
        `getIssueSummary, get assetKeyList from s3://${bucket.name}/${prefix}`,
        JSON.stringify(assetKeyList),
    )

    return assetKeys
}

/* Given an instance of an issue this returns a summary of the instance that
 * includes simple metadata (key, localId, etc) and the list of zip assets.
 * If the issue isn't valid this will return undefined.
 */
export const getIssueSummaryInternal = async (
    issuePublication: IssuePublicationIdentifier,
    assetKeys: string[],
    assetKeysSSR: string[],
    name: string,
): Promise<IssueSummary | undefined> => {
    const { edition, issueDate } = issuePublication
    const publishedIssuePrefix = getPublishedId(issuePublication)

    const dateFromIssue = new Date(issueDate)

    if (isNaN(dateFromIssue.getTime())) {
        console.warn(`Issue with path ${issueDate} is not a valid date`)
        return undefined
    }

    //Asset files for existing app clients
    const assetFiles = identifyAssetFiles(assetKeys)
    if (assetFiles.data == null) {
        console.log(`No data for ${issue}`)
        return undefined
    }
    const images = makeImageAssetObject(assetFiles)
    const assets = { data: assetFiles.data, ...images }

    //Asset generation for new app client that are compatible with SSR articles
    const assetFilesSSR = identifyAssetFiles(assetKeysSSR)
    if (assetFilesSSR.html == null) {
        console.log(`No html in ssr folder for ${issue}`)
        return undefined
    }
    const imagesSSR = makeImageAssetObject(assetFilesSSR)
    const assetsSSR = {
        data: assetFiles.data,
        html: assetFilesSSR.html,
        ...imagesSSR,
    }

    const localId = `${edition}/${issueDate}`
    const key = localId

    return {
        key,
        localId,
        publishedId: publishedIssuePrefix,
        name,
        date: issueDate,
        assets,
        assetsSSR,
    }
}

export const getIssueSummary = async (
    issuePublication: IssuePublicationIdentifier,
    bucket: Bucket,
): Promise<IssueSummary | undefined> => {
    const displayName = await getEditionDisplayName(issuePublication.edition)
    const publishedIssuePrefix = getPublishedId(issuePublication)

    const prefix = `zips/${publishedIssuePrefix}/`
    const assetKeys = await getAssestKeysFromBucket(bucket, prefix)
    const assetWithoutSSR = assetKeys.filter(key => key.indexOf('/ssr') == -1)

    const prefixSSR = `zips/${publishedIssuePrefix}/ssr`
    const assetKeysSSR = await getAssestKeysFromBucket(bucket, prefixSSR)

    return getIssueSummaryInternal(
        issuePublication,
        assetWithoutSSR,
        assetKeysSSR,
        displayName,
    )
}
