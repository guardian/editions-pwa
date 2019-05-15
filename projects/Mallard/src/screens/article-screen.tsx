import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { MonoTextBlock, HeadlineText } from '../components/styled-text'
import { useFetch } from '../hooks/use-fetch'
import { Transition } from 'react-navigation-fluid-transitions'
import { NavigationScreenProp } from 'react-navigation'
import { color } from '../theme/color'
import { metrics } from '../theme/spacing'

const styles = StyleSheet.create({
    container: {
        color: '#fff',
    },
    headline: {
        flex: 1,
        alignItems: 'flex-start',
        padding: metrics.horizontal,
        paddingVertical: metrics.vertical,
        backgroundColor: color.palette.highlight.main,
    },
    block: {
        alignItems: 'flex-start',
        padding: metrics.horizontal,
        paddingVertical: metrics.vertical,
    },
})

const useArticleData = (articleId, { headline }) => {
    return useFetch(
        'http://localhost:3131',
        [headline, [[]]],
        res => res[articleId],
    )
}

export const ArticleScreen = ({
    navigation,
}: {
    navigation: NavigationScreenProp<{}>
}) => {
    const article = navigation.getParam('article', -1)
    const headlineFromUrl = navigation.getParam(
        'headline',
        'HEADLINE NOT FOUND',
    )
    const [headline, [articleData]] = useArticleData(article, {
        headline: headlineFromUrl,
    })

    return (
        <ScrollView>
            <View style={styles.container}>
                <Transition shared={`item-${article}`}>
                    <View style={styles.headline}>
                        <Transition shared={`item-text-${article}`}>
                            <HeadlineText>{headline}</HeadlineText>
                        </Transition>
                    </View>
                </Transition>
                {articleData
                    .filter(el => el.type === 0)
                    .map((el, index) => (
                        <View style={styles.block} key={index}>
                            <Text>{el.textTypeData.html}</Text>
                        </View>
                    ))}
            </View>
        </ScrollView>
    )
}

ArticleScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('article', 'NO-ID'),
})
