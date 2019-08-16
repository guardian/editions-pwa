import React, { ReactNode } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { AnimatedValue } from 'react-navigation'
import { WithBreakpoints } from 'src/components/layout/ui/sizing/with-breakpoints'
import { Breakpoints } from 'src/theme/breakpoints'

const modalStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        flexGrow: 1,
    },
    bg: {
        backgroundColor: 'rgba(52, 52, 52, .5)',
        transform: [{ scaleY: 10 }],
        zIndex: 0,
        ...StyleSheet.absoluteFillObject,
    },
    modal: {
        width: 400,
        height: 600,
        backgroundColor: 'red',
        zIndex: 1,
    },
})

const ModalForTablet = ({
    children,
    position,
}: {
    children: ReactNode
    position: AnimatedValue
}) => {
    return (
        <WithBreakpoints>
            {{
                [0]: () => <>{children}</>,
                [Breakpoints.tabletVertical]: () => (
                    <View style={[modalStyles.root]}>
                        <View style={modalStyles.modal}>{children}</View>
                        <Animated.View
                            style={[
                                modalStyles.bg,
                                {
                                    opacity: position.interpolate({
                                        inputRange: [0, 0.9, 1],
                                        outputRange: [0, 0, 1],
                                    }),
                                },
                            ]}
                        />
                    </View>
                ),
            }}
        </WithBreakpoints>
    )
}

export { ModalForTablet }
