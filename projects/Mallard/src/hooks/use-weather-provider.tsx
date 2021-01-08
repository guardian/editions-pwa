import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { eventEmitter } from 'src/helpers/event-emitter'
import { getDefaultEditionSlug } from 'src/hooks/use-edition-provider'
import { largeDeviceMemory } from 'src/hooks/use-config-provider'

const LOW_RAM_KEY = '@weatherLowRAMCheck'
const EDITION_CHECK_KEY = '@weatherEditionCheck'
const IS_WEATHER_SHOWN_KEY = '@isWeatherShown'

interface WeatherState {
    isWeatherShown: boolean
    setIsWeatherShown: (setting: boolean) => void
}

const initialState: WeatherState = {
    isWeatherShown: true,
    setIsWeatherShown: () => {},
}

const WeatherContext = createContext(initialState)

export const WeatherProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [isWeatherShown, setWeatherShown] = useState<boolean>(true)
    const setIsWeatherShown = (setting: boolean) => {
        setWeatherShown(setting)
        AsyncStorage.setItem(IS_WEATHER_SHOWN_KEY,
            JSON.stringify(setting),
        )
    }

    useEffect(() => {
        async function getPersistedState() {
            const result = await AsyncStorage.getItem(IS_WEATHER_SHOWN_KEY)
            if (result) setIsWeatherShown(JSON.parse(result))
        }
        getPersistedState()
    }, [])

    useEffect

    useEffect(() => {
        // Purpose: To hide the weather on the first load unless the user turns it on
        // Intended for use on lower powered devices and for users who do not use the UK Daily edition as their default edition
        async function shouldWeatherBeShown() {
            const lowRamWeatherCheck = await AsyncStorage.getItem(LOW_RAM_KEY)
            const editionWeatherCheck = await AsyncStorage.getItem(
                EDITION_CHECK_KEY,
            )
            const defaultEdition = await getDefaultEditionSlug()
            if (!lowRamWeatherCheck) {
                const largeRAM = await largeDeviceMemory()
                await AsyncStorage.setItem(LOW_RAM_KEY, 'true')
                !largeRAM && setIsWeatherShown(false)
            }
            if (
                !editionWeatherCheck &&
                defaultEdition &&
                defaultEdition !== 'daily-edition'
            ) {
                await AsyncStorage.setItem(EDITION_CHECK_KEY, 'true')
                setIsWeatherShown(false)
            }
        }

        eventEmitter.on('editionCachesSet', () => {
            shouldWeatherBeShown()
        })
    }, [])

    return (
        <WeatherContext.Provider
            value={{
                isWeatherShown,
                setIsWeatherShown,
            }}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export const useIsWeatherShown = () => ({
    isWeatherShown: useContext(WeatherContext).isWeatherShown,
    setIsWeatherShown: useContext(WeatherContext).setIsWeatherShown,
})
