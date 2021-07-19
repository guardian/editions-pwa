import { PassThrough } from 'stream'
import archiver = require('archiver')
import { s3, ONE_WEEK, Bucket } from '../../../utils/s3'
import { getMatchingObjects } from './lister'

// Replace absolute web url to relative url. This is required when edition app
// wants to load images from local file system
const replaceImageUrls = (html: string): string => {
    return html.replace(/https:\/\/i.guim.co.uk\/img\//g, `../media/images/`)
}

export const zip = async (
    name: string,
    prefixes: string[],
    options: {
        removeFromOutputPath?: string
        replaceImageSize?: string
        replaceImagePathInDataBundle?: boolean
    },
    bucket: Bucket,
) => {
    const output = new PassThrough()

    const upload = s3
        .upload({
            Bucket: bucket.name,
            Key: `zips/${name}.zip`,
            Body: output,
            ACL: 'public-read',
            ContentType: 'application/zip',
            CacheControl: `max-age=${ONE_WEEK}`,
        })
        .promise()

    const files = await getMatchingObjects(prefixes, bucket)

    console.log('Got file names, zipping them...')

    const archive = archiver('zip')
    archive.on('warning', err => {
        console.error('Error in attempting to compress', err)
    })
    archive.pipe(output)

    await Promise.all(
        files.map(async file => {
            const path = options.removeFromOutputPath
                ? file.replace(`${options.removeFromOutputPath}`, '')
                : file

            console.log(`fetching file from s3: ${file}`)
            const s3response = await s3
                .getObject({ Bucket: bucket.name, Key: file })
                .promise()
            if (s3response.Body == null) return false

            // Remove the 'image size' from the path and replace with a static `images`
            // to support new SSR compliant clients. Example: from 'media/phone/img1.png' to 'media/images/img1.png'
            const zipPath = options.replaceImageSize
                ? path.replace(`/${options.replaceImageSize}/`, '/images/')
                : path

            const shouldReplaceImagePath =
                options.replaceImagePathInDataBundle &&
                file.indexOf('html/assets/') == -1
            let bufferedData: Buffer
            if (shouldReplaceImagePath) {
                // SSR: inside the 'html' bundle all the image path need to be in
                // 'relative' path format so, replace them. Do not apply then to the
                // assets inside `html` folder
                const articleHtml = s3response.Body.toString('utf-8')
                const articleWithRelativeImgUrl = replaceImageUrls(articleHtml)
                bufferedData = Buffer.from(articleWithRelativeImgUrl)
            } else {
                bufferedData = s3response.Body as Buffer
            }
            archive.append(bufferedData, {
                name: zipPath,
            })
        }),
    )
    console.log(`Finished adding to zip ${name}.zip, finalizing.`)
    await archive.finalize()
    return upload
}
