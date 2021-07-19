require('dotenv').config()

import awsServerlessExpress from 'aws-serverless-express'
import { Handler } from 'aws-lambda'
import { issueController, issuesSummaryController } from './controllers/issue'
import { frontController } from './controllers/fronts'
import { imageController } from './controllers/image'
import {
    renderFrontController,
    renderItemController,
} from './controllers/render'
import {
    editionsControllerGet,
    editionsControllerPost,
} from './controllers/editions'
import { createApp, EditionsBackendControllers } from './application'
import { isPreview } from './preview'

const runtimeControllers: EditionsBackendControllers = {
    issuesSummaryController,
    issueController,
    frontController,
    imageController,
    renderFrontController,
    renderItemController,
    editionsController: {
        GET: editionsControllerGet,
        POST: editionsControllerPost,
    },
}

const asPreview = isPreview
const app = createApp(runtimeControllers, asPreview)

export const handler: Handler = (event, context) => {
    awsServerlessExpress.proxy(
        awsServerlessExpress.createServer(app),
        event,
        context,
    )
}

if (require.main === module) {
    const port = 3131

    app.listen(port, () => {
        console.log(`Editions backend listening on port ${port}!`)
        console.log('Editions backend endpoints list available at root path')
    })
}
