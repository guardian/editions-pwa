import express = require('express')
import { Request, Response } from 'express'
import listEndpoints from 'express-list-endpoints'
import {
    ImageSize,
    ImageThumbnailUse,
    thumbsPath,
} from '../Apps/common/src/index'
import { frontPath, issuePath, issueSummaryPath, mediaPath } from './common'
import { pickIssuePathSegments } from './utils/issue'

export interface EditionsBackendControllers {
    issuesSummaryController: (req: Request, res: Response) => void
    issueController: (req: Request, res: Response) => void
    frontController: (req: Request, res: Response) => void
    imageController: (req: Request, res: Response) => void
    renderController: (req: Request, res: Response) => void
    appsRenderingController: (req: Request, res: Response) => void
    editionsController: {
        GET: (req: Request, res: Response) => void
        POST: (req: Request, res: Response) => void
    }
}

export const createApp = (
    controllers: EditionsBackendControllers,
    asPreview: boolean,
): express.Application => {
    const app = express()

    if (asPreview) {
        console.log('🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞')
        console.log('🗞🗞🗞 HOT OFF THE PRESS THIS IS PREVIEW🗞🗞🗞')
        console.log('🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞')
    }

    const issuePathSegments = pickIssuePathSegments(asPreview)

    app.use((req, res, next) => {
        console.log(req.url)
        console.log(JSON.stringify(req.params))
        next()
    })

    // this next line supports legacy clients and can be removed after beta
    // it should return the issues list for the daily-edition
    app.get('/issues', controllers.issuesSummaryController)

    app.get('/editions', controllers.editionsController.GET)

    app.post('/editions', express.json(), controllers.editionsController.POST)

    app.get(
        '/' + issueSummaryPath(':edition'),
        controllers.issuesSummaryController,
    )
    app.get('/' + issuePath(issuePathSegments), controllers.issueController)
    app.get(
        '/' + frontPath(issuePathSegments, '*?'),
        controllers.frontController,
    )

    app.get('/render/:internalPageCode', controllers.renderController)

    app.get('/rendered-items/:path(*)', controllers.appsRenderingController)

    app.get(
        '/' +
            mediaPath(issuePathSegments, ':size' as ImageSize, {
                source: ':source',
                path: '*?',
            }),
        controllers.imageController,
    )

    app.get(
        '/' +
            thumbsPath(
                issuePathSegments,
                ':size' as ImageSize,
                { source: ':source', path: '*?' },
                ':use' as ImageThumbnailUse,
            ),
        controllers.imageController,
    )

    const endpoints = listEndpoints(app)

    const rootPath = '/'

    app.get(rootPath, (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(endpoints)
    })
    return app
}
