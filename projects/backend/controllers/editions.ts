import { Request, Response } from 'express'
import { EditionsList, SpecialEdition } from '../../Apps/common/src'
import {
    s3Put,
    s3fetch,
    s3FrontsClient,
    s3EditionClient,
    getEditionsBucket,
    getFrontsBucket,
    s3ListDirectories,
} from '../s3'
import { isPreview } from '../preview'
import { hasFailed } from '../utils/try'
import { S3 } from 'aws-sdk'

const hasAtLeastOneIssue = async (
    editionId: string,
    s3Client: S3,
    bucket: string,
): Promise<boolean> => {
    const issues = await s3ListDirectories(
        { bucket: bucket, key: `${editionId}/` },
        s3Client,
    )
    if (hasFailed(issues)) {
        console.log(
            `Failed to find issue directories in bucket ${bucket}, key ${editionId}. Error: ${issues.error} msg: ${issues.messages}`,
        )
        return false
    } else {
        if (issues.length == 0) {
            console.log(
                `Found ${issues.length} issue for ${editionId} in bucket ${bucket}. Removing ${editionId} from editions list.`,
            )
        }
        return issues.length > 0
    }
}

const removeEditionsWith0Issues = async (
    editionsList: SpecialEdition[],
    s3Client: S3,
    bucket: string,
) => {
    const withOneIssue = await Promise.all(
        editionsList.map(e => hasAtLeastOneIssue(e.edition, s3Client, bucket)),
    )
    return editionsList.filter((e, index) => withOneIssue[index])
}

const filterEditionsList = async (
    editionsList: EditionsList,
    s3Client: S3,
    bucket: string,
) => {
    return {
        ...editionsList,
        specialEditions: await removeEditionsWith0Issues(
            editionsList.specialEditions,
            s3Client,
            bucket,
        ),
    }
}

export const editionsControllerGet = async (req: Request, res: Response) => {
    // we always use the published bucket to fetch editionsList as it doesn't
    // exist in the preview bucket - we'd need to change the fronts tool to fix this
    // so here we set isPreview to false to force use of the published bucket
    const editionsListBucket = getFrontsBucket(false)

    const result = await s3fetch({
        key: 'editionsList',
        bucket: editionsListBucket,
    })
    if (hasFailed(result)) {
        res.status(500)
        res.send(
            `failed to fetch editions list from bucket ${editionsListBucket} S3 Result: ${result}`,
        )
    } else {
        const editionsList = (await result.json()) as { content: EditionsList }
        const editionIssuesBucket = getFrontsBucket(isPreview)

        const filteredJson: EditionsList = await filterEditionsList(
            editionsList.content,
            s3FrontsClient,
            editionIssuesBucket,
        )

        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(filteredJson))
    }
}

const validateEdition = (edition: any) => {
    const REQUIRED_FIELDS = [
        'title',
        'subTitle',
        'edition',
        'editionType',
        'topic',
    ]
    const editionFields = Object.keys(edition)
    const missingFields = REQUIRED_FIELDS.filter(
        f => !editionFields.includes(f),
    )
    if (missingFields.length > 0) {
        console.error(
            `Editions List is invalid. Missing fields ${missingFields}`,
        )
        return false
    }
    return true
}

export const validateEditionsList = (editionList: any): boolean => {
    if (
        editionList.regionalEditions &&
        editionList.regionalEditions.length >= 2
    ) {
        const validEditions = editionList.regionalEditions.filter(
            validateEdition,
        )
        if (validEditions.length === editionList.regionalEditions.length) {
            return true
        }
    }
    return false
}

const uploadEditionsList = async (
    proofList: EditionsList,
    publishedList: EditionsList,
) => {
    // write to s3 bucket for both proof/store(published)
    await s3Put(
        { key: 'editions', bucket: getEditionsBucket('proofed') },
        JSON.stringify(proofList),
    )
    await s3Put(
        { key: 'editions', bucket: getEditionsBucket('published') },
        JSON.stringify(publishedList),
    )
}

export const editionsControllerPost = async (req: Request, res: Response) => {
    const editionsListValid = validateEditionsList(req.body)
    if (editionsListValid) {
        try {
            const list = req.body as EditionsList
            const filteredProofList = await filterEditionsList(
                list,
                s3EditionClient(),
                getEditionsBucket('proofed'),
            )

            const filteredPublishedList = await filterEditionsList(
                list,
                s3EditionClient(),
                getEditionsBucket('published'),
            )

            await uploadEditionsList(filteredProofList, filteredPublishedList)
            res.send(
                'Succesfully uploaded editions list to proof and published buckets',
            )
        } catch (error) {
            res.send('Failed to upload to proof/publish S3 buckets')
        }
    } else {
        res.status(400)
        res.send('Editions list invalid')
    }
}
