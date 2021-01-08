import React from 'react'
import { StyleSheet, View, Alert, Platform, Linking } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { DefaultInfoTextWebview } from './settings/default-info-text-webview'
import { useApolloClient } from '@apollo/react-hooks'
import { metrics } from 'src/theme/spacing'
import { html } from 'src/helpers/webview'
import { Button, ButtonAppearance } from 'src/components/Button/Button'
import { requestLocationPermission } from 'src/helpers/location-permission'
import { RESULTS } from 'react-native-permissions'
import { getGeolocation } from 'src/helpers/weather'
import { Copy } from 'src/helpers/words'
import { useIsWeatherShown } from 'src/hooks/use-weather-provider'

const styles = StyleSheet.create({
    button: {
        marginTop: metrics.vertical,
    },
    buttons: {
        marginHorizontal: metrics.horizontal,
        marginBottom:
            metrics.vertical * Platform.select({ default: 2, ios: 4 }),
    },
})

const showIsDisabledAlert = () => {
    Alert.alert(
        Copy.weather.disabledLocationAlertTitle,
        Copy.weather.disabledLocationAlertExplainer,
    )
}

const WeatherGeolocationConsentScreen = ({
    navigation,
}: NavigationInjectedProps) => {
    const apolloClient = useApolloClient()
    const { setIsWeatherShown } = useIsWeatherShown()
    const onConsentPress = async () => {
        const result = await requestLocationPermission(apolloClient)
        if (result === RESULTS.BLOCKED) {
            Alert.alert(
                Copy.weather.locationPermissionTitle,
                Copy.weather.locationPermissionExplainer,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            Linking.openSettings()
                        },
                    },
                ],
            )
            return
        }
        if (result === RESULTS.UNAVAILABLE) {
            showIsDisabledAlert()
            return
        }
        if (result === RESULTS.GRANTED) {
            try {
                await getGeolocation()
            } catch (error) {
                showIsDisabledAlert()
                return
            }
            navigation.dismiss()
        }
    }
    const onHidePress = (setIsWeatherShown: (setting: boolean) => void) => {
        setIsWeatherShown(false)
        navigation.dismiss()
    }

    return (
        <>
            <DefaultInfoTextWebview
                html={html`
                    ${Copy.weatherConsentHtml.content}
                `}
            />
            <View style={styles.buttons}>
                <Button
                    appearance={ButtonAppearance.skeletonBlue}
                    onPress={onConsentPress}
                    style={styles.button}
                >
                    {Copy.weather.acceptLocationButton}
                </Button>
                <Button
                    appearance={ButtonAppearance.skeletonBlue}
                    onPress={() => onHidePress(setIsWeatherShown)}
                    style={styles.button}
                >
                    {Copy.weather.cancelButton}
                </Button>
            </View>
        </>
    )
}

WeatherGeolocationConsentScreen.navigationOptions = {
    title: ' ',
    showHeaderLeft: false,
    showHeaderRight: true,
}

export { WeatherGeolocationConsentScreen }
