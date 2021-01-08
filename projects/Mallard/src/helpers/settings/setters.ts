/**
 * This exposes functions to update settings. Mutating a setting will update the
 * value in Apollo's client cache, which will trigger all dependent React
 * components to refresh. It also persists the new value in async storage.
 */
import { Settings, storeSetting, GdprSwitchSetting } from 'src/helpers/settings'
import ApolloClient from 'apollo-client'
import { SettingValues } from './resolvers'

export const GDPR_CONSENT_VERSION = 'gdprConsentVersion'

const setSetting = (
    name: keyof Settings,
    client: ApolloClient<object>,
    value: any,
) => {
    storeSetting(name, value as any)
    SettingValues.set(name, Promise.resolve(value))
    client.writeData({ data: { [name]: value } })
}

const createSetter = <Name extends keyof Settings>(
    name: Name,
): ((client: ApolloClient<object>, value: Settings[Name]) => void) => {
    return setSetting.bind(undefined, name)
}

/**
 * We never need to set up individual GDPR flags because they are managed by
 * "buckets", so this is a shorthand to set any of the GDPR switch by its name.
 */
export const setGdprFlag = (
    client: ApolloClient<object>,
    name: keyof Settings,
    value: GdprSwitchSetting,
) => {
    setSetting(name, client, value)
}

export const setWifiOnlyDownloads = createSetter('wifiOnlyDownloads')
export const setMaxAvailableEditions = createSetter('maxAvailableEditions')
export const setApiUrl = createSetter('apiUrl')
export const setGdprConsentVersion = createSetter(GDPR_CONSENT_VERSION)
