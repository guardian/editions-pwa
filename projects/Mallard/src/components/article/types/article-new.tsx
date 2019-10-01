import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { BlockElement } from 'src/common'
import { OnTopPositionChangeFn } from 'src/screens/article/helpers'
import { metrics } from 'src/theme/spacing'
import { Fader } from '../../layout/animators/fader'
import { ArticleHeaderProps } from '../article-header/types'
import { PropTypes as StandfirstPropTypes } from '../article-standfirst'
import { Wrap, WrapLayout } from '../wrap/wrap'
import { WebviewWithArticle } from './article/webview'
import { useArticle } from 'src/hooks/use-article'
import { parsePing } from 'src/helpers/webview'

const styles = StyleSheet.create({
    block: {
        alignItems: 'flex-start',
        padding: metrics.horizontal,
        paddingVertical: metrics.vertical,
    },
    webviewWrap: {
        ...StyleSheet.absoluteFillObject,
    },
    webview: {
        flex: 1,
        /*
        The below line fixes crashes on Android
        https://github.com/react-native-community/react-native-webview/issues/429
        */
        opacity: 0.99,
    },
})

const Article = ({
    onTopPositionChange,
    article,
    ...headerProps
}: {
    article: BlockElement[]
    onTopPositionChange: OnTopPositionChangeFn
} & ArticleHeaderProps &
    StandfirstPropTypes) => {
    const [wrapLayout, setWrapLayout] = useState<WrapLayout | null>(null)
    const [, { type }] = useArticle()
    console.log('webview rerender ' + wrapLayout)
    return (
        <Fader>
            {wrapLayout && (
                <WebviewWithArticle
                    headerProps={{ ...headerProps, type: type }}
                    article={article}
                    scrollEnabled={true}
                    useWebKit={false}
                    style={[styles.webview]}
                    wrapLayout={wrapLayout}
                    onMessage={event => {
                        const { isAtTop } = parsePing(event.nativeEvent.data)
                        console.log(isAtTop)
                    }}
                />
            )}
            <Wrap onWrapLayout={setWrapLayout}></Wrap>
        </Fader>
    )
}

export { Article }
