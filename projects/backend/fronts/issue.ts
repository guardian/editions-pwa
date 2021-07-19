import { MediaType, TrailImage } from '../common'

export interface PublishedIssue {
    id: string
    name: string
    fronts: PublishedFront[]
    issueDate: string
}
export type Swatch =
    | 'neutral'
    | 'news'
    | 'opinion'
    | 'culture'
    | 'lifestyle'
    | 'sport'
export interface PublishedFront {
    id: string
    name: string
    collections: PublishedCollection[]
    swatch: Swatch
}
export interface PublishedCollection {
    id: string
    name: string
    items: PublishedArticle[]
}
export interface PublishedArticle {
    internalPageCode: number
    furniture: PublishedFurniture
}
export interface PublishedImage {
    height: number
    width: number
    src: string
}
export interface PublishedFurniture {
    kicker?: string
    headlineOverride?: string
    trailTextOverride?: string
    bylineOverride?: string
    showByline: boolean
    showQuotedHeadline: boolean
    mediaType: MediaType
    imageSrcOverride?: PublishedImage
    trailImage: TrailImage | undefined
    sportScore?: string
    overrideArticleMainMedia: boolean
    coverCardImages?: PublishedCardImage
}

export interface PublishedCardImage {
    mobile: PublishedImage
    tablet: PublishedImage
}

export enum Theme {
    News = 0,
    Opinion = 1,
    Sport = 2,
    Culture = 3,
    Lifestyle = 4,
    SpecialReport = 5,
    Labs = 6,
}
