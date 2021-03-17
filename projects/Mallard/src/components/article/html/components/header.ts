import { palette } from '@guardian/pasteup/palette';
import { Dimensions, Platform } from 'react-native';
import type { Image as ImageT, Issue } from 'src/common';
import { ArticleType, HeaderType } from 'src/common';
import { getPillarColors } from 'src/helpers/transform';
import { css, html, px } from 'src/helpers/webview';
import type { GetImagePath } from 'src/hooks/use-image-paths';
import { Breakpoints } from 'src/theme/breakpoints';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { families } from 'src/theme/typography';
import type {
	Article,
	ArticlePillar,
	CreditedImage,
	MediaAtomElement,
} from '../../../../../../Apps/common/src';
import type { CssProps } from '../helpers/css';
import { themeColors } from '../helpers/css';
import { breakSides } from '../helpers/layout';
import { getHeadline } from './headline';
import { getByLineText } from './helpers/getBylineText';
import { Line } from './line';
import { renderMediaAtom } from './media-atoms';
import { Rating } from './rating';
import { SportScore } from './sport-score';

export interface ArticleHeaderProps {
	headline: string;
	byline?: string;
	kicker?: string | null;
	image?: CreditedImage | null;
	standfirst?: string;
	starRating?: Article['starRating'];
	sportScore?: Article['sportScore'];
	bylineImages?: { cutout?: ImageT };
	bylineHtml?: string;
	mainMedia?: MediaAtomElement;
}

const outieKicker = (type: ArticleType) => css`
	.header-container[data-type='${type}'] .header-kicker {
		display: inline-block;
		height: 1.7em;
		margin-top: -1.7em;
		padding-right: ${metrics.article.sides};
		margin-left: -20em;
		padding-left: 20.5em;
		border: none;
		z-index: 9;
	}
	.header-container[data-type='${type}'] .header {
		position: relative;
		z-index: 9;
	}
`;

const outieHeader = (type: ArticleType) => css`
	.header-container[data-type='${type}'] .header {
		${breakSides}
		margin-top: -4em;
		padding-top: 0;
		margin-left: -50em;
		padding-left: 50em;
	}
	.header-container[data-type='${type}'] {
		padding-top: 1px;
	}
	@media (max-width: ${px(Breakpoints.tabletVertical)}) {
		.header-container[data-type='${type}'] .header {
			margin-right: 60px;
		}
		.header-container[data-type='${type}'] .header:after {
			margin-right: ${px((60 + metrics.article.sides) * -1)};
		}
	}
	${outieKicker(type)}
`;

const shareButtonColor = ({ colors, theme }: CssProps) => {
	return theme === 'dark' ? color.palette.neutral[100] : colors.main;
};

const threeLines = `
    background-image: repeating-linear-gradient(
        to bottom,
        ${color.dimLine},
        ${color.dimLine} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: bottom;
    background-size: 1px 16px;
    content: '';
    display: block;
    height: 16px;
    margin: 0;
`;

export const headerStyles = ({ colors, theme }: CssProps) => css`
	/* prevent clicks on byline links */
	.header a {
		pointer-events: none;
	}
	.header:after,
	.header-immersive-video:after {
		${threeLines}
	}
	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.header:after,
		.header-immersive-video:after {
			margin-right: ${px(metrics.article.sides * -1)};
		}
	}
	.header {
		padding-top: ${px(metrics.vertical / 2)};
	}
	.header-container-line-wrap,
	.header-container {
		position: relative;
		-webkit-user-select: none;
		-webkit-user-drag: none;
	}
	.header-container-line-wrap {
		z-index: 100;
		max-width: ${px(metrics.article.maxWidth + metrics.article.sides * 2)};
		margin: auto;
	}
	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.header-container-line-wrap {
			padding-left: ${px(metrics.article.sides)};
			padding-right: ${px(metrics.article.sides)};
		}
	}

	.header-bg {
		left: -50em;
		right: -50em;
		top: 0;
		bottom: 0;
		position: absolute;
		z-index: -1;
	}
	.header-image--wide {
		max-width: ${px(metrics.article.maxWidth)};
		margin: auto;
	}

	.header-image--standard > .rating,
	.sport-score {
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.header-image--wide > .rating,
	.sport-score {
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.header-image--immersive {
		width: 100%;
		object-fit: cover;
		display: block;
		z-index: 99;
		position: relative;
		margin: 0 ${px(metrics.article.sides * -1)};
		width: calc(100% + ${px(metrics.article.sides * 2)});
		padding-top: 100%;
	}

	@media (min-width: ${px(Breakpoints.tabletLandscape)}) {
		.header-image--immersive {
			padding-top: 59.6%;
		}
	}

	@media (max-width: ${px(Breakpoints.tabletVertical)}) {
		.header-image--immersive {
			padding-top: 167%;
			height: 65%;
		}
	}

	.header-kicker {
		font-family: ${families.titlepiece.regular};
		font-size: 16px;
		line-height: 1;
		color: ${colors.main};
		padding: 0.25em 0 0.8em;
		border-bottom: 1px solid ${color.dimLine};
		display: block;
	}

	.header h1,
	.header-immersive-video h1 {
		font-size: 30px;
		font-family: ${families.headline.regular};
		font-weight: 400;
		line-height: 1.125em;
		margin: 0.1em 1em 0.75em 0;
		word-wrap: none;
	}

	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.header h1 {
			font-size: 40px;
		}
	}

	.header h1 svg {
		height: 0.7em;
		transform: scale(1.1);
		width: auto;
		fill: ${colors.main};
	}

	.header-standfirst-color {
		font-weight: 600;
		color: ${colors.main};
	}

	.header-standfirst {
		font-weight: 600;
		color: ${color.palette.neutral[46]};
	}

	.header-byline {
		font-size: 16px;
		line-height: 1.25em;
		margin: 0;
	}

	.header-byline-italic {
		font-style: italic;
	}

	.header-byline:not(:empty) {
		padding: 0.25em 0 1.5em;
		position: relative;
	}

	.header-byline > span > a {
		font-style: normal !important;
		text-decoration: none;
		font-weight: 600;
		color: ${colors.main};
	}

	.header-top-byline > a {
		font-style: normal !important;
		text-decoration: none;
	}

	.header-byline:not(:empty):after {
		content: '';
		display: block;
		height: 1px;
		background-color: ${color.dimLine};
		position: absolute;
		bottom: -1px;
		left: ${px(metrics.article.sides * -1)};
		right: ${px(metrics.article.sides * -1)};
	}

	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.header-byline:not(:empty):after {
			left: 0;
		}
	}

	.header-top p,
	.header-immersive-video p {
		font-family: ${families.headline.medium};
		letter-spacing: 0.2px;
		line-height: 1.1875em;
		margin-bottom: 0.875em;
		font-size: 18px;
	}
	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.header-top p,
		.header-immersive-video p {
			font-size: 18px;
		}
	}

	.header-container:after {
		content: '';
		display: block;
		height: 0;
		margin: 0 -50em;
	}
	.header-opinion-flex {
		display: flex;
		align-items: flex-end;
	}

	.header-opinion-flex > :first-child {
		flex: 1 1 0;
	}

	.header-opinion-flex > :last-child {
		width: 15%;
		overflow: visible;
		flex: 0 0 auto;
	}

	.header-opinion-flex > :last-child img {
		width: 240%;
		display: block;
		float: right;
	}

	.image-as-bg {
		display: block;
		padding-top: 59.6%;
		background-size: cover;
		background-position: center;
		position: relative;
	}

	.image-as-bg[data-preserve-ratio='true'] {
		padding-top: 0;
		overflow: visible;
		height: auto;
	}

	.image-as-bg__img {
		width: 100%;
		z-index: 0;
		position: relative;
	}

	.image-as-bg-info {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		padding: ${px(metrics.vertical)} ${px(metrics.horizontal)};
		color: ${color.palette.neutral[100]};
		background: rgba(20, 20, 20, 0.8);
		font-family: ${families.sans.regular};
		z-index: 1;
		display: none;
	}

	.image-as-bg[data-open='true'] .image-as-bg-info {
		display: block;
	}

	.image-as-bg > button {
		position: absolute;
		bottom: ${px(metrics.vertical)};
		right: ${px(metrics.horizontal)};
		z-index: 2;
		font-family: ${families.icon.regular};
		background-color: ${colors.main};
		color: ${color.textOverDarkBackground};
		border: none;
		width: ${metrics.fronts.circleButtonDiameter}px;
		height: ${metrics.fronts.circleButtonDiameter}px;
		display: block;
		line-height: 0.9;
		text-align: center;
		font-size: 1.2em;
		border-radius: 100%;
	}

	button:focus {
		outline: 0;
		outline-style: none;
		outline-width: 0;
	}

	.display-none {
		display: none;
	}

	.share-touch-zone {
		float: right;
		margin: -8px -8px 0 0;
		padding: 8px;
		background: none;
		border: none;
		font-family: ${families.icon.regular};
		font-size: 1.2em;
	}
	.share-button {
		display: flex;
		width: ${metrics.fronts.circleButtonDiameter}px;
		height: ${metrics.fronts.circleButtonDiameter}px;
		border: 1px solid ${shareButtonColor({ theme, colors })};
		color: ${shareButtonColor({ theme, colors })};
		border-radius: 100%;
		align-items: center;
		justify-content: center;
	}
	.share-icon {
		padding-bottom: 0.1em;
		color: ${shareButtonColor({ theme, colors })};
	}

	.clearfix {
		clear: both;
	}

	/*review*/
	.header-container[data-type='review']:after {
		border-bottom: 1px solid ${color.dimLine};
	}
	.header-container[data-type='review'] .header-bg {
		background-color: ${colors.faded};
	}
	.header-image[data-type='review'] .header-bg {
		background-color: ${colors.faded};
	}
	.header-container[data-type='review'] h1 {
		color: ${colors.dark};
		font-family: ${families.headline.bold};
	}
	.header-container[data-type='review'] .header-kicker {
		color: ${colors.dark};
	}
	.header-container[data-type='review'] .header-byline a {
		color: ${colors.dark};
	}
	.header-container[data-type='review'] p {
		color: ${colors.dark};
	}

	/*opinion*/
	.header-container[data-type='opinion']:after {
		border-bottom: 1px solid ${color.dimLine};
	}
	.header-container[data-type='opinion'] .header-bg {
		background-color: ${color.palette.opinion.faded};
	}
	.header-image[data-type='opinion'] .header-bg {
		background-color: ${color.palette.opinion.faded};
	}
	.header-container[data-type='opinion'] .header-kicker {
		display: none;
	}
	.header-container[data-type='opinion'] .header-byline {
		color: ${color.palette.neutral[46]};
	}
	.header-container[data-type='opinion'] h1 {
		font-family: ${families.headline.light};
	}
	.header-container[data-type='opinion'] h1 .header-top-byline {
		color: ${colors.main};
		display: block;
		font-family: ${families.titlepiece.regular};
	}

	/*analysis*/
	.header-container[data-type='analysis']:after {
		border-bottom: 1px solid ${color.dimLine};
	}
	.header-container[data-type='analysis'] .header-bg {
		background-color: ${color.palette.neutral[93]};
	}
	.header-image[data-type='analysis'] .header-bg {
		background-color: ${color.palette.neutral[93]};
	}
	.header-container[data-type='analysis'] .header-kicker {
		display: none;
	}
	.header-container[data-type='analysis'] .header-byline {
		color: ${color.palette.neutral[46]};
	}
	.header-container[data-type='analysis'] h1 {
		font-family: ${families.headline.light};
	}
	.header-container[data-type='analysis'] h1 .header-top-headline {
		text-decoration: underline;
		text-decoration-color: ${colors.main};
		text-decoration-thickness: 1px;
	}
	.header-container[data-type='analysis'] h1 .header-top-byline {
		display: block;
		font-family: ${families.headline.regular};
		font-style: italic;
	}
	.header-container[data-type='analysis'] h1 .header-top-byline > a {
		font-family: ${families.titlepiece.regular};
		font-style: normal;
	}

	/*gallery*/
	.header-container[data-type='${ArticleType.Gallery}']
		.header-byline
		> span
		> a {
		color: ${themeColors(theme).text};
	}
	.header-container[data-type='${ArticleType.Gallery}'] h1 {
		font-family: ${families.titlepiece.regular};
		min-height: 2em;
	}

	/*immersive*/
	${outieHeader(ArticleType.Immersive)}
	.header-container[data-type='immersive'] .header-bg {
		background-color: ${color.palette.neutral[100]};
	}
	.header-image[data-type='immersive'] .header-bg {
		background-color: ${color.palette.neutral[100]};
	}
	.header-container[data-type='immersive'] .header {
		background-color: ${color.palette.neutral[100]};
	}
	.header-container[data-type='immersive'] .header-kicker {
		display: none;
	}

	.header-container[data-type='immersive'] .header-top h1 {
		font-family: ${families.titlepiece.regular};
		color: ${colors.dark};
	}
	.header-container[data-type='immersive'] .header-byline a {
		color: ${colors.dark};
	}

	/*longread*/
	${outieHeader(ArticleType.Longread)}
	.header-container[data-type='${ArticleType.Longread}'] {
		color: ${color.textOverDarkBackground};
	}
	.header-container[data-type='${ArticleType.Longread}'] .header-bg {
		background-color: ${color.palette.neutral[7]};
	}
	.header-image[data-type='${ArticleType.Longread}'] .header-bg {
		background-color: ${color.palette.neutral[7]};
	}
	.header-container[data-type='${ArticleType.Longread}'] .header {
		background-color: ${color.palette.neutral[7]};
	}
	.header-container[data-type='${ArticleType.Longread}'] .header-kicker {
		background-color: ${colors.main};
		color: ${color.textOverDarkBackground};
		font-family: ${families.headline.bold};
	}
	.header-container[data-type='${ArticleType.Longread}'] .header-top h1 {
		font-family: ${families.titlepiece.regular};
	}
	.header-container[data-type='${ArticleType.Longread}'] .header-byline,
	${'' /* this is needed to be more specific than an above style */}
		.header-container[data-type='${ArticleType.Longread}']
		.header-byline
		a {
		color: ${color.textOverDarkBackground};
	}

	/*interview*/
	.header-image--interview {
		width: 100%;
		object-fit: cover;
		display: block;
		z-index: 99;
		position: relative;
		margin: 0 ${px(metrics.article.sides * -1)};
		width: calc(100% + ${px(metrics.article.sides * 2)});
		padding-top: 59.6%;
	}

	@media (max-width: ${px(Breakpoints.tabletVertical)}) {
		${outieHeader(ArticleType.Interview)}
		.interview-tablet {
			display: none;
		}
		.app[data-type='${ArticleType.Interview}'] .content-wrap main {
			padding-left: 10px;
			padding-right: 10px;
		}

		.header-container[data-type='${ArticleType.Interview}']
			.header-byline
			button {
			margin-right: 10px;
		}

		.header-container[data-type='${ArticleType.Interview}']
			.header-byline
			span {
			padding-left: 10px;
		}

		.header-container[data-type='${ArticleType.Interview}'] .header-top p {
			padding-left: 10px;
			padding-right: 25px;
		}
	}

	.header-image--interview button {
		margin-right: 10px;
	}
	.header-image--interview .image-as-bg-info {
		padding: 15px 25px;
	}
	.header-container[data-type='${ArticleType.Interview}'] {
		color: ${color.textOverDarkBackground};
	}
	header-container-line-wrap
		.header-container[data-type='${ArticleType.Interview}']
		.wrapper {
		padding-top: 0px;
	}
	.header-container[data-type='${ArticleType.Interview}'] .header {
		background: ${colors.tint};
		margin-top: 0;
		margin-right: -50em;
		padding-right: 50em;
	}
	.header-container[data-type='${ArticleType.Interview}'] .header:after {
		background-color: white;
		background-image: none;
		background-size: 0px 0px;
		height: 0px;
		margin: 0;
	}
	.header-container[data-type='${ArticleType.Interview}'] .header h1 {
		padding-left: 10px;
	}
	.header-container[data-type='${ArticleType.Interview}'] .header h1 svg {
		fill: white;
		background-color: ${color.palette.neutral[7]};
	}
	.header-container[data-type='${ArticleType.Interview}'] .header-top {
		margin-top: -0.25em;
	}
	.header-container[data-type='${ArticleType.Interview}'] .header-top h1 {
		font-family: ${families.headline.medium};
		padding-right: 25px;
		margin-bottom: 12px;
	}
	.header-container[data-type='${ArticleType.Interview}']
		.header
		h1
		.header-top-headline {
		background-color: ${color.palette.neutral[7]};
		box-shadow: 0.5rem 0 0 ${color.palette.neutral[7]},
			-10px 0 0 ${color.palette.neutral[7]};
		line-height: 38px;
		padding-bottom: 6px;
	}
	.header-container[data-type='${ArticleType.Interview}'] .header-kicker {
		background-color: ${colors.main};
		color: ${color.textOverDarkBackground};
		font-family: ${families.headline.bold};
		margin-left: 0;
		padding-left: 10px;
	}
	.header-container[data-type='${ArticleType.Interview}']
		.header-byline:before {
		background-image: repeating-linear-gradient(
			to bottom,
			${color.dimLine},
			${color.dimLine} 1px,
			transparent 1px,
			transparent 4px
		);
		background-repeat: repeat-x;
		background-position: bottom;
		background-size: 1px 16px;
		content: '';
		display: block;
		height: 16px;
		margin: 0;
	}
	.header-container[data-type='${ArticleType.Interview}'] .header-byline {
		padding: 0em 0 1.25em 0em;
		color: ${color.palette.neutral[7]};
	}
	.header-container[data-type='${ArticleType.Interview}']
		.header-byline
		button {
		margin-right: 20px;
		margin-top: 0px;
	}
	.header-container[data-type='${ArticleType.Interview}']
		.header-byline
		span {
		margin-top: 4px;
		display: block;
	}
	.interview-standfirst {
		margin-bottom: 0em !important;
		padding: 0 10px 18px 10px;
	}
	.app[data-type='${ArticleType.Interview}'] {
		padding: 0 !important;
	}

	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.header-image-container--interview {
			position: relative;
		}

		.header-image-container--interview
			.header-container[data-type='${ArticleType.Interview}'] {
			position: absolute;
			bottom: 0;
			z-index: 250;
		}

		.header-container[data-type='${ArticleType.Interview}'] {
			color: ${color.textOverDarkBackground};
		}

		.header-container[data-type='${ArticleType.Interview}'] h1 {
			padding-left: 10px;
			font-weight: normal;
		}

		.header-container[data-type='${ArticleType.Interview}'] h1 svg {
			height: 0.7em;
			transform: scale(1.1);
			width: auto;
			fill: white;
		}

		.header-container[data-type='${ArticleType.Interview}']
			h1
			.header-top-headline {
			background-color: ${color.palette.neutral[7]};
			box-shadow: 0.5rem 0 0 ${color.palette.neutral[7]},
				-10px 0 0 ${color.palette.neutral[7]};
			line-height: 38px;
		}

		.header-container[data-type='${ArticleType.Interview}'] h1 {
			font-family: ${families.headline.medium};
			padding-right: 25px;
		}

		.header-container[data-type='${ArticleType.Interview}']
			span
			h1
			.header-top-headline {
			line-height: 50px;
		}

		.header-container[data-type='${ArticleType.Interview}'] .header-kicker {
			background-color: ${colors.main};
			color: ${color.textOverDarkBackground};
			font-family: ${families.headline.bold};
			margin-left: 0;
			padding: 10px;
			border: none;
		}

		.interview-tablet .header-bottom {
			background: ${colors.tint};
		}

		.interview-tablet-standfirst {
			padding-top: 12px;
			padding-bottom: 12px;
		}

		.interview-tablet .header-bottom p {
			font-family: ${families.headline.medium};
			letter-spacing: 0.2px;
			line-height: 1.1875em;
			margin-bottom: 0.875em;
			font-size: 18px;
		}

		.byline-container:before {
			${threeLines};
		}

		.app[data-type='${ArticleType.Interview}'] .content-wrap {
			padding-left: ${Dimensions.get('window').width >
			metrics.article.maxWidth
				? px(metrics.article.sides)
				: px(metrics.article.sides * 2)};
		}

		.interview-tablet-wrapper {
			margin-left: ${Dimensions.get('window').width >
			metrics.article.maxWidth
				? px(
						(Dimensions.get('window').width -
							metrics.article.maxWidth) /
							2,
				  )
				: px(metrics.article.sides * 2)};
			margin-right: ${Dimensions.get('window').width >
			metrics.article.maxWidth
				? px(
						(Dimensions.get('window').width -
							metrics.article.maxWidth) /
							2 +
							metrics.article.rightRail,
				  )
				: px(metrics.article.rightRail + metrics.article.sides)};
		}

		.interview-tablet .standfirst--interview p {
			font-size: 18px;
			margin-right: ${px(metrics.article.rightRail)};
		}

		.header-container[data-type='${ArticleType.Interview}'] .header-kicker {
			display: inline-block;
		}

		.header-container[data-type='${ArticleType.Interview}'] h1 {
			font-size: 40px;
		}

		.interview-tablet
			.header-image-container--interview
			.header-container[data-type='${ArticleType.Interview}']
			h1
			.header-top-headline {
			line-height: 50px;
		}

		.interview-tablet .header-byline:not(:empty):after {
			left: 0;
			right: 0;
		}

		.interview-tablet .share-touch-zone {
			padding-right: 14px;
		}

		.header-image--interview {
			padding-top: 59.6%;
		}

		.interview-mobile {
			display: none;
		}
	}

	/*showcase*/
	.header-container[data-type='${ArticleType.Showcase}'] .header-kicker {
		border-top: 1px solid ${color.dimLine};
	}

	.header-container[data-type='${ArticleType.Showcase}'] .header:after {
		background-color: white;
		background-image: none;
		background-size: 0px 0px;
		height: 0px;
		margin: 0;
	}

	.header-container[data-type='${ArticleType.Showcase}'] h1 {
		color: ${colors.dark};
		font-family: ${families.headline.bold};
		font-size: 28px;
		line-height: 30px;
		margin-bottom: 0;
		padding-bottom: 0.75em;
	}

	.header-container[data-type='${ArticleType.Showcase}'] h1.alt {
		font-family: ${families.headline.regular};
		color: ${color.palette.neutral[7]};
	}

	.header-image--showcase {
		max-width: 100%;
		margin: auto;
	}

	.header-container[data-type='${ArticleType.Showcase}'] .standfirst {
		font-size: 19px;
		line-height: 24px;
	}

	.header-container[data-type='${ArticleType.Showcase}'] .standfirst:after {
		${threeLines}
	}

	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.app[data-type='${ArticleType.Showcase}'] {
			padding-left: 0;
			padding-right: 0;
		}

		.wrapper[data-type='${ArticleType.Showcase}'] {
			margin-right: ${px(metrics.article.rightRail)};
		}

		.header-container[data-type='${ArticleType.Showcase}'] h1 {
			font-size: 34px;
			line-height: 38px;
		}

		.header-image--showcase {
			margin-right: 0;
			margin-left: ${(Dimensions.get('window').width -
				metrics.article.maxWidth) /
			2};
		}

		.header-container[data-type='${ArticleType.Showcase}'] .standfirst {
			font-size: 20px;
			line-height: 25px;
		}

		.header-container[data-type='${ArticleType.Showcase}']
			.share-touch-zone {
			margin: -8px 0 0 0;
		}

		.header-container[data-type='${ArticleType.Showcase}']
			.header-byline:not(:empty):after {
			right: 4px;
		}
	}

	/*obit*/
	${outieKicker(ArticleType.Obituary)}
	.header-container[data-type='${ArticleType.Obituary}'] {
		color: ${color.textOverDarkBackground};
	}
	.header-container[data-type='${ArticleType.Obituary}'] .header-bg {
		background-color: ${color.palette.neutral[20]};
	}
	.header-image[data-type='${ArticleType.Obituary}'] .header-bg {
		background-color: ${color.palette.neutral[20]};
	}
	.header-container[data-type='${ArticleType.Obituary}'] .header {
		background-color: ${color.palette.neutral[20]};
	}
	.header-container[data-type='${ArticleType.Obituary}'] .header-kicker {
		background-color: ${color.palette.neutral[20]};
		color: ${color.textOverDarkBackground};
		font-family: ${families.headline.bold};
	}
	.header-container[data-type='${ArticleType.Obituary}'] .header-top h1 {
		font-family: ${families.titlepiece.regular};
	}
	.header-container[data-type='${ArticleType.Obituary}'] .header-byline,
	${'' /* this is needed to be more specific than an above style */}
		.header-container[data-type='${ArticleType.Obituary}']
		.header-byline
		a {
		color: ${color.textOverDarkBackground};
	}
	.header-container[data-type='${ArticleType.Obituary}'] .share-icon {
		color: ${color.textOverDarkBackground};
	}
	.header-container[data-type='${ArticleType.Obituary}'] .share-button {
		border: 1px solid ${color.textOverDarkBackground};
	}
`;

const Image = ({
	image,
	className,
	getImagePath,
}: {
	image: ImageT;
	className?: string;
	getImagePath: GetImagePath;
}) => {
	const path = getImagePath(image);
	const remotePath = getImagePath(image, 'full-size', true);
	return html`
		<img
			class="${className}"
			src="${path}"
			onerror="this.src='${remotePath}'"
		/>
	`;
};

const MainMediaImage = ({
	image,
	articleType,
	isGallery,
	className,
	children,
	preserveRatio,
	getImagePath,
}: {
	image: CreditedImage;
	className?: string;
	articleType?: ArticleType;
	isGallery?: boolean;
	children?: string;
	preserveRatio?: boolean;
	getImagePath: GetImagePath;
}) => {
	const path = getImagePath(image);
	const remotePath = getImagePath(image, 'full-size', true);
	return html`
		<div class="header-image" data-type="${articleType}">
			<div
				class="image-as-bg ${className}"
				data-preserve-ratio="${preserveRatio || 'false'}"
				style="background-image: url(${path}), url(${remotePath}); "
				${!isGallery &&
				`onclick="window.ReactNativeWebView.postMessage(JSON.stringify({kind: 'Lightbox', index: ${0}, isMainImage: true}))"`}
				data-open="false"
			>
				${preserveRatio &&
				html`
					<img
						class="image-as-bg__img"
						src="${path}"
						aria-hidden
						onerror="this.src='${remotePath}'"
					/>
				`}
				<button
					aria-hidden
					onclick="event.stopPropagation(); this.parentNode.dataset.open = !JSON.parse(this.parentNode.dataset.open)"
				>
					
				</button>
				<div class="image-as-bg-info">
					${image.caption} ${!image.displayCredit ? '' : image.credit}
				</div>
				${children}
				<div class="header-bg"></div>
			</div>
		</div>
	`;
};

const isImmersive = (type: ArticleType) =>
	type === ArticleType.Immersive ||
	type === ArticleType.Longread ||
	type === ArticleType.Obituary ||
	type === ArticleType.Gallery ||
	type === ArticleType.Interview;

const getStandFirstText = ({
	pillar,
	standfirst,
	type,
}: {
	pillar?: ArticlePillar;
	standfirst: ArticleHeaderProps['standfirst'];
	type: ArticleType;
}) => {
	const interviewColor =
		pillar === 'lifestyle'
			? getPillarColors(pillar).dark
			: palette.neutral[7];

	return html`
		<p
			${type === ArticleType.Interview &&
			`class=interview-standfirst` &&
			`style=color:${interviewColor};`}
		>
			${standfirst}
		</p>
	`;
};

const getStandFirst = (
	articleHeaderType: HeaderType,
	type: ArticleType,
	headerProps: ArticleHeaderProps,
	publishedId: Issue['publishedId'] | null,
	getImagePath: GetImagePath,
	pillar: ArticlePillar,
): string => {
	const cutout =
		type === ArticleType.Opinion &&
		headerProps.bylineImages &&
		headerProps.bylineImages.cutout;
	if (articleHeaderType === HeaderType.LargeByline) {
		return html`
			<section class="header-top">
				<div class="${cutout && `header-opinion-flex`}">
					${getHeadline(articleHeaderType, type, headerProps)}
					${publishedId &&
					cutout &&
					html`
						<div>
							${Image({
								image: cutout,
								getImagePath,
							})}
						</div>
					`}
				</div>
			</section>
		`;
	} else {
		return html`
			<section class="header-top">
				${getHeadline(articleHeaderType, type, headerProps)}
				${articleHeaderType === HeaderType.RegularByline &&
				headerProps.standfirst &&
				getStandFirstText({
					standfirst: headerProps.standfirst,
					type,
					pillar,
				})}
			</section>
		`;
	}
};

const getHeaderClassForType = (headerType: HeaderType): string => {
	switch (headerType) {
		case HeaderType.NoByline:
			return html` header-byline header-standfirst `;
		case HeaderType.LargeByline:
			return html` header-byline header-standfirst-color `;
		case HeaderType.RegularByline:
			return html` header-byline header-byline-italic `;
	}
};

const getByLine = (
	headerType: HeaderType,
	headerProps: ArticleHeaderProps,
	articleType?: ArticleType,
	webUrl?: string,
): string => {
	const bylineText = getByLineText(headerType, headerProps, articleType);
	const headerClass = getHeaderClassForType(headerType);
	const displayNoneClass = 'display-none';
	const hideByline = bylineText || webUrl ? '' : displayNoneClass;
	const hideShareButton = webUrl ? '' : displayNoneClass;

	const shareButton = html`
		<button
			name="Share button"
			class="share-touch-zone"
			onclick="window.ReactNativeWebView.postMessage(JSON.stringify({kind: 'Share'}))"
		>
			<div class="share-button">
				<div class="share-icon">
					${Platform.OS === 'ios' ? '\uE009' : '\uE008'}
				</div>
			</div>
		</button>
	`;
	return html`
		<aside
			id="byline-area"
			class="${headerClass} ${hideByline}"
			data-type="${articleType}"
		>
			<div id="share-button" class="${hideShareButton}">
				${shareButton}
			</div>
			<span style="pointer-events: none">${bylineText}</span>
			<div class="clearfix"></div>
		</aside>
	`;
};

const Header = ({
	publishedId,
	type,
	headerType,
	pillar,
	webUrl,
	getImagePath,
	...headerProps
}: {
	showMedia: boolean;
	publishedId: Issue['publishedId'] | null;
	type: ArticleType;
	headerType: HeaderType;
	pillar: ArticlePillar;
	webUrl?: string;
	getImagePath: GetImagePath;
} & ArticleHeaderProps) => {
	const immersive = isImmersive(type);
	const isGallery = type === ArticleType.Gallery;
	const displayWideImage =
		type === ArticleType.Article || type === ArticleType.Review;
	return html`
		${immersive &&
		headerProps.image &&
		publishedId &&
		MainMediaImage({
			image: headerProps.image,
			isGallery: isGallery,
			className:
				type === ArticleType.Interview
					? 'header-image--interview'
					: 'header-image--immersive',
			getImagePath,
		})}
		${!immersive &&
		displayWideImage &&
		headerProps.image &&
		publishedId &&
		MainMediaImage({
			articleType: type,
			className: 'header-image--wide',
			image: headerProps.image,
			isGallery: isGallery,
			preserveRatio: true,
			children: headerProps.starRating
				? Rating(headerProps)
				: headerProps.sportScore
				? SportScore({
						sportScore: headerProps.sportScore,
				  })
				: undefined,
			getImagePath,
		})}
		<div class="header-container-line-wrap">
			${type !== ArticleType.Interview && Line({ zIndex: 10 })}
			<div class="header-container wrapper" data-type="${type}">
				${!immersive &&
				!displayWideImage &&
				headerProps.image &&
				publishedId &&
				MainMediaImage({
					articleType: type,
					className: 'header-image--standard',
					image: headerProps.image,
					isGallery: isGallery,
					preserveRatio: true,
					children: headerProps.starRating
						? Rating(headerProps)
						: headerProps.sportScore
						? SportScore({
								sportScore: headerProps.sportScore,
						  })
						: undefined,
					getImagePath,
				})}
				<header
					class=${immersive &&
					headerProps.mainMedia &&
					headerProps.showMedia
						? 'header-immersive-video'
						: 'header'}
				>
					${headerProps.mainMedia &&
					(headerProps.showMedia
						? renderMediaAtom(headerProps.mainMedia)
						: null)}
					${headerProps.kicker &&
					html`
						<span class="header-kicker">${headerProps.kicker}</span>
					`}
					${getStandFirst(
						headerType,
						type,
						headerProps,
						publishedId,
						getImagePath,
						pillar,
					)}
				</header>
				${getByLine(
					headerType,
					headerProps as ArticleHeaderProps,
					type,
					webUrl,
				)}
				<div class="header-bg"></div>
			</div>
		</div>
	`;
};

const HeaderInterviewTablet = ({
	publishedId,
	type,
	headerType,
	webUrl,
	getImagePath,
	pillar,
	...headerProps
}: {
	showMedia: boolean;
	publishedId: Issue['publishedId'] | null;
	type: ArticleType;
	headerType: HeaderType;
	webUrl?: string;
	pillar: ArticlePillar;
	getImagePath: GetImagePath;
} & ArticleHeaderProps) => {
	return html`
		<div class="interview-tablet">
			<div class="header-image-container--interview">
				${headerProps.image &&
				publishedId &&
				MainMediaImage({
					image: headerProps.image,
					className: 'header-image--interview',
					getImagePath,
				})}
				<div
					class="header-container interview-tablet-wrapper"
					data-type="${type}"
				>
					${headerProps.mainMedia &&
					(headerProps.showMedia
						? renderMediaAtom(headerProps.mainMedia)
						: null)}
					${headerProps.kicker &&
					html`
						<span class="header-kicker">${headerProps.kicker}</span>
					`}
				</div>
			</div>
			<div class="header-bottom" data-type="${type}">
				<div
					class="header-container wrapper interview-tablet-wrapper"
					data-type="${type}"
				>
					<span> ${getHeadline(headerType, type, headerProps)} </span>
				</div>
				<section
					class="interview-tablet-standfirst interview-tablet-wrapper"
				>
					${headerProps.standfirst &&
					getStandFirstText({
						standfirst: headerProps.standfirst,
						type,
						pillar,
					})}
				</section>
				<div
					class="byline-container interview-tablet-wrapper"
					data-type="${type}"
				>
					${getByLine(
						headerType,
						headerProps as ArticleHeaderProps,
						type,
						webUrl,
					)}
					<div class="header-bg"></div>
				</div>
			</div>
		</div>
	`;
};

const HeaderInterviewMobile = ({
	publishedId,
	type,
	headerType,
	webUrl,
	getImagePath,
	pillar,
	...headerProps
}: {
	showMedia: boolean;
	publishedId: Issue['publishedId'] | null;
	type: ArticleType;
	headerType: HeaderType;
	webUrl?: string;
	pillar: ArticlePillar;
	getImagePath: GetImagePath;
} & ArticleHeaderProps) => {
	return html`
		<div class="interview-mobile">
			${headerProps.image &&
			publishedId &&
			MainMediaImage({
				image: headerProps.image,
				className: 'header-image--interview',
				getImagePath,
			})}
			<div class="header-container-line-wrap">
				<div class="header-container wrapper" data-type="${type}">
					<header class="header">
						${headerProps.mainMedia &&
						(headerProps.showMedia
							? renderMediaAtom(headerProps.mainMedia)
							: null)}
						${headerProps.kicker &&
						html`
							<span class="header-kicker"
								>${headerProps.kicker}</span
							>
						`}
						${getStandFirst(
							headerType,
							type,
							headerProps,
							publishedId,
							getImagePath,
							pillar,
						)}
					</header>
					${getByLine(
						headerType,
						headerProps as ArticleHeaderProps,
						type,
						webUrl,
					)}
					<div class="header-bg"></div>
				</div>
			</div>
		</div>
	`;
};

/*
In order to render the interview header differently on mobile/tablet we add two
different templates and use css to hide one or the other depending on the breakpoint.
*/
const HeaderInterview = ({
	publishedId,
	type,
	headerType,
	getImagePath,
	pillar,
	webUrl,
	...headerProps
}: {
	showMedia: boolean;
	publishedId: Issue['publishedId'] | null;
	type: ArticleType;
	headerType: HeaderType;
	webUrl?: string;
	pillar: ArticlePillar;
	getImagePath: GetImagePath;
} & ArticleHeaderProps) => {
	return html`
		${HeaderInterviewMobile({
			publishedId,
			type,
			headerType,
			getImagePath,
			pillar,
			webUrl,
			...headerProps,
		})}
		${HeaderInterviewTablet({
			publishedId,
			type,
			headerType,
			getImagePath,
			pillar,
			webUrl,
			...headerProps,
		})}
	`;
};

const HeaderShowcase = ({
	publishedId,
	type,
	headerType,
	webUrl,
	getImagePath,
	pillar,
	...headerProps
}: {
	showMedia: boolean;
	publishedId: Issue['publishedId'] | null;
	type: ArticleType;
	headerType: HeaderType;
	webUrl?: string;
	pillar: ArticlePillar;
	getImagePath: GetImagePath;
} & ArticleHeaderProps) => {
	return html`
		<div class="header-container-line-wrap">
			${Line({ zIndex: 10 })}
			<div class="header-container wrapper" data-type="${type}">
				<header class="header">
					${headerProps.kicker &&
					html`
						<span class="header-kicker">${headerProps.kicker}</span>
					`}
					${getHeadline(headerType, type, headerProps, pillar)}
				</header>
			</div>
		</div>
		${headerProps.image &&
		publishedId &&
		MainMediaImage({
			articleType: type,
			className: 'header-image--showcase',
			image: headerProps.image,
			isGallery: false,
			preserveRatio: true,
			children: headerProps.starRating
				? Rating(headerProps)
				: headerProps.sportScore
				? SportScore({
						sportScore: headerProps.sportScore,
				  })
				: undefined,
			getImagePath,
		})}
		<div class="header-container-line-wrap">
			${Line({ zIndex: 10 })}
			<div class="header-container wrapper" data-type="${type}">
				<div class="standfirst">
					${getStandFirstText({
						standfirst: headerProps.standfirst,
						type,
					})}
				</div>
				${getByLine(
					headerType,
					headerProps as ArticleHeaderProps,
					type,
					webUrl,
				)}
			</div>
		</div>
	`;
};

export { Header, HeaderShowcase, HeaderInterview, getStandFirst };
