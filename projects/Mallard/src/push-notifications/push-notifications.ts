import moment, { MomentInput } from 'moment'
import { Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'
import {
    pushNotificationRegistrationCache,
    pushRegisteredTokens,
} from '../helpers/storage'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { defaultSettings } from 'src/helpers/settings/defaults'
import { errorService } from 'src/services/errors'
import { pushTracking } from './push-tracking'
import ApolloClient from 'apollo-client'
import { Feature } from 'src/services/logging'
import {
    registerWithNotificationService,
    PushToken,
} from './notification-service'
import { notificationTracking } from './notification-tracking'
import { downloadViaNotification } from 'src/download-edition/download-via-notification'
import { RegionalEdition } from '../../../Apps/common/src'
import { defaultRegionalEditions } from '../../../Apps/common/src/editions-defaults'
import { getDefaultEditionSlug } from 'src/hooks/use-edition-provider'

export interface PushNotificationRegistration {
    registrationDate: string
    token: string
}

const BASE_PUSH_TOKEN = [{ name: 'uk', type: 'editions' }] as PushToken[]
const topicToEdition = new Map<RegionalEdition['edition'], PushToken[]>()
topicToEdition.set(defaultRegionalEditions[1].edition, [
    {
        name: 'au',
        type: 'editions',
    },
])
topicToEdition.set(defaultRegionalEditions[2].edition, [
    {
        name: 'us',
        type: 'editions',
    },
])
topicToEdition.set(defaultRegionalEditions[0].edition, BASE_PUSH_TOKEN)

const getTopicName = async (): Promise<PushToken[]> => {
    const defaultSlug = await getDefaultEditionSlug()
    if (defaultSlug) {
        const chosenTopic = topicToEdition.get(defaultSlug)
        return chosenTopic || BASE_PUSH_TOKEN
    }
    return BASE_PUSH_TOKEN
}

const shouldReRegister = (
    newToken: string,
    registration: PushNotificationRegistration,
    now: MomentInput,
    currentTopics: PushToken[],
    newTopics: PushToken[],
): boolean => {
    const exceedTime =
        moment(now).diff(moment(registration.registrationDate), 'days') > 14
    const differentToken = newToken !== registration.token
    const unmatchedTopics = currentTopics !== newTopics
    return exceedTime || differentToken || unmatchedTopics
}

/**
 * will register / re-register if it should
 * will return whether it did register
 * will throw if anything major went wrong
 * */
const maybeRegister = async (
    token: string,
    // mocks for testing
    pushNotificationRegistrationCacheImpl = pushNotificationRegistrationCache,
    registerWithNotificationServiceImpl = registerWithNotificationService,
    now = moment().toString(),
) => {
    let should: boolean
    const newTopics = await getTopicName()
    if (!newTopics) {
        return false
    }

    try {
        const currentTopics = await pushRegisteredTokens.get()
        const cached = await pushNotificationRegistrationCacheImpl.get()
        // do the topic check in shouldReRegister
        should =
            !cached ||
            !currentTopics ||
            shouldReRegister(token, cached, now, currentTopics, newTopics)
    } catch {
        // in the unlikely event we have an error here, then re-register any way
        should = true
    }

    if (should) {
        // this will throw on non-200 so that we won't add registration info to the cache
        const response = await registerWithNotificationServiceImpl(
            token,
            newTopics,
        )
        pushRegisteredTokens.set(response['topics'])

        await pushNotificationRegistrationCacheImpl.set({
            registrationDate: now,
            token,
        })
        return true
    }

    return false
}

const pushNotifcationRegistration = (apolloClient: ApolloClient<object>) => {
    PushNotification.configure({
        onRegister: (token: { token: string } | undefined) => {
            pushTracking(
                'notificationToken',
                (token && JSON.stringify(token.token)) || '',
                Feature.PUSH_NOTIFICATION,
            )
            if (token) {
                maybeRegister(token.token).catch(err => {
                    pushTracking(
                        'notificationTokenError',
                        JSON.stringify(err) || '',
                        Feature.PUSH_NOTIFICATION,
                    )
                    console.log(`Error registering for notifications: ${err}`)
                    errorService.captureException(err)
                })
            }
        },
        onNotification: async (notification: any) => {
            const key = notification.data.key
            const notificationId =
                Platform.OS === 'ios'
                    ? notification.data.uniqueIdentifier
                    : notification.uniqueIdentifier

            await pushTracking('notification', key, Feature.DOWNLOAD)
            notificationTracking(notificationId, 'received')

            if (key) {
                try {
                    await downloadViaNotification(key, apolloClient)
                    notificationTracking(notificationId, 'downloaded')
                } catch (e) {
                    errorService.captureException(e)
                } finally {
                    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                    notification.finish(PushNotificationIOS.FetchResult.NoData)
                }
            }
        },
        senderID: defaultSettings.senderId,
        permissions: {
            alert: false,
            badge: false,
            sound: false,
        },
    })

    // Designed to reset the badge number - can be removed over time
    PushNotification.getApplicationIconBadgeNumber(
        number =>
            number > 0 && PushNotification.setApplicationIconBadgeNumber(0),
    )
}

export {
    pushNotifcationRegistration,
    /** exports for testing */
    maybeRegister,
}
