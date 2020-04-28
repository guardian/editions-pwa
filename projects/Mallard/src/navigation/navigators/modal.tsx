import {
    NavigationContainer,
    AnimatedValue,
    NavigationInjectedProps,
} from 'react-navigation'
import { StackViewTransitionConfigs } from 'react-navigation-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { createCompatNavigatorFactory } from '@react-navigation/compat'

import React from 'react'

import { Animated } from 'react-native'
import { ModalForTablet } from 'src/components/layout/ui/modal-for-tablet'
import { addStaticRouter } from '../helpers/base'
import { supportsTransparentCards } from 'src/helpers/features'
import { safeInterpolation } from 'src/helpers/math'

const addStaticRouterWithModal = (
    Navigator: NavigationContainer,
    getPosition: () => AnimatedValue,
): NavigationContainer => {
    const WithModal = ({ navigation }: NavigationInjectedProps) => {
        return (
            <ModalForTablet position={getPosition()}>
                <Navigator navigation={navigation} />
            </ModalForTablet>
        )
    }
    return addStaticRouter(Navigator, WithModal)
}

const createModalNavigator = (
    parent: NavigationContainer,
    modalRoutes: {
        [key: string]: NavigationContainer
    },
) => {
    let animatedValue = new Animated.Value(0)

    const navigation: { [key: string]: NavigationContainer } = { _: parent }
    for (const [key, value] of Object.entries(modalRoutes)) {
        navigation[key] = addStaticRouterWithModal(value, () => animatedValue)
    }

    if (!supportsTransparentCards()) {
        return createCompatNavigatorFactory(
            createStackNavigator(navigation, {
                headerMode: 'none',
                initialRouteName: '_',
            }),
        )
    }

    return createCompatNavigatorFactory(
        createStackNavigator(navigation, {
            mode: 'modal',
            headerMode: 'none',
            transparentCard: true,
            cardOverlayEnabled: true,
            initialRouteName: '_',
            defaultNavigationOptions: {
                gesturesEnabled: false,
            },
            transitionConfig: (transitionProps, prevTransitionProps) => {
                const {
                    position,
                    scene: { index },
                } = transitionProps

                animatedValue = position.interpolate({
                    inputRange: safeInterpolation([
                        index - 1,
                        index,
                        index + 1,
                    ]),
                    outputRange: safeInterpolation([0, 1, 0]),
                })
                return StackViewTransitionConfigs.defaultTransitionConfig(
                    transitionProps,
                    prevTransitionProps,
                    true,
                )
            },
        }),
    )
}

export { createModalNavigator }
