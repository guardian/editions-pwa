import { Platform } from 'react-native'
import { getSetting } from 'src/helpers/settings'
import { notificationEdition } from 'src/helpers/settings/defaults'
import { errorService } from 'src/services/errors'

export interface PushToken {
    name: 'uk' | 'us' | 'au'
    type: 'editions'
}

const registerWithNotificationService = async (
    token: string,
    topics: PushToken[],
) => {
    const registerDeviceUrl = await getSetting('notificationServiceRegister')
    const options = {
        deviceToken: token,
        platform:
            Platform.OS === 'ios'
                ? notificationEdition.ios
                : notificationEdition.android,
        topics,
    }
    return fetch(registerDeviceUrl as string, {
        method: 'post',
        body: JSON.stringify(options),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response =>
            response.ok
                ? Promise.resolve(response.json())
                : Promise.reject(response.status),
        )
        .catch(e => errorService.captureException(e))
}

export { registerWithNotificationService }