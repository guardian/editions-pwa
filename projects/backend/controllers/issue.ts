import { Request, Response } from 'express'
import {
    IssueSummary,
    IssuePublicationIdentifier,
    EditionId,
    notNull,
} from '../common'
import { getIssue } from '../issue'
import { isPreview as isPreviewStage } from '../preview'
import { s3List, s3FrontsClient } from '../s3'
import { Attempt, hasFailed } from '../utils/try'
import {
    buildEditionRootPath as buildEditionPath,
    decodeVersionOrPreview,
    getEditionOrFallback,
} from '../utils/issue'
import { groupBy } from 'ramda'

export const DEFAULT_LIVE_PAGE_SIZE = 30
export const DEFAULT_PREVIEW_PAGE_SIZE = 35

export const issueController = (req: Request, res: Response) => {
    const issueDate: string = req.params.date
    const version: string = decodeVersionOrPreview(
        req.params.version,
        isPreviewStage,
    )
    const edition = req.params.edition
    const issue: IssuePublicationIdentifier = {
        issueDate,
        version,
        edition,
    }
    console.log(`${req.url}: request for issue ${issueDate}`)
    getIssue(issue)
        .then(data => {
            if (data === 'notfound') {
                res.sendStatus(404)
                return
            }
            res.setHeader('Last-Modifed', new Date(version).getTime())
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(data))
        })
        .catch(e => console.error(e))
}

export const getIssuesSummary = async (
    maybeEdition: string,
    isPreview: boolean,
    pageSize?: number,
): Promise<Attempt<IssueSummary[]>> => {
    /**
     * fallbacks to 'daily-edition'
     * to support /issues path
     * TODO to delete in the future
     */
    const edition: EditionId = getEditionOrFallback(maybeEdition)
    const editionPath = buildEditionPath(maybeEdition, isPreview)
    const issueKeys = await s3List(editionPath, s3FrontsClient)
    console.log(`Preparing issues summaries, isPreview: ${isPreview}`)

    if (hasFailed(issueKeys)) {
        console.error('Error in issue index controller')
        console.error(JSON.stringify(issueKeys))
        return issueKeys
    }
    const issuePublications: IssuePublicationIdentifier[] = issueKeys.map(
        ({ key, lastModified }) => {
            const [, issueDate, filename] = key.split('/')
            const publicationDate = lastModified
            const version = filename.replace('.json', '')
            return {
                edition,
                issueDate,
                version,
                publicationDate,
            }
        },
    )

    const issues = Object.values(
        groupBy(_ => _.issueDate, issuePublications),
    ).map(versions =>
        versions.reduce((a, b) =>
            new Date(a.version).getTime() > new Date(b.version).getTime() // Version is always a date. This is obscene. This controller should also never be hit. Fix after launch.
                ? a
                : b,
        ),
    )

    return issues
        .map(issuePublication => {
            const date = new Date(issuePublication.issueDate)
            if (isNaN(date.getTime())) {
                console.warn(
                    `Issue with path ${JSON.stringify(
                        issuePublication,
                    )} is not a valid date`,
                )
                return null
            }
            return { compositeKey: issuePublication, date }
        })
        .filter(notNull)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map(({ compositeKey, date }) => ({
            key: `${compositeKey.edition}/${compositeKey.issueDate}`,
            name: 'Daily Edition',
            date: date.toISOString(),
            localId: `${compositeKey.edition}/${compositeKey.issueDate}`,
            publishedId: `${compositeKey.edition}/${compositeKey.issueDate}/${compositeKey.version}`,
        }))
        .slice(
            0,
            pageSize ||
                (isPreview
                    ? DEFAULT_PREVIEW_PAGE_SIZE
                    : DEFAULT_LIVE_PAGE_SIZE),
        )
}

export const issuesSummaryController = (req: Request, res: Response) => {
    const issueEdition = req.params.edition
    getIssuesSummary(issueEdition, isPreviewStage)
        .then(data => {
            if (hasFailed(data)) {
                console.error(JSON.stringify(data))
                res.sendStatus(data.httpStatus || 500)
                return
            }
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(data))
        })
        .catch(e => {
            console.error(e)
            res.sendStatus(500)
        })
}
