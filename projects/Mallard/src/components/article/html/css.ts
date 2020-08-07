import {
    css,
    generateAssetsFontCss,
    getScaledFontCss,
    px,
} from 'src/helpers/webview'
import { metrics } from 'src/theme/spacing'
import { families, getScaledFont } from 'src/theme/typography'
import { headerStyles } from './components/header'
import { imageStyles } from './components/images'
import { lineStyles } from './components/line'
import { quoteStyles } from './components/pull-quote'
import { starRatingStyles } from './components/rating'
import { sportScoreStyles } from './components/sport-score'
import { CssProps, themeColors } from './helpers/css'
import { Breakpoints } from 'src/theme/breakpoints'
import { mediaAtomStyles } from './components/media-atoms'
import { ArticleType } from '../../../../../Apps/common/src'
import { twitterEmbedStyles } from './components/twitter-embed'

const makeFontsCss = () => css`
    /* text */
    ${generateAssetsFontCss({ fontFamily: families.text.regular })}
    ${generateAssetsFontCss({
        fontFamily: families.text.bold,
        variant: {
            showsAsFamily: families.text.regular,
            weight: 700,
            style: 'normal',
        },
    })}
    ${generateAssetsFontCss({
        fontFamily: families.text.regularItalic,
        variant: {
            showsAsFamily: families.text.regular,
            weight: 400,
            style: 'italic',
        },
    })}

    /*headline*/
    ${generateAssetsFontCss({ fontFamily: families.headline.regular })}
    ${generateAssetsFontCss({
        fontFamily: families.headline.light,
        variant: {
            showsAsFamily: families.headline.regular,
            weight: 200,
            style: 'normal',
        },
    })}
    ${generateAssetsFontCss({
        fontFamily: families.headline.bold,
        variant: {
            showsAsFamily: families.headline.regular,
            weight: 700,
            style: 'normal',
        },
    })}
    ${generateAssetsFontCss({
        fontFamily: families.headline.medium,
        variant: {
            showsAsFamily: families.headline.regular,
            weight: 500,
            style: 'normal',
        },
    })}

    /* other fonts */
    ${generateAssetsFontCss({ fontFamily: families.sans.regular })}
    ${generateAssetsFontCss({ fontFamily: families.titlepiece.regular })}
    ${generateAssetsFontCss({
        fontFamily: families.icon.regular,
        extension: 'otf',
    })}
`

const makeCss = ({ colors, theme }: CssProps, contentType: ArticleType) => css`
    ${makeFontsCss()}

    :root {
        ${getScaledFontCss('text', 1)}
        font-family: ${families.text.regular};
        background-color: ${themeColors(theme).background};
        color: ${themeColors(theme).text};
    }

    html, body {
        overflow-x: hidden;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .drop-cap p:first-child:first-letter {
        font-family: 'GHGuardianHeadline-Regular';
        color: ${colors.main};
        float: left;
        font-size: ${px(getScaledFont('text', 1).lineHeight * 4)};
        line-height: ${px(getScaledFont('text', 1).lineHeight * 4)};
        display: inline-block;
        transform: scale(1.335) translateY(1px) translateX(-2px);
        transform-origin: left center;
        margin-right: 25px;
    }

    @keyframes fade {
        from {
            opacity: 0
        }

        to {
            opacity: 1;
        }
    }

    .app {
        padding: 0 ${metrics.article.sides} ${px(metrics.vertical)};
        position: relative;
        animation-duration: .5s;
        animation-name: fade;
        animation-fill-mode: both;
    }
    @media (min-width: ${px(Breakpoints.tabletVertical)}) {
        main, .wrapper {
            margin-right: ${px(
                metrics.article.rightRail + metrics.article.sides,
            )}
        }
    }
    .app p,
    figure {
        margin-bottom: ${px(metrics.vertical * 2)};
    }
    .app a {
        color: ${theme == 'dark' ? colors.bright : colors.main};
        text-decoration-color: ${
            theme == 'dark' ? colors.bright : colors.pastel
        };
    }
    * {
        margin: 0;
        padding: 0;
    }
    .app p {
      line-height: 1.4;
      margin-bottom: 15px;
    }
    
    .app h2 {
        font-size: ${contentType === 'immersive' ? '24px' : '20px'};
        line-height: ${contentType === 'immersive' ? '24px' : '20px'};
        margin-bottom: 2px;
        font-weight: ${contentType === 'immersive' ? 'normal' : 'bold'};
        color: ${
            contentType === ArticleType.Immersive ? '#000000' : colors.main
        };
        font-family: ${
            contentType === ArticleType.Immersive
                ? families.headline.light
                : families.text.bold
        };
    }

    .app h2 > strong { 
        color: ${
            contentType === ArticleType.Immersive ? colors.main : '#000000'
        };
        font-weight: 'bold';
        font-family: ${
            contentType === ArticleType.Immersive
                ? families.headline.bold
                : families.text.bold
        };
      }

      @media (min-width: ${px(Breakpoints.phone)}) {
        .app h2 {
            font-size: ${contentType === 'immersive' ? '28px' : '24px'};
            line-height: ${contentType === 'immersive' ? '28px' : '24px'};

        }
    }

    
    .content-wrap {
        max-width: ${px(metrics.article.maxWidth + metrics.article.sides * 2)};
        margin: auto;
        position: relative;
        padding-top: ${px(metrics.vertical)};
    }
    @media (min-width: ${px(Breakpoints.tabletVertical)}) {
        .content-wrap {
            padding-left: ${px(metrics.article.sides)};
            padding-right: ${px(metrics.article.sides)};

        }
    }

    ${quoteStyles({
        colors,
        theme,
    })}
    ${headerStyles({
        colors,
        theme,
    })}
    ${imageStyles({ colors, theme }, contentType)}
    ${lineStyles({ colors, theme })}
    ${starRatingStyles({ colors, theme })}
    ${sportScoreStyles({ colors, theme })}
    ${mediaAtomStyles}
    ${twitterEmbedStyles}
`

export { makeCss }
