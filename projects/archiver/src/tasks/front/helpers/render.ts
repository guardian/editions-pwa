import { getBucket, ONE_MONTH, upload } from '../../../utils/s3'

// call render function in backend client, store result

export const uploadRenderedArticle = async (path: string, html: string) => {
    const Bucket = getBucket('proof')
    return upload(path, html, Bucket, 'text/html', ONE_MONTH)
}
