import { FrontCardAppearance } from './collection/card-layouts'
export * from './collection/card-layouts'
export * from './collection/layout-model'
export * from './collection/layouts'
export * from './collection/thumbnails'
export * from './helpers/sizes'

export interface WithKey {
    key: string
}

export const articlePillars = [
    'news',
    'opinion',
    'sport',
    'culture',
    'lifestyle',
    'neutral',
] as const

export enum ArticleType {
    Article = 'article',
    Longread = 'longread',
    Review = 'review',
    Opinion = 'opinion',
    Series = 'series',
    Interview = 'interview',
    Analysis = 'analysis',
    Obituary = 'obituary',
    MatchResult = 'matchresult',
    Letter = 'letter',
    Recipe = 'recipe',
    Gallery = 'gallery',
    Feature = 'feature',
    Immersive = 'immersive',
    Showcase = 'showcase',
}

export enum HeaderType {
    NoByline = 'nobyline',
    LargeByline = 'largebyline',
    RegularByline = 'regularbyline',
}
export type ArticlePillar = typeof articlePillars[number]

export interface ColorAppearance {
    type: 'custom'
    color: string
}
export interface PillarAppearance {
    type: 'pillar'
    name: ArticlePillar
}

export type Appearance = PillarAppearance | ColorAppearance

export interface Card {
    appearance: FrontCardAppearance | null
    articles: { [key: string]: CAPIArticle }
}

export interface Temperature {
    Value: number
    Unit: string
    UnitType: number
}

export interface Forecast {
    DateTime: string
    EpochDateTime: number
    WeatherIcon: number
    IconPhrase: string
    HasPrecipitation: false
    IsDaylight: true
    Temperature: Temperature
    PrecipitationProbability: number
    MobileLink: string
    Link: string
    PrecipitationIntensity: unknown
    PrecipitationType: unknown
}

interface AccuWeatherRegion {
    ID: string
    LocalizedName: string
    EnglishName: string
}

type AccuWeatherAdminArea = AccuWeatherRegion & {
    Level: number
    LocalizedType: string
    EnglishType: string
    CountryID: string
}

interface AccuweatherSupplementalAdminArea {
    Level: number
    LocalizedName: string
    EnglishName: string
}

interface AccuWeatherTimezone {
    Code: string
    Name: string
    GmtOffset: number
    IsDaylightSaving: boolean
    NextOffsetChange: string
}

interface AccuWeatherMeasurement {
    Value: number
    Unit: string
    UnitType: number
}

interface AccuWeatherElevation {
    Metric: AccuWeatherMeasurement
    Imperial: AccuWeatherMeasurement
}

interface AccuWeatherGeoPosition {
    Latitude: number
    Longitude: number
    Elevation: AccuWeatherElevation
}

export interface AccuWeatherLocation {
    Version: number
    Key: string
    Type: string
    Rank: number
    LocalizedName: string
    EnglishName: string
    PrimaryPostalCode: string
    Region: AccuWeatherRegion
    Country: AccuWeatherRegion
    AdministrativeArea: AccuWeatherAdminArea
    TimeZone: AccuWeatherTimezone
    GeoPosition: AccuWeatherGeoPosition
    IsAlias: boolean
    SupplementalAdminAreas: AccuweatherSupplementalAdminArea[]
    DataSets: string[]
}

export interface WeatherForecast {
    locationName: string
    forecasts: Forecast[]
}

export type MediaType =
    | 'UseArticleTrail'
    | 'Hide'
    | 'Cutout'
    | 'Slideshow'
    | 'Image'
    | 'coverCard'

export interface Content extends WithKey {
    type: string
    headline: string
    kicker: string
    articleType?: ArticleType
    headerType?: HeaderType
    trail: string
    image?: CreditedImage
    trailImage?: TrailImage
    cardImage?: Image
    cardImageTablet?: Image
    standfirst?: string
    byline?: string
    bylineHtml?: string
    bylineImages?: { cutout?: Image }
    showByline: boolean
    showQuotedHeadline: boolean
    mediaType: MediaType
    sportScore?: string
    isFromPrint: boolean
    webUrl?: string
    displayHint?: string
    internalPageCode: number
}
export interface Article extends Content {
    type: 'article'
    byline: string
    bylineHtml: string
    standfirst: string
    elements: BlockElement[]
    starRating?: number
    sportScore?: string
    mainMedia?: MediaAtomElement
    displayHint?: string
}

export interface CrosswordArticle extends Content {
    type: 'crossword'
    crossword: Crossword
}

export interface GalleryArticle extends Content {
    type: 'gallery'
    elements: BlockElement[]
}

export interface PictureArticle extends Content {
    type: 'picture'
    elements: BlockElement[]
}

export type CAPIArticle =
    | Article
    | CrosswordArticle
    | GalleryArticle
    | PictureArticle
export const imageSizes = ['phone', 'tablet', 'tabletL', 'tabletXL'] as const
export type ImageSize = typeof imageSizes[number]

export const sizeDescriptions: { [k in ImageSize]: number } = {
    phone: 375,
    tablet: 740,
    tabletL: 980,
    tabletXL: 1140,
}

export type EditionId = string

// NOTE this list is incomplete and should not be relied on for
// a complete list of editions - instead use the API/editions endpoint
export const editions = {
    daily: 'daily-edition' as EditionId,
    ausWeekly: 'australian-edition' as EditionId,
    usWeekly: 'american-edition' as EditionId,
    dummy: 'the-dummy-edition' as EditionId,
    training: 'training-edition' as EditionId,
}

export const imageUseSizes: {
    [u in ImageUse]: { [k in ImageSize]: number }
} = /*
Don't really want to run this all the time, so it's calculated below.
{
    'full-size': sizeDescriptions,
    'not-used': { phone: 0, tablet: 0, tabletL: 0, tabletXL: 0 },
    thumb: {
        phone: Math.ceil(sizeDescriptions.phone * 0.42),
        tablet: Math.ceil(sizeDescriptions.tablet * 0.25),
        tabletL: Math.ceil(sizeDescriptions.tabletL * 0.25),
        tabletXL: Math.ceil(sizeDescriptions.tabletXL * 0.25),
    },
    'thumb-large': {
        phone: Math.ceil(sizeDescriptions.phone * 0.6),
        tablet: Math.ceil(sizeDescriptions.tablet * 0.52),
        tabletL: Math.ceil(sizeDescriptions.tabletL * 0.52),
        tabletXL: Math.ceil(sizeDescriptions.tabletXL * 0.53),
    },
}*/ {
    'full-size': { phone: 375, tablet: 740, tabletL: 980, tabletXL: 1140 },
    'not-used': { phone: 0, tablet: 0, tabletL: 0, tabletXL: 0 },
    thumb: { phone: 158, tablet: 185, tabletL: 245, tabletXL: 285 },
    'thumb-large': { phone: 225, tablet: 385, tabletL: 510, tabletXL: 605 },
}

export interface RenderedArticle {
    success: boolean
    message: string
    internalPageCode: number
    body: string
}
export interface IssueIdentifier {
    edition: EditionId
    issueDate: string
}

export interface IssuePublicationIdentifier extends IssueIdentifier {
    version: string
}

export interface IssuePublicationActionIdentifier
    extends IssuePublicationIdentifier {
    action: string
    topic: string
    notificationUTCOffset: number
}

export interface EditionListPublicationAction {
    action: string
    content: object
}

export interface IssueSummary extends WithKey, IssueCompositeKey {
    name: string
    date: string
    assets?: {
        [P in ImageSize]?: string
    } & { data: string }
    assetsSSR?: {
        [P in ImageSize]?: string
    } & { html: string } & { data: string }
}

export interface Issue extends IssueSummary, WithKey {
    fronts: Front['key'][]
}

export type IssueOrigin = 'filesystem' | 'api'

export interface IssueWithFronts extends IssueSummary, WithKey {
    fronts: Front[]
    origin: IssueOrigin
}

export interface Collection extends WithKey {
    cards: Card[]
}

export type Front = WithKey & {
    collections: Collection[]
    displayName?: string
    canonical?: string
    group?: string
    isHidden?: boolean
    isImageDisplayed?: boolean
    imageHeight?: number
    imageWidth?: number
    imageUrl?: string
    onPageDescription?: string
    description?: string
    title?: string
    webTitle?: string
    navSection?: string
    appearance: Appearance
}

export interface UnknownElement {
    id: 'unknown'
}
export interface HTMLElement {
    id: 'html'
    html: string
    hasDropCap?: boolean
}

type ImageRoles = 'supporting' | 'immersive' | 'showcase' | 'thumbnail' | string

export interface ImageElement {
    id: 'image'
    src: Image
    alt?: string
    caption?: string
    copyright?: string
    credit?: string
    displayCredit?: boolean
    role?: ImageRoles
}
export interface TweetElement {
    id: 'tweet'
    url: string
    html: string
}
export interface PullquoteElement {
    id: 'pullquote'
    html: string
    role?: string
    attribution?: string
}

export interface AtomElement {
    id: 'atom'
    atomType: string
    atomId: string
    html?: string
    css?: string[]
    js?: string[]
}

export interface MediaAtomElement {
    id: 'media-atom'
    atomId: string
    image?: Image
    html?: string
    platform?: 'youtube' | 'dailymotion' | 'mainstream' | 'url'
    assetId?: string
    title?: string
}

export type BlockElement =
    | HTMLElement
    | ImageElement
    | UnknownElement
    | TweetElement
    | AtomElement
    | MediaAtomElement
    | PullquoteElement

export interface CrosswordDimensions {
    cols: number
    rows: number
}

export interface CrosswordPosition {
    x: number
    y: number
}

export interface CrosswordCreator {
    name: string
    webUrl: string
}

export interface CrosswordEntry {
    id: string
    number?: number
    humanNumber?: string
    direction?: string
    position?: CrosswordPosition
    separatorLocations?: { [key: string]: number[] }
    length?: number
    clue?: string
    group?: string[]
    solution?: string
    format?: string
}

export enum CrosswordType {
    QUICK = 'quick',
    CRYPTIC = 'cryptic',
    QUIPTIC = 'quiptic',
    SPEEDY = 'speedy',
    PRIZE = 'prize',
    EVERYMAN = 'everyman',
    DIAN_QUIPTIC_CROSSWORD = 'quiptic-dian',
    WEEKEND = 'weekend',
}

export interface CapiDateTime {
    dateTime: number
    iso8601: string
}

export interface Crossword {
    name: string
    type: CrosswordType //NOTE: this is a number as it comes from the capi thrift enum
    number: number
    date: CapiDateTime
    dimensions: CrosswordDimensions
    entries: CrosswordEntry[]
    solutionAvailable: boolean
    hasNumbers: boolean
    randomCluesOrdering: boolean
    instructions?: string
    creator?: CrosswordCreator
    pdf?: string
    annotatedSolution?: string
    dateSolutionAvailable?: CapiDateTime
}
export interface IssueCompositeKey {
    publishedId: string
    localId: string
}

export const issueDir = (issueId: string) => {
    return issueId
}

export const issuePath = (issue: string) => `${issueDir(issue)}/issue`

export const frontPath = (issue: string, frontId: string) =>
    `${issueDir(issue)}/front/${frontId}`

export const htmlDirPath = (issue: string) => `${issueDir(issue)}/html`

export const htmlRootPath = (issue: string) => `${issueDir(issue)}/html`

export const htmlPath = (issue: string, internalPageCode: number) =>
    `${htmlRootPath(issue)}/${internalPageCode}.html`

export const mediaDir = (issue: string, size?: ImageSize) => {
    // `size` only used to contstruct web url
    if (size) {
        return `${issueDir(issue)}/media/${size}/` // used by old articles and its clients
    } else {
        return `${issueDir(issue)}/media/images/` // used by SSR
    }
}

export const mediaPath = (
    issue: string,
    { source, path }: Image,
    size?: ImageSize,
) => `${mediaDir(issue, size)}${source}/${path}`

export const issueSummaryPath = (edition: string) => `${edition}/issues`
export interface Image {
    source: string
    path: string
    role?: ImageRole
}

export const imageThumbnailUses = ['thumb', 'thumb-large', 'not-used'] as const
export const imageUses = [...imageThumbnailUses, 'full-size'] as const

export type ImageThumbnailUse = typeof imageThumbnailUses[number]
export type ImageUse = typeof imageUses[number]

/**
 * Note that not all of these roles are respected by this project - they are here for completeness.
 * This list may need to change based off composer changes - currently the full list can be found here:
 * https://github.com/guardian/flexible-content/blob/2b6c563e7649ccaaba22a178df868f9a274aded4/composer/src/js/controllers/content/common/body-block/elements/edit.js#L269
 */
export const imageRoles = [
    'showcase',
    'immersive',
    'inline',
    'thumbnail',
    'supporting',
    'halfWidth',
] as const
export type ImageRole = typeof imageRoles[number]
export interface ImageDeviceUses {
    mobile: ImageUse
    tablet: ImageUse
}
export interface TrailImage extends Image {
    use: ImageDeviceUses
}

export const thumbsDir = (issue: string, size?: ImageSize) => {
    // `size` only used to contstruct web url
    if (size) {
        return `${issueDir(issue)}/thumbs/${size}/`
    } else {
        return `${issueDir(issue)}/thumbs/images/`
    }
}

export const thumbsPath = (
    issue: string,
    image: Image,
    use: ImageThumbnailUse,
    size?: ImageSize,
) => `${thumbsDir(issue, size)}${use}/${image.source}/${image.path}`

export const getImageQueryString = (image: Image) =>
    image.role ? `?role=${image.role}` : ''

export const imagePath = (
    issue: string,
    image: Image,
    use: ImageUse = 'full-size',
    size?: ImageSize,
) => {
    const baseUrl =
        use == 'full-size'
            ? mediaPath(issue, image, size)
            : thumbsPath(issue, image, use, size)
    return `${baseUrl}${getImageQueryString(image)}`
}

export interface CreditedImage extends Image {
    credit?: string
    caption?: string
    displayCredit?: boolean
}
export interface Palette {
    //the palette from node-vibrant
    Vibrant?: string
    Muted?: string
    DarkVibrant?: string
    DarkMuted?: string
    LightVibrant?: string
    LightMuted?: string
}

export const notNull = <T>(value: T | null | undefined): value is T =>
    value !== null && value !== undefined

export type TextFormatting = {
    color: string
    font: string
    lineHeight: number
    size: number
}

export interface SpecialEditionButtonStyles {
    backgroundColor: string
    title: TextFormatting
    subTitle: TextFormatting
    expiry: TextFormatting
    image: { width: number; height: number }
}

export interface SpecialEditionHeaderStyles {
    backgroundColor: string
    textColorPrimary?: string
    textColorSecondary?: string
}

export interface EditionsList {
    regionalEditions: RegionalEdition[]
    specialEditions: SpecialEdition[]
    trainingEditions: TrainingEdition[]
}

export type Locale = 'en_GB' | 'en_AU'

export interface EditionInterface {
    title: string
    subTitle: string
    edition: EditionId
    header: {
        title: string
        subTitle?: string
    }
    editionType: 'Regional' | 'Training' | 'Special'
    notificationUTCOffset: number
    topic: string
}

// disabling tslint here as  it's useful to give this types a different name
// and in future Regional/Training editions may have unique properties

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegionalEdition extends EditionInterface {
    locale: Locale
}

// disabling tslint here as  it's useful to give this types a different name
// and in future Regional/Training editions may have unique properties

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TrainingEdition extends EditionInterface {}

export interface SpecialEdition extends EditionInterface {
    buttonStyle: SpecialEditionButtonStyles
    buttonImageUri: string
    expiry: string // ISO string e.g. 2020-11-07T23:59:00.000Z
    headerStyle?: SpecialEditionHeaderStyles
}
