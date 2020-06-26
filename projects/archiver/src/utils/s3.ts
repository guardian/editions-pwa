import {
    S3,
    ChainableTemporaryCredentials,
    SharedIniFileCredentials,
} from 'aws-sdk'
import { attempt, notNull } from '../../common'
import { oc } from 'ts-optchain'
import { ListObjectsV2Output } from 'aws-sdk/clients/s3'

const createCMSFrontsS3Client = () => {
    const roleArn = process.env.arn
    console.log(`Creating S3 client with role arn: $roleArn`)
    const options: ChainableTemporaryCredentials.ChainableTemporaryCredentialsOptions = {
        params: {
            RoleArn: roleArn as string,
            RoleSessionName: 'front-assume-role-access',
        },
        stsConfig: {},
    }

    const cmsFrontsTmpCreds = new ChainableTemporaryCredentials(options)

    const iniFileCreds = new SharedIniFileCredentials({ profile: 'cmsFronts' })

    return new S3({
        region: 'eu-west-1',
        credentials: roleArn ? cmsFrontsTmpCreds : iniFileCreds,
    })
}

export const s3 = new S3({
    region: 'eu-west-1',
})

export type Bucket = {
    name: string
    context: 'proof' | 'publish' | 'default'
}

export const getBucket = (bucket: string): Bucket => {
    if (bucket === 'proof') {
        if (!!process.env.proofBucket) {
            return { name: process.env.proofBucket, context: bucket }
        } else {
            return { name: 'editions-store-code', context: 'default' }
        }
    } else if (bucket === 'publish') {
        if (!!process.env.publishBucket) {
            return { name: process.env.publishBucket, context: bucket }
        } else {
            return { name: 'editions-store-code', context: 'default' }
        }
    } else {
        return { name: 'editions-store-code', context: 'default' }
    }
}

const addDelimiterIfNotPresent = (prefix: string): string => {
    if (prefix.endsWith('/')) {
        return prefix
    }
    return `${prefix}/`
}

const stripSuffix = (input: string, suffix: string): string => {
    if (input.endsWith(suffix)) {
        return input.slice(0, -1 * suffix.length)
    }
    return input
}

const stripPrefix = (input: string, prefix: string): string => {
    if (input.startsWith(prefix)) {
        return input.substring(prefix.length)
    }
    return input
}

/* List nested prefixes in a given prefix
 */
export const listNestedPrefixes = async (
    bucket: Bucket,
    prefix: string,
): Promise<string[]> => {
    const prefixWithDelimiter = addDelimiterIfNotPresent(prefix)
    const resp = await s3
        .listObjectsV2({
            Bucket: bucket.name,
            Prefix: prefixWithDelimiter,
            Delimiter: '/',
        })
        .promise()
    const prefixList = oc(resp)
        .CommonPrefixes([])
        .map(_ => _.Prefix)
        .filter(notNull)
    return prefixList.map(newPrefix => {
        return stripPrefix(stripSuffix(newPrefix, '/'), prefixWithDelimiter)
    })
}

function cacheControlHeader(maxAge: number | undefined): string {
    if (maxAge) {
        return `max-age=${maxAge}`
    }
    return 'private'
}

export const ONE_WEEK = 3600 * 24 * 7
export const ONE_MINUTE = 60
export const FIVE_SECONDS = 5

export const upload = (
    key: string,
    body: {} | Buffer,
    bucket: Bucket,
    mime: 'image/jpeg' | 'application/json' | 'application/zip',
    maxAge: number | undefined,
): Promise<{ etag: string }> => {
    return new Promise((resolve, reject) => {
        s3.upload(
            {
                Body: body instanceof Buffer ? body : JSON.stringify(body),
                Bucket: bucket.name,
                Key: `${key}`,
                ACL: 'public-read',
                ContentType: mime,
                CacheControl: cacheControlHeader(maxAge),
            },
            (err, data) => {
                if (err) {
                    console.error(
                        `S3 upload of s3://${bucket.name}/${key} failed with`,
                        err,
                    )
                    reject()
                    return
                }
                console.log(`${data.Key} uploaded to ${data.Bucket}`)
                resolve({ etag: data.ETag })
            },
        )
    })
}

export const list = (
    inputBucket: Bucket,
    baseKey: string,
): Promise<{ objects: ListObjectsV2Output }> => {
    return new Promise((resolve, reject) => {
        s3.listObjectsV2(
            {
                Bucket: inputBucket.name,
                Delimiter: '/',
                Prefix: baseKey,
            },
            function(err, data) {
                if (err) {
                    console.error(
                        `S3 listing of s3://${inputBucket}/${baseKey} failed with`,
                        err,
                    )
                    reject()
                    return
                }
                console.log(`Keys below ${baseKey} fetched from ${inputBucket}`)
                resolve({ objects: data })
            },
        )
    })
}

export const copy = (
    key: string,
    inputBucket: Bucket,
    outputBucket: Bucket,
): Promise<{}> => {
    return new Promise((resolve, reject) => {
        s3.copyObject(
            {
                Bucket: outputBucket.name,
                CopySource: `${inputBucket.name}/${key}`,
                Key: `${key}`,
                ACL: 'public-read',
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (err, data) => {
                if (err) {
                    console.error(
                        `S3 copy of s3://${inputBucket.name}/${key} to s3://${outputBucket.name}/${key} failed with`,
                        err,
                    )
                    reject()
                    return
                }
                console.log(
                    `${inputBucket.name}/${key} copied to ${outputBucket.name}/${key}`,
                )
                resolve({})
            },
        )
    })
}

export interface GetS3ObjParams {
    Bucket: string
    Key: string
}

const cmsFrontsS3 = createCMSFrontsS3Client()

export const fetchfromCMSFrontsS3 = async (
    params: GetS3ObjParams,
): Promise<string> => {
    return cmsFrontsS3
        .getObject(params)
        .promise()
        .then(data => {
            if (data.Body == null) {
                throw new Error('S3 Object Response body was empty or null')
            }
            return data.Body.toString('utf-8')
        })
        .catch(e => {
            console.error(
                'Could not get content of S3 object for params:',
                params,
                'error: ',
                e,
            )
            throw e
        })
}

export const recursiveCopy = async (
    inputBucket: Bucket,
    outputBucket: Bucket,
    baseKey: string,
): Promise<{}[]> => {
    console.log(
        `Recursively copying ${baseKey} from ${inputBucket} to ${outputBucket}`,
    )

    const listing = await list(inputBucket, baseKey)
    const keys = listing.objects.Contents || []
    const subfolders = listing.objects.CommonPrefixes || []

    console.log(`Found ${keys.length} keys and ${subfolders.length} folders`)

    // Loop over creating copy promises
    const copyPromises = await Promise.all(
        keys.map(object =>
            attempt(copy(object.Key!, inputBucket, outputBucket)),
        ),
    )
    // Loop over creating recursive copy promises
    const recursionPromises = await Promise.all(
        subfolders.map(object =>
            attempt(recursiveCopy(inputBucket, outputBucket, object.Prefix!)),
        ),
    )
    // Gather the promises into one array and return
    return copyPromises.concat(recursionPromises)
}
