import React from 'react'
import { WebView, WebViewProps } from 'react-native-webview'
import { Article, PictureArticle, GalleryArticle, ImageSize } from 'src/common'
import { onShouldStartLoadWithRequest } from './helpers'
import gql from 'graphql-tag'
import { useQuery } from 'src/hooks/apollo'
import { useLargeDeviceMemory } from 'src/hooks/use-config-provider'
import { defaultSettings } from 'src/helpers/settings/defaults'
import { FSPaths } from 'src/paths'
import { Platform } from 'react-native'

type QueryValue = { imageSize: ImageSize; apiUrl: string }
const QUERY = gql`
    {
        imageSize @client
        apiUrl @client
    }
`

const WebviewWithArticle = ({
    article,
    _ref,
    ...webViewProps
}: {
    article: Article | PictureArticle | GalleryArticle
    _ref?: (ref: WebView) => void
} & WebViewProps & { onScroll?: any }) => {
    const largeDeviceMemory = useLargeDeviceMemory()

    const res = useQuery<QueryValue>(QUERY)
    // Hold off rendering until we have all the necessary data.
    if (res.loading) return null

    // const uri =
    //     defaultSettings.appRenderingService + article.key + '?template=editions'
    
    const coreuri = FSPaths.issuesDir + '/daily-edition/2020-10-14/jamestest/index.html'
    const uri = Platform.OS === 'android' ? 'file:///' + coreuri : coreuri
    // alert(uri)

    return (
        <WebView
            {...webViewProps}
            bounces={largeDeviceMemory ? true : false}
            originWhitelist={['*']}
            scrollEnabled={true}
            source={{
                uri,
                baseUrl: ''
                // baseUrl: FSPaths.issuesDir + '/daily-edition/2020-10-14/jamestest/' /* required as per https://stackoverflow.com/a/51931187/609907 */,
            }}
            ref={_ref}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            allowFileAccess={true}
            allowFileAccessFromFileURLs={true}
            allowingReadAccessToURL={FSPaths.issuesDir}
        />
    )
}

export { WebviewWithArticle }
