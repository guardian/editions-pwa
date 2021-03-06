import moment from 'moment'
import uuid from 'uuidv4'
import { IssueNotificationData } from './device-notifications'
import { RequestInit, RequestInfo } from 'node-fetch'

type EditionNotificationTypes = 'editions'

type NotificationSenders = 'editions-backend'

interface EditionTopic {
    type: EditionNotificationTypes
    name: string
}

interface ScheduleDeviceNotificationPayload {
    id: string
    type: EditionNotificationTypes
    topic: EditionTopic[]
    key: string
    name: string
    date: string
    sender: NotificationSenders
}

const createScheduleNotificationEndpoint = (
    domain: string,
    scheduleTime: string,
) => {
    return `${domain}/push/schedule/${scheduleTime}`
}

/**
 * TODO
 * +3 hours from issue date is defaulted in.
 * This will (obviously) work only for Daily Editions in UK
 * In the future we will need to make it more generic (for US and Australia)
 **/
export const createScheduleTime = (issueDate: string, offset = 3): string => {
    const issueDateAsDate = moment.utc(issueDate, 'YYYY-MM-DD')
    issueDateAsDate.locale('utc')
    const notificationDate = issueDateAsDate.add(offset, 'hours')
    const notificationDateAsString = notificationDate.format(
        'YYYY-MM-DDTHH:mm:ssZ',
    )
    console.log(
        `Calculated notification time: ${issueDate} + ${offset} gives ${notificationDateAsString}`,
    )
    return notificationDateAsString
}

export const shouldSchedule = (scheduleTime: string, now: Date): boolean => {
    if (!moment(now).isValid()) {
        throw new Error(`given Date now: ${now} is invalid`)
    }
    const scheduleDate = moment(scheduleTime)
    if (!scheduleDate.isValid()) {
        throw new Error(`given Date scheduleTime: ${scheduleTime} is invalid`)
    }
    return scheduleDate.isAfter(now)
}

export const prepareScheduleDeviceNotificationRequest = (
    issueData: IssueNotificationData,
    cfg: { domain: string; apiKey: string },
    scheduleTime: string,
): { reqEndpoint: RequestInfo; reqBody: RequestInit } => {
    const { domain, apiKey } = cfg

    const { key, name, issueDate, topic } = issueData

    /**
     * TODO
     * Payload is hardcoded now for UK
     * In the future we will need to make it more generic (for US and Australia)
     */
    const payload: ScheduleDeviceNotificationPayload = {
        id: uuid.fromString(key),
        type: 'editions',
        topic: [{ type: 'editions', name: topic }],
        key,
        name,
        date: issueDate,
        sender: 'editions-backend',
    }

    const reqBody: RequestInit = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }

    const reqEndpoint = createScheduleNotificationEndpoint(domain, scheduleTime)

    console.log('Device notification endpoint:', reqEndpoint)
    console.log('Issue device notification payload', JSON.stringify(payload))

    return {
        reqEndpoint,
        reqBody,
    }
}
