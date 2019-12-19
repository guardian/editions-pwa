import { CAPIArticle, Image } from '../../../../common'
import { getImagesFromArticle } from '../../../../src/tasks/front/helpers/media'

test('getImage', () => {
    const image = {
        source: 'test',
        path: 'image',
    }
    const article: CAPIArticle = {
        key: '🔑',
        type: 'article',
        headline: '🗣',
        showByline: false,
        byline: '🧬',
        bylineHtml: '<a>🧬</a> Senior person',
        standfirst: '🥇',
        kicker: '🥾',
        trail: '🛣',
        image: image,
        showQuotedHeadline: false,
        mediaType: 'Image',
        elements: [],
        isFromPrint: true,
    }
    expect(getImagesFromArticle(article)).toContain(image)
})

test('getImageUse', () => {
    const image: Image = {
        source: 'test',
        path: 'image',
        // use: { mobile: 'full-size', tablet: 'thumb' },
    }
    const article: CAPIArticle = {
        key: '🔑',
        type: 'article',
        headline: '🗣',
        showByline: false,
        byline: '🧬',
        standfirst: '🥇',
        kicker: '🥾',
        trail: '🛣',
        trailImage: image,
        showQuotedHeadline: false,
        mediaType: 'Image',
        elements: [],
        isFromPrint: false,
        bylineHtml: '<a>🧬</a> Senior person',
    }
    expect(getImagesFromArticle(article)).toContain(image)
})
