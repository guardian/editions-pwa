import React, { createContext, useState, useEffect, useContext } from 'react'
import { Dimensions, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { Breakpoints } from 'src/theme/breakpoints'
import { notificationsEnabledCache } from 'src/helpers/storage'
import { errorService } from 'src/services/errors'
import AsyncStorage from '@react-native-community/async-storage'
const oneGB = 1073741824
const USE_PRODDEVTOOL_KEY = '@use_proddevtool'

interface ConfigState {
    largeDeviceMemeory: boolean
    dimensions: {
        width: number
        height: number
        scale: number
        fontScale: number
    }
    notificationsEnabled: boolean
    setNotifications: (setting: boolean) => Promise<void>
    isUsingProdDevTools: boolean
    setIsUsingProdDevTools: (setting: boolean) => void
}

const notificationInitialState = () =>
    Platform.OS === 'android' ? true : false

const initialState: ConfigState = {
    largeDeviceMemeory: false,
    dimensions: {
        width: 0,
        height: 0,
        scale: 0,
        fontScale: 0,
    },
    notificationsEnabled: notificationInitialState(),
    setNotifications: () => Promise.resolve(),
    isUsingProdDevTools: false,
    setIsUsingProdDevTools: () => {},
}

const ConfigContext = createContext(initialState)

export const largeDeviceMemory = () => {
    return DeviceInfo.getTotalMemory().then(
        deviceMemory => deviceMemory > oneGB,
    )
}

export const notificationsAreEnabled = async () => {
    if (Platform.OS !== 'android') {
        return false
    }
    const isEnabled = await notificationsEnabledCache.get()
    return isEnabled || false
}

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [largeDeviceMemeory, setLargeDeviceMemory] = useState(false)
    const [dimensions, setDimensions] = useState(Dimensions.get('window'))
    const [isUsingProdDevTools, setUsingProdDevTools] = useState(false)
    const [notificationsEnabled, setNotificationsEnabled] = useState(
        notificationInitialState(),
    )

    const setIsUsingProdDevTools = (setting: boolean) => {
        setUsingProdDevTools(setting)
        AsyncStorage.setItem(USE_PRODDEVTOOL_KEY,
            JSON.stringify(setting),
        )
    }

    const setNotifications = async (setting: boolean) => {
        try {
            await notificationsEnabledCache.set(setting)
            setNotificationsEnabled(setting)
        } catch (e) {
            console.log(e)
            e.message = `Unable to Set Notifications Enabled: ${e.message}`
            errorService.captureException(e)
        }
    }

    useEffect(() => {
        async function getProdDevToolSetting() {
            const result = await AsyncStorage.getItem(USE_PRODDEVTOOL_KEY)
            if (result) setUsingProdDevTools(JSON.parse(result))
        }
        getProdDevToolSetting()
    }, [])

    useEffect(() => {
        notificationsAreEnabled().then(setting =>
            setNotificationsEnabled(setting),
        )
    }, [])

    useEffect(() => {
        largeDeviceMemory().then(deviceMemory =>
            setLargeDeviceMemory(deviceMemory),
        )
    }, [])
    useEffect(() => {
        const listener = (
            ev: Parameters<
                Parameters<typeof Dimensions.addEventListener>[1]
            >[0],
        ) => {
            /*
            this fixes this issue:
            https://trello.com/c/iEtMz9TH/867-video-stretched-on-ios-and-android-crash-on-orientation-change

            this means we will never relayout on smaller screens. For now this is ok
            because our screen size assumptions are a 1:1 match with iphone/ipad and
            a good enough™ match on android

            a more elegant fix would be to detect when a full screen video/photo
            is playing, basically anything that enables rotation when
            things below it should not rotate, and not relayout then.
            */
            if (
                Math.min(ev.window.width, ev.window.height) >=
                Breakpoints.tabletVertical
            ) {
                setDimensions(ev.window)
            }
        }
        Dimensions.addEventListener('change', listener)
        return () => {
            Dimensions.removeEventListener('change', listener)
        }
    }, [])

    return (
        <ConfigContext.Provider
            value={{
                largeDeviceMemeory,
                dimensions,
                notificationsEnabled,
                setNotifications,
                isUsingProdDevTools,
                setIsUsingProdDevTools,
            }}
        >
            {children}
        </ConfigContext.Provider>
    )
}

export const useLargeDeviceMemory = () =>
    useContext(ConfigContext).largeDeviceMemeory

export const useDimensions = () => useContext(ConfigContext).dimensions

export const useNotificationsEnabled = () => ({
    notificationsEnabled: useContext(ConfigContext).notificationsEnabled,
    setNotifications: useContext(ConfigContext).setNotifications,
})

export const useIsUsingProdDevTools = () => ({
    isUsingProdDevTools: useContext(ConfigContext).isUsingProdDevTools,
    setIsUsingProdDevTools: useContext(ConfigContext).setIsUsingProdDevTools,
})
