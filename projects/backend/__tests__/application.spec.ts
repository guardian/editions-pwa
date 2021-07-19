import { Request, Response } from 'express'
import { EditionsBackendControllers, createApp } from '../application'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
chai.should()

const stub = (req: Request, res: Response) => {
    console.log(`endpoint: ${req.path} called`)
    res.sendStatus(200)
}

const stubEditionController = {
    GET: (req: Request, res: Response) => {
        res.sendStatus(200)
    },
    POST: (req: Request, res: Response) => {
        res.sendStatus(200)
    },
}

const testStubControllers: EditionsBackendControllers = {
    issuesSummaryController: stub,
    issueController: stub,
    frontController: stub,
    imageController: stub,
    renderFrontController: stub,
    renderItemController: stub,
    editionsController: stubEditionController,
}

describe('Endpoints contract test for Preview Editions Backend application', () => {
    const previewApp = createApp(testStubControllers, true)
    it('should return 404 for non registered endpoints', done => {
        chai.request(previewApp)
            .get('/non-exisitent')
            .end((err, res) => {
                expect(res.status).toBe(404)
                done()
            })
    })
    it('should return 200 for registered GET paths', done => {
        const expectedEndpoints = [
            '/',
            '/issues',
            '/daily-edition/issues',
            '/daily-edition/2019-09-17/preview/issue',
            '/daily-edition/2019-09-17/preview/front/Top%20stories',
            '/daily-edition/2019-09-17/preview/media/tablet/test/trail/asset.com',
            '/daily-edition/2019-09-17/preview/media/colours/test/trail/asset.com',
        ]

        expectedEndpoints.forEach(path => {
            chai.request(previewApp)
                .get(path)
                .end((err, res) => {
                    expect(res.status).toBe(200)
                    done()
                })
        })
    })
})

describe('Endpoints contract test for Versioned Editions Backend application', () => {
    const versionedApp = createApp(testStubControllers, false)
    const version = '2019-10-02T16:50:56.015Z'
    it('should return 404 for non registered endpoints', done => {
        chai.request(versionedApp)
            .get('/non-exisitent')
            .end((err, res) => {
                expect(res.status).toBe(404)
                done()
            })
    })
    it('should return 200 for registered GET paths', done => {
        const expectedEndpoints = [
            '/',
            '/issues',
            `/daily-edition/issues`,
            `/daily-edition/2019-09-17/${version}/issue`,
            `/daily-edition/2019-09-17/${version}/front/Top%20stories`,
            `/daily-edition/2019-09-17/${version}/media/tablet/test/trail/asset.com`,
            `/daily-edition/2019-09-17/${version}/media/colours/test/trail/asset.com`,
        ]

        expectedEndpoints.forEach(path => {
            chai.request(versionedApp)
                .get(path)
                .end((err, res) => {
                    expect(res.status).toBe(200)
                    done()
                })
        })
    })
})
