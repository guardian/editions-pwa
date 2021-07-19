import { handleAndNotifyInternal } from '../../src/services/task-handler'
import moment = require('moment')
import {
    createPublishEvent,
    mobileAccountIdentifier,
    PublishEvent,
} from '../../src/services/pub-status-notifier'
import { IssuePublicationIdentifier } from '../../common'
import { Bucket } from '../../src/utils/s3'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dontCare = {} as any

const input = {
    issuePublication: {
        edition: 'daily-edition',
        version: '2019-10-02T11:31:58.974+01:00',
        issueDate: '2019-09-11',
    } as IssuePublicationIdentifier,
}

const successHandler = async () => 'banana'

const failureHandler = async () => {
    throw new Error('error')
}

const now = moment('2019-10-05T11:31:58.974+01:00')

const getDependencies = () => {
    return {
        putStatus: jest.fn(),
        sendPublishStatusToTopic: jest.fn(),
        getMoment: () => now,
    }
}

describe('handleAndNotifyInternal', () => {
    it('should return result of handler and not call dependencies when success-status is errored', async () => {
        const dependencies = getDependencies()
        const actual = await handleAndNotifyInternal(
            'errored',
            successHandler,
            dependencies,
            dontCare,
        )(input, dontCare, dontCare)

        expect(actual).toBe('banana')
        expect(dependencies.putStatus).toBeCalledTimes(0)
        expect(dependencies.sendPublishStatusToTopic).toBeCalledTimes(0)
    })

    it('should return result of handler and call dependencies when success-status is provided', async () => {
        const bucket: Bucket = { name: 'myBucket', context: 'default' }
        const dependencies = getDependencies()
        const actual = await handleAndNotifyInternal(
            'started',
            successHandler,
            dependencies,
            bucket,
        )(input, dontCare, dontCare)

        expect(actual).toBe('banana')
        expect(dependencies.putStatus).toBeCalledTimes(1)
        expect(dependencies.sendPublishStatusToTopic).toBeCalledTimes(1)

        expect(dependencies.putStatus).toBeCalledWith(
            input.issuePublication,
            'started',
            bucket,
        )
        const event = createPublishEvent(input.issuePublication, 'started', now)
        expect(dependencies.sendPublishStatusToTopic).toBeCalledWith(event)
    })

    it('should propagate error on handler failure and send error notification', async () => {
        const dependencies = getDependencies()

        await expect(
            handleAndNotifyInternal(
                'started',
                failureHandler,
                dependencies,
                dontCare,
            )(input, dontCare, dontCare),
        ).rejects.toThrow()

        expect(dependencies.putStatus).toBeCalledTimes(0)
        expect(dependencies.sendPublishStatusToTopic).toBeCalledTimes(1)

        const event: PublishEvent = {
            ...input.issuePublication,
            status: 'Failed',
            message: `Error: error ${mobileAccountIdentifier}`,
            timestamp: now.format(),
        }
        expect(dependencies.sendPublishStatusToTopic).toBeCalledWith(event)
    })
})
