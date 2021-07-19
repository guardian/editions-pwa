import { Handler } from 'aws-lambda'
import { unnest } from 'ramda'
import { attempt, hasFailed } from '../../../../backend/utils/try'
import {
    frontPath,
    htmlPath,
    htmlRootPath,
    Image,
    ImageSize,
    imageSizes,
    ImageUse,
    Issue,
} from '../../../common'
import { handleAndNotifyOnError } from '../../services/task-handler'
import { getFront, getRenderedFront } from '../../utils/backend-client'
import {
    getBucket,
    list,
    ONE_WEEK,
    recursiveCopy,
    upload,
} from '../../utils/s3'
import { IssueParams } from '../issue'
import {
    getAndUploadImageUse,
    getImagesFromFront,
    getImageUses,
} from './helpers/media'
import pAll = require('p-all')
import { sleep } from '../../utils/sleep'
import { uploadRenderedArticle } from './helpers/render'

export interface FrontTaskInput extends IssueParams {
    issue: Issue
    front: string //This is filled in by the state machine's map construct
}

const Bucket = getBucket('proof')

export const handler: Handler<
    FrontTaskInput,
    { message: string } //This is ignored by the state machine
> = handleAndNotifyOnError(async ({ issue, front }) => {
    console.log(`Uploading front+images for ${front}, ${issue}`)
    await sleep(1000)

    const { publishedId } = issue

    // *** Upload Front Data ***
    // Fetch the 'front' data for given front name from the backend and upload to s3
    // folder for the given Issue as well as upload all the images.

    const maybeFront = await getFront(publishedId, front)

    if (hasFailed(maybeFront)) {
        console.error(JSON.stringify(attempt))
        throw new Error(`Could not download front ${front}`)
    }

    const frontUpload = await attempt(
        upload(
            frontPath(publishedId, front),
            maybeFront,
            Bucket,
            'application/json',
            ONE_WEEK,
        ),
    )

    if (hasFailed(frontUpload)) {
        console.error(JSON.stringify(frontUpload))
        throw new Error('Could not upload front')
    }

    console.log(`front uploaded`, front)

    const images: Image[] = unnest(getImagesFromFront(maybeFront))
    type ImageSizeUse = [Image, ImageSize, ImageUse]
    const imagesWithUses: ImageSizeUse[] = unnest(
        unnest(
            images.map(image =>
                imageSizes.map(size =>
                    getImageUses(image).map(
                        (use): ImageSizeUse => [image, size, use],
                    ),
                ),
            ),
        ),
    )

    const imageUseUploadActions = imagesWithUses.map(
        ([image, size, use]) => async () =>
            attempt(getAndUploadImageUse(publishedId, image, size, use)),
    )

    const imageUseUploads = await pAll(imageUseUploadActions, {
        concurrency: 20,
    })

    const failedImageUseUploads = imageUseUploads.filter(hasFailed)
    failedImageUseUploads.map(failure => console.error(JSON.stringify(failure)))
    console.log('Uploaded images')

    const failedImages = failedImageUseUploads.length
    const success = failedImages === 0

    // *** Server Side Rendering ***
    // Fetch ER articles for this 'front' and upload them to the 'html' folder of the given Issue
    const renderedFront = await getRenderedFront(publishedId, front)
    if (hasFailed(renderedFront)) {
        console.error(JSON.stringify(renderedFront))
        throw new Error(
            `Failed to fetch rendered front '${front}' from the backend`,
        )
    }

    console.log(
        `Rendered front (${front}) fetched successfully from the Backend`,
    )
    const result = renderedFront.map(async renderedArticle => {
        return await uploadRenderedArticle(
            htmlPath(publishedId, renderedArticle.internalPageCode),
            renderedArticle.body,
        )
    })
    const failedHtmlUploads = result.filter(hasFailed)
    if (failedHtmlUploads.length > 0) {
        console.warn(
            `${failedHtmlUploads.length} rendered articles failed to upload`,
        )
    }
    console.log('Uploaded rendered HTML')

    // *** Copy Html Aassets ***
    // Copy html assets from a static folder (<bucket_name>/assets) to 'html/assets' of the given Issue. Since this lambda
    // function can trigger multiple times for any given Issue (for single 'front') we only need
    // to perform this copy operation once for a given Issue. If 'html/assets' exists then just ignore
    // this operation.
    const htmlAssetsRootPath = `${htmlRootPath(publishedId)}/assets/`
    const listing = await list(Bucket, htmlAssetsRootPath)
    const keys = listing.objects.Contents || []
    if (keys.length > 0) {
        console.log(
            '*** Ignoring asset copy: they are already copied for this issue ***',
        )
    } else {
        console.log('*** Copying assets for issue: ' + publishedId)
        const outBucket = {
            name: `${Bucket.name}/${htmlRootPath(publishedId)}`,
            context: Bucket.context,
        }
        const copyPromises = await recursiveCopy('assets', Bucket, outBucket)
        if (copyPromises.filter(hasFailed).length) {
            throw new Error(
                `*** Failed to copy Asset files for ${publishedId}***`,
            )
        } else {
            console.log(
                '*** Successfully copied html assets for issue: ' + publishedId,
            )
        }
    }

    return {
        message: `${front} and images uploaded ${
            success ? 'succesfully' : 'with some images missing'
        }.`,
    }
}, Bucket)
