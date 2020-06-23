import { color } from 'src/theme/color'
import {
    TextFormatting,
    SpecialEditionButtonStyles,
} from '../../../../../Apps/common/src'
import { StyleSheet } from 'react-native'

const expiryDefaults = {
    color: color.text,
    font: 'GuardianTextSans-Regular',
    lineHeight: 16,
    size: 15,
}

const titleDefaults = {
    color: color.text,
    font: 'GHGuardianHeadline-Regular',
    lineHeight: 34,
    size: 34,
}

const subTitleDefaults = {
    color: color.text,
    font: 'GuardianTextSans-Bold',
    lineHeight: 20,
    size: 17,
}

const textFormatting = (
    selected: boolean,
    style: TextFormatting,
    defaults: TextFormatting,
) => ({
    color: selected ? 'white' : (style && style.color) || defaults.color,
    fontFamily: (style && style.font) || defaults.font,
    fontSize: (style && style.size) || defaults.size,
    lineHeight: (style && style.lineHeight) || defaults.lineHeight,
})

const styles = ({
    style,
    selected,
}: {
    style: SpecialEditionButtonStyles
    selected: boolean
}) =>
    StyleSheet.create({
        container: {
            backgroundColor:
                (selected ? color.primary : style && style.backgroundColor) ||
                color.palette.neutral[97],
            flexDirection: 'row',
            paddingTop: 12,
        },
        expiry: {
            flexWrap: 'wrap',
            marginTop: 8,
            ...textFormatting(selected, style && style.expiry, expiryDefaults),
        },
        image: {
            width: (style && style.image && style.image.width) || 87,
            height: (style && style.image && style.image.height) || 134,
        },
        textBox: {
            flexShrink: 1,
            paddingLeft: 10,
            paddingBottom: 15,
        },
        title: {
            flexWrap: 'wrap',

            ...textFormatting(selected, style && style.title, titleDefaults),
        },
        subTitle: {
            flexWrap: 'wrap',
            marginTop: 10,
            ...textFormatting(
                selected,
                style && style.subTitle,
                subTitleDefaults,
            ),
        },
    })

export { styles }