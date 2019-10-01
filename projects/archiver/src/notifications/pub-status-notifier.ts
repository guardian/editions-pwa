import { attempt } from '../../../backend/utils/try'
import { TemporaryCredentials, SNS } from 'aws-sdk'
import { IssuePublicationIdentifier } from '../../common'
import { Status } from '../status'
import moment, { Moment } from 'moment'

export type ToolStatus = 'Processing' | 'Published' | 'Failed'

export interface PublishEvent {
    edition: string
    issueDate: string
    version: string
    status: ToolStatus
    message: string
    timestamp: string
}

const sendPublishStatusToTopic = async (pubEvent: PublishEvent) => {
    console.log('attempt to send publish status update', pubEvent)
    const payload = { event: pubEvent }
    const topic = process.env.topic
    const role = process.env.role
    if (topic === undefined || role === undefined) {
        throw new Error('No topic or role.')
    }
    const sns = new SNS({
        region: 'eu-west-1',
        credentials: new TemporaryCredentials({
            RoleArn: role,
            RoleSessionName: 'front-assume-role-access-for-sns',
        }),
    })
    const sendStatus = await attempt(
        sns
            .publish({ TopicArn: topic, Message: JSON.stringify(payload) })
            .promise(),
    )
    return sendStatus
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function throwBadStatus(s: never): never {
    throw new Error('Unknown status type')
}

const createPublishEvent = (
    identifier: IssuePublicationIdentifier,
    status: Status,
    eventTime: Moment,
): PublishEvent => {
    const timestamp = eventTime.format()
    switch (status) {
        case 'started':
        case 'assembled':
        case 'bundled':
        case 'indexed':
            return {
                ...identifier,
                status: 'Processing',
                message: `Issue is now ${status}`,
                timestamp,
            }
        case 'notified':
            return {
                ...identifier,
                status: 'Published',
                message: 'Device notification scheduled',
                timestamp,
            }
        case 'unknown':
            throw new Error('Can\'t make publish event with status "unknown"')
        default:
            return throwBadStatus(status)
    }
}

async function handleAndNotifyInternal<T>(
    identifier: IssuePublicationIdentifier,
    statusOnSuccess: Status | undefined,
    handler: () => Promise<T>,
): Promise<T> {
    try {
        const result = await handler()
        if (statusOnSuccess) {
            const now = moment()
            const event = createPublishEvent(identifier, statusOnSuccess, now)
            await sendPublishStatusToTopic(event)
        }
        return result
    } catch (err) {
        // send failure notification
        await sendPublishStatusToTopic({
            ...identifier,
            status: 'Failed',
            message: err,
            timestamp: moment().format(),
        })
        // now escalate error
        throw err
    }
}

export async function handleAndNotify<T>(
    identifier: IssuePublicationIdentifier,
    statusOnSuccess: Status,
    handler: () => Promise<T>,
): Promise<T> {
    return await handleAndNotifyInternal(identifier, statusOnSuccess, handler)
}

export async function handleAndNotifyOnError<T>(
    identifier: IssuePublicationIdentifier,
    handler: () => Promise<T>,
): Promise<T> {
    return await handleAndNotifyInternal(identifier, undefined, handler)
}
