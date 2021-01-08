import {
    check,
    request,
    PERMISSIONS,
    PermissionStatus,
} from 'react-native-permissions'
import { Platform } from 'react-native'
import { refreshWeather } from './weather'
import { ApolloClient } from 'apollo-client'

const LOCATION_PERMISSION = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
})

const { resolveLocationPermissionStatus, requestLocationPermission } = (() => {
    let promise: Promise<PermissionStatus> | undefined

    const resolveLocationPermissionStatus = () => {
        if (promise) return promise
        promise = check(LOCATION_PERMISSION)
        return promise
    }

    const requestLocationPermission = async (
        apolloClient: ApolloClient<object>,
    ): Promise<PermissionStatus> => {
        promise = request(LOCATION_PERMISSION)
        const result = await promise
        refreshWeather(apolloClient)
        return result
    }

    return { resolveLocationPermissionStatus, requestLocationPermission }
})()

export { resolveLocationPermissionStatus, requestLocationPermission }
