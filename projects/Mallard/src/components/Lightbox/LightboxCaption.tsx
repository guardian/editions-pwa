import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ArticleTheme } from 'src/components/article/html/article'
import { NativeArrow } from 'src/components/article/html/components/icon/native-arrow'
import { themeColors } from 'src/components/article/html/helpers/css'
import { Direction } from '../../../../Apps/common/src'

const styles = StyleSheet.create({
    captionWrapper: {
        position: 'absolute',
        zIndex: 1,
        opacity: 0.8,
        backgroundColor: themeColors(ArticleTheme.Dark).background,
        bottom: 0,
        width: '100%',
    },
    captionText: {
        color: themeColors(ArticleTheme.Dark).dimText,
        paddingLeft: 2,
        paddingBottom: 50,
    },
    caption: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,
        paddingHorizontal: 10,
    },
})

const LightboxCaption = ({
    caption,
    pillarColor,
}: {
    caption: string
    pillarColor: string
}) => {
    return (
        <View style={styles.captionWrapper}>
            <View style={styles.caption}>
                <NativeArrow fill={pillarColor} direction={Direction.top} />
                <Text style={styles.captionText}>{caption}</Text>
            </View>
        </View>
    )
}

export { LightboxCaption }