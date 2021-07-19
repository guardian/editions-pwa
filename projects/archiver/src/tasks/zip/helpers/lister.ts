import { notNull } from '../../../../common'
import { Bucket, s3 } from '../../../utils/s3'

type lsResponse = { keys: string[]; continuationToken: string | undefined }

//This function gets all objects matching a prefix, and filters them by those that match any of the prefixes
//It will return a "continuationToken" which can be used as a prefix to get more objects
const listAndFilterPage = async (
    Prefix: string,
    bucket: Bucket,
): Promise<lsResponse> => {
    const objects = await s3
        .listObjectsV2({
            Bucket: bucket.name,
            Prefix,
        })
        .promise()

    console.log('returned', JSON.stringify(objects))
    return {
        keys: (objects.Contents || []).map(obj => obj.Key).filter(notNull),
        continuationToken: objects.ContinuationToken,
    }
}

//This will list all the objects in a bucket in the form of an async iterable
async function* listAndFilterPrefixes(
    prefixes: string[],
    bucket: Bucket,
) /* : AsyncGenerator( Promise<{ keys: string[]; continuationToken?: string }>,true,never)*/ {
    for (const prefix of prefixes) {
        let nextPrefix: string | undefined = prefix
        while (nextPrefix !== undefined) {
            const {
                keys,
                continuationToken,
            }: lsResponse = await listAndFilterPage(nextPrefix, bucket)
            yield keys
            nextPrefix = continuationToken
        }
    }
    return
}

//This will list all the objects that match a selection of prefixes.
//It will find a common prefix and list that, continuing until all have been found.
export const getMatchingObjects = async (
    prefixes: string[],
    bucket: Bucket,
) => {
    console.log('listing', JSON.stringify(prefixes))
    const keys: string[] = []
    for await (const partialKeys of listAndFilterPrefixes(prefixes, bucket)) {
        keys.push(...partialKeys)
    }
    return keys
}
