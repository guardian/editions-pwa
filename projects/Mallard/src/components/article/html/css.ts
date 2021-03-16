import {
	css,
	generateAssetsFontCss,
	getScaledFontCss,
	px,
} from 'src/helpers/webview';
import { metrics } from 'src/theme/spacing';
import { families, getScaledFont } from 'src/theme/typography';
import { headerStyles } from './components/header';
import { imageStyles } from './components/images';
import { lineStyles } from './components/line';
import { quoteStyles } from './components/pull-quote';
import { starRatingStyles } from './components/rating';
import { sportScoreStyles } from './components/sport-score';
import { CssProps, themeColors } from './helpers/css';
import { Breakpoints } from 'src/theme/breakpoints';
import { mediaAtomStyles } from './components/media-atoms';
import { ArticleType } from 'src/common';
import { twitterEmbedStyles } from './components/twitter-embed';
import { listStyles } from './components/lists';
import { Platform } from 'react-native';

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
`;

const dropCapFontSizeMultiplier = Platform.OS === 'ios' ? 5.25 : 5.75;
const dropCapLineHeightMultiplier = Platform.OS === 'ios' ? 4.1 : 4.6;

const makeCss = ({ colors, theme }: CssProps) => css`
	${makeFontsCss()}

	:root {
		${getScaledFontCss('text', 1)}
		font-family: ${families.text.regular};
		background-color: ${themeColors(theme).background};
		color: ${themeColors(theme).text};
	}

	html,
	body {
		overflow-x: hidden;
	}
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.drop-cap p:first-child:first-letter {
		font-family: ${families.titlepiece.regular};
		color: ${colors.main};
		float: left;
		font-size: ${px(
			getScaledFont('text', 1).lineHeight * dropCapFontSizeMultiplier,
		)};
		line-height: ${px(
			getScaledFont('text', 1).lineHeight * dropCapLineHeightMultiplier,
		)};
		display: inline-block;
		font-variant: normal;
		font-weight: normal;
		font-style: normal;
		padding-right: 10px;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.app {
		padding: 0 ${metrics.article.sides} ${px(metrics.vertical)};
		position: relative;
		animation-duration: 0.5s;
		animation-name: fade;
		animation-fill-mode: both;
	}
	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		main,
		.wrapper {
			margin-right: ${px(
				metrics.article.rightRail + metrics.article.sides,
			)};
		}
	}
	.app p,
	figure {
		margin-bottom: ${px(metrics.vertical * 2)};
	}
	.app a {
		color: ${theme == 'dark' ? colors.bright : colors.main};
		text-decoration-color: ${theme == 'dark'
			? colors.bright
			: colors.pastel};
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
		font-size: 20px;
		line-height: 20px;
		margin-bottom: 2px;
		font-weight: bold;
		color: ${colors.main};
		font-family: ${families.text.bold};
	}

	.app[data-type='${ArticleType.Immersive}'] h2 {
		font-size: 24px;
		line-height: 24px;
		color: #000000;
		font-weight: normal;
		font-family: ${families.headline.light};
	}

	.app[data-type='${ArticleType.Immersive}'] h2 > strong {
		font-family: ${families.headline.bold};
	}

	.app h2 > strong {
		color: ${colors.main};
		font-weight: bold;
		font-family: ${families.text.bold};
	}

	@media (min-width: ${px(Breakpoints.phone)}) {
		.app[data-type='${ArticleType.Immersive}'] h2 {
			font-size: 28px;
			line-height: 28px;
		}

		.app h2 {
			font-size: 24px;
			line-height: 24px;
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

	${listStyles(colors)}

	${quoteStyles({
		colors,
		theme,
	})}
    ${headerStyles({
		colors,
		theme,
	})}
    ${imageStyles({ colors, theme })}
    ${lineStyles({ colors, theme })}
    ${starRatingStyles({ colors, theme })}
    ${sportScoreStyles({ colors, theme })}
    ${mediaAtomStyles}
    ${twitterEmbedStyles}
`;

export { makeCss };
