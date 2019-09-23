import { Image, Article, ArticleType } from '../../../common'

export interface ArticleHeaderProps {
    byline: string
    headline: string
    kicker?: string | null
    image?: Image | null
    standfirst: string
    starRating?: Article['starRating']
    bylineImages?: { cutout?: Image }
}
