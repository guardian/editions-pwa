import AsyncStorage from '@react-native-community/async-storage'
import { defaultSettings } from './settings/defaults'

/**
 * History of Consent Management
 *
 * v1 - The initial version that CMP was released with
 * v2 - Move Braze from ESSENTIAL to PERSONALISED_ADS
 * v3 - Add Logging to PERFORMANCE
 * v4 - Add Apple in FUNCTIONALITY
 * v5 - Add Firebase in ESSENTIAL
 * v6 - Add Crashlytics in PERFORMANCE, update wording in ESSENTIAL
 * v7 - Remove Braze from wording in ESSENTIAL
 */
export const CURRENT_CONSENT_VERSION = 7

export interface GdprDefaultSettings {
    gdprAllowEssential: boolean
}

/*
Consent switches can be 'unset' or null
*/
export type GdprSwitchSetting = null | boolean
export interface GdprSwitchSettings {
    gdprAllowPerformance: GdprSwitchSetting
    gdprAllowFunctionality: GdprSwitchSetting
}

export const SETTINGS_KEY_PREFIX = '@Setting_'

export const gdprAllowEssentialKey = 'gdprAllowEssential'
export const gdprAllowPerformanceKey = 'gdprAllowPerformance'
export const gdprAllowFunctionalityKey = 'gdprAllowFunctionality'

export const gdprConsentVersionKey = 'gdprConsentVersion'

export type GDPRBucketKeys =
    | 'gdprAllowEssential'
    | 'gdprAllowPerformance'
    | 'gdprAllowFunctionality'
    | 'gdprConsentVersion'
type GDPRBucket = { [K in GDPRBucketKeys]: (keyof GdprSettings)[] }

export const gdprSwitchSettings: (keyof GdprSwitchSettings)[] = [
    gdprAllowPerformanceKey,
    gdprAllowFunctionalityKey,
]

export const GdprBuckets: GDPRBucket = {
    gdprAllowEssential: ['gdprAllowOphan'],
    gdprAllowPerformance: ['gdprAllowSentry'],
    gdprAllowFunctionality: ['gdprAllowGoogleLogin', 'gdprAllowFacebookLogin'],
    gdprConsentVersion: ['gdprConsentVersion'],
}

export interface GdprSettings {
    gdprConsentVersion: null | number
    // 'essential' purpose:
    gdprAllowOphan: GdprSwitchSetting
    // 'performance' purpose:
    gdprAllowSentry: GdprSwitchSetting
    // 'functionality' purpose:
    gdprAllowGoogleLogin: GdprSwitchSetting
    gdprAllowFacebookLogin: GdprSwitchSetting
}

export interface DevSettings {
    apiUrl: string
    isUsingProdDevTools: boolean
    notificationServiceRegister: string
    cacheClearUrl: string
    deprecationWarningUrl: string
    editionsUrl: string
    storeDetails: {
        ios: string
        android: string
    }
    websiteUrl: string
    issuesPath: string
    senderId: string
    logging: string
}

interface UserSettings {
    isWeatherShown: boolean
    wifiOnlyDownloads: boolean
    maxAvailableEditions: number
}

export interface Settings
    extends GdprSwitchSettings,
        GdprDefaultSettings,
        GdprSettings,
        UserSettings,
        DevSettings {}

/*
we can only store strings to memory
so we need to convert them
*/
export type UnsanitizedSetting = Settings[keyof Settings]
const sanitize = (value: UnsanitizedSetting): string => {
    if (typeof value !== 'string') {
        return JSON.stringify(value)
    }
    return value
}
const unsanitize = (value: string): UnsanitizedSetting => {
    try {
        return JSON.parse(value)
    } catch {
        return value
    }
}

export const getSetting = <S extends keyof Settings>(
    setting: S,
): Promise<Settings[S]> =>
    AsyncStorage.getItem(SETTINGS_KEY_PREFIX + setting).then(item => {
        if (!item) {
            return defaultSettings[setting]
        }
        return unsanitize(item) as Settings[S]
    })

export const storeSetting = (
    setting: keyof Settings,
    value: UnsanitizedSetting,
) => AsyncStorage.setItem(SETTINGS_KEY_PREFIX + setting, sanitize(value))

export type GdprSwitch = keyof GdprSwitchSettings

export const withConsent = async <T>(
    consentSwitch: GdprSwitch | null, // false allows conditionally ignoring consent
    {
        allow,
        deny,
    }: {
        allow: () => T
        deny: (wasSet: boolean) => T
    },
    getSettingImpl = getSetting,
) => {
    if (!consentSwitch) return allow()
    const allowed = await getSettingImpl(consentSwitch)
    return allowed ? allow() : deny(allowed === false)
}
