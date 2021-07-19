import { attempt } from '../../../backend/utils/try'
import { TemporaryCredentials, SNS } from 'aws-sdk'
import { IssuePublicationIdentifier, EditionId } from '../../common'
import { Status } from './status'
import { Moment } from 'moment'

export type ToolStatus =
    | 'Proofing'
    | 'Proofed'
    | 'Publishing'
    | 'Published'
    | 'Failed'
    | 'PostProcessing'

export interface PublishEvent {
    edition: EditionId
    issueDate: string
    version: string
    status: ToolStatus
    message: string
    timestamp: string
}

export const sendPublishStatusToTopic = async (pubEvent: PublishEvent) => {
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
    console.log(`SNS publish response: ${JSON.stringify(sendStatus)}`)
    return sendStatus
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function throwBadStatus(s: never): never {
    throw new Error('Unknown status type')
}

export const mobileAccountIdentifier = '(Mobile account)'

export const createPublishEvent = (
    identifier: IssuePublicationIdentifier,
    status: Status,
    eventTime: Moment,
): PublishEvent => {
    const timestamp = eventTime.format()
    switch (status) {
        case 'started':
            return {
                ...identifier,
                status: 'Proofing',
                message: `1/4: Started ${mobileAccountIdentifier}`,
                timestamp,
            }
        case 'assembled':
            return {
                ...identifier,
                status: 'Proofing',
                message: `2/4: Assembled ${mobileAccountIdentifier}`,
                timestamp,
            }
        case 'bundled':
            return {
                ...identifier,
                status: 'Proofing',
                message: `3/4: Bundled ${mobileAccountIdentifier}`,
                timestamp,
            }
        case 'proofed':
            return {
                ...identifier,
                status: 'Proofed',
                message: `4/4: Ready for proofing on-device ${mobileAccountIdentifier}`,
                timestamp,
            }
        case 'copied':
            return {
                ...identifier,
                status: 'Publishing',
                message: `1/2: Copied to publication location ${mobileAccountIdentifier}`,
                timestamp,
            }
        case 'published':
            return {
                ...identifier,
                status: 'Published',
                message: `2/2: Added to issue index ${mobileAccountIdentifier}`,
                timestamp,
            }
        case 'notified':
            return {
                ...identifier,
                status: 'PostProcessing',
                message: `Notification scheduled ${mobileAccountIdentifier}`,
                timestamp,
            }
        case 'editionsListUpdated':
            return {
                ...identifier,
                status: 'PostProcessing',
                message: `Editions List updated ${mobileAccountIdentifier}`,
                timestamp,
            }
        case 'errored':
            throw new Error('Can\'t make publish event with status "errored"')
        default:
            return throwBadStatus(status)
    }
}
