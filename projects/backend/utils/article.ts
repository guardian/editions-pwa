import { ArticleType, BlockElement, HTMLElement } from '../../Apps/common/src'
import { SharedIniFileCredentials, STS } from 'aws-sdk'
import { RequestSigner } from 'aws4'

type CAPIEndpoint = 'preview' | 'printsent' | 'live'

const DROP_CAP_ARTICLE_TYPES: ArticleType[] = [
    ArticleType.Immersive,
    ArticleType.Longread,
    ArticleType.Interview,
]

const articleShouldHaveDropCap = ({
    articleType,
}: {
    articleType?: ArticleType
}) => articleType && DROP_CAP_ARTICLE_TYPES.includes(articleType)

const isHTMLElement = (el?: BlockElement): el is HTMLElement =>
    !!el && el.id === 'html'

const getEndpoint = (capi: CAPIEndpoint, paths: string[]): string => {
    const queryString = `?ids=${paths.join(',')}&api-key=${
        process.env.CAPI_KEY
    }&format=thrift&show-elements=all&show-atoms=all&show-rights=all&show-fields=all&show-tags=all&show-blocks=all&show-references=all&page-size=100`

    switch (capi) {
        case 'printsent':
            return `${process.env.psurl}/search${queryString}`
        case 'live':
            return `https://content.guardianapis.com/search${queryString}`
        case 'preview':
            return `${process.env.capiPreviewUrl}/search${queryString}`
        default:
            return ''
    }
}

const getStsCreds = async (role: string) => {
    const sts = new STS({ apiVersion: '2011-06-15' })
    const creds = await sts
        .assumeRole({
            RoleArn: role as string,
            RoleSessionName: 'capi-assume-role-access2',
        })
        .promise()
        .catch(err => console.error('assume role failed', err))

    if (creds && creds.Credentials) {
        return {
            secretAccessKey: creds.Credentials.SecretAccessKey,
            accessKeyId: creds.Credentials.AccessKeyId,
            sessionToken: creds.Credentials.SessionToken,
        }
    } else {
        const errorMessage = `Could not generate credentials using STS role ${role}`
        console.error(errorMessage)
        throw new Error(errorMessage)
    }
}

const getProfileCreds = async () => {
    const credentials = new SharedIniFileCredentials({ profile: 'capi' })
    return {
        secretAccessKey: credentials.secretAccessKey,
        accessKeyId: credentials.accessKeyId,
        sessionToken: credentials.sessionToken,
    }
}

/**
 * To access the capi Preview endpoint we need to sign requests (as it is a private api gateway endpoint)
 * This function generates the necessary headers.
 * @param endpoint
 */
async function sign(endpoint: string) {
    const url = new URL(endpoint)

    const opts = {
        region: 'eu-west-1',
        service: 'execute-api',
        host: url.hostname,
        path: url.pathname + url.search,
    }

    const credentials = process.env.capiAccessArn
        ? await getStsCreds(process.env.capiAccessArn)
        : await getProfileCreds()

    const { headers } = new RequestSigner(opts, credentials).sign()

    return headers
}

const getPreviewHeaders = async (endpoint: string) => {
    return {
        Accept: 'application/json',
        ...(await sign(endpoint)),
    }
}

const generateCapiEndpoint = (ids: number[], capi: CAPIEndpoint): string => {
    const paths = ids.map(_ => `internal-code/page/${_}`)
    return getEndpoint(capi, paths)
}

export {
    articleShouldHaveDropCap,
    isHTMLElement,
    CAPIEndpoint,
    generateCapiEndpoint,
    getPreviewHeaders,
}
