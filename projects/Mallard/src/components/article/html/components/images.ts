import { ImageElement } from 'src/common';
import { Direction } from 'src/common';
import { useMediaQuery } from 'src/hooks/use-screen';
import { css, getFontCss, html, px } from 'src/helpers/webview';
import { Breakpoints } from 'src/theme/breakpoints';
import { metrics } from 'src/theme/spacing';
import { Arrow } from './arrow';
import { CssProps, themeColors } from '../helpers/css';
import { ArticleType } from '../../../../../../Apps/common/src';
import { ArticleTheme } from '../article';
export const renderCaption = ({
	caption,
	credit,
	displayCredit,
}: Pick<ImageElement, 'caption' | 'credit' | 'displayCredit'>) => {
	return displayCredit === true
		? [caption, credit].filter((s) => !!s).join(' ')
		: caption;
};

const breakoutCaption = (
	role: ImageElement['role'],
	theme: ArticleTheme,
) => css`
	.image[data-role='${role}'] div {
		position: absolute;
		right: ${px(
			(metrics.article.rightRail + metrics.article.sides * 1.5) * -1,
		)};
		top: -0.5em;
		display: block;
		width: ${px(metrics.article.rightRail)};
	}

	.image[data-role='${role}'] figcaption {
		position: relative;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 15;
		overflow: hidden;
	}

	.image[data-role='${role}'] span {
		font-family: 'GuardianTextSans-Regular';
		color: ${themeColors(theme).dimText};
		${getFontCss('sans', 0.9)}
		font-weight: bold;
	}
`;

const imageStyles = ({ colors, theme }: CssProps) => css`
	.image {
		position: relative;
		clear: right;
		z-index: 10000;
	}
	.image img {
		display: block;
		width: 100%;
		height: auto;
	}
	.image figcaption {
		font-family: 'GuardianTextSans-Regular';
		color: ${themeColors(theme).dimText};
		${getFontCss('sans', 0.5)}
		position: relative;
		margin-top: 0.5em;
	}
	.image figcaption svg {
		width: 1.2em;
		position: relative;
	}
	.image figcaption svg path {
		fill: ${theme === 'dark' ? colors.bright : colors.main};
	}

	/* Tablet captions */
	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.image figcaption {
			${getFontCss('sans', 0.9)}
		}
	}

	/*THUMBS*/
	@media (max-width: ${px(Breakpoints.tabletVertical)}) {
		.image[data-role='thumbnail'] {
			width: 40%;
			float: left;
			margin-right: ${px(metrics.article.sides)};
		}
	}
	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.image[data-role='thumbnail'] {
			width: ${px(metrics.article.rightRail)};
			position: absolute;
			right: 0;
		}
	}

	/*SUPPORTING*/
	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.image[data-role='supporting'] {
			float: right;
			width: 500px;
			margin-left: ${px(metrics.article.sides)};
			margin-right: ${px(
				(metrics.article.rightRail + metrics.article.sides) * -1,
			)};
		}

		.image[data-role='supporting'] figcaption {
			width: ${px(metrics.article.rightRail - metrics.article.sides)};
			position: absolute;
			right: 0;
		}
	}

	/*SHOWCASE*/
	@media (min-width: ${px(Breakpoints.tabletVertical)}) and (max-width: ${px(
			Breakpoints.tabletLandscape,
		)}) {
		.image[data-role='showcase'] {
			margin-right: ${px(
				(metrics.article.rightRail + metrics.article.sides) * -1,
			)};
		}

		.image[data-role='showcase'] figcaption {
			width: ${px(metrics.article.rightRail)};
			float: right;
		}
	}
	@media (min-width: ${px(Breakpoints.tabletLandscape)}) {
		.image[data-role='showcase'] img {
			margin-left: ${px(
				((Breakpoints.tabletLandscape - metrics.article.maxWidth) / 2) *
					-1,
			)};
			width: calc(
				100% +
					${px(
						(Breakpoints.tabletLandscape -
							metrics.article.maxWidth) /
							2,
					)}
			);
		}
		${breakoutCaption('showcase', theme)}
	}

	/*IMMERSIVE*/
	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.image[data-role='immersive'] {
			margin-right: ${px(
				(metrics.article.rightRail + metrics.article.sides) * -1,
			)};
		}
		.image[data-role='immersive'] figcaption {
			width: ${px(metrics.article.rightRail)};
			float: right;
		}
	}
	@media (min-width: ${px(Breakpoints.tabletLandscape)}) {
		.image[data-role='immersive'] img {
			width: calc(
				100% +
					${px(
						Breakpoints.tabletLandscape - metrics.article.maxWidth,
					)}
			);
			display: block;
			background: 'red';
			margin-left: ${px(
				((Breakpoints.tabletLandscape - metrics.article.maxWidth) / 2) *
					-1,
			)};
		}
	}

	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		${breakoutCaption('inline', theme)}
	}
`;

const ImageBase = ({
	path,
	index,
	alt,
	caption,
	credit,
	displayCredit,
	role,
	remotePath,
	displayCaptionAndCredit,
	articleType,
}: {
	path: string;
	index?: number;
	alt?: string;
	caption?: string;
	credit?: string;
	displayCredit?: boolean;
	role?: ImageElement['role'];
	remotePath?: string;
	displayCaptionAndCredit?: boolean;
	articleType?: string;
}) => {
	const isTablet = useMediaQuery(
		(width) => width >= Breakpoints.tabletVertical,
	);
	const isInlineTablet = !role && isTablet;
	const showViewMore = isInlineTablet && articleType === ArticleType.Gallery;
	const figcaption =
		displayCaptionAndCredit &&
		renderCaption({ caption, credit, displayCredit });
	return html`
		<figure class="image" data-role="${role || 'inline'}">
			<img
				src="${path}"
				onclick="window.ReactNativeWebView.postMessage(JSON.stringify({kind: 'Lightbox', index: ${index}, isMainImage: false}))"
				alt="${alt}"
				id="img-${index}"
				onerror="this.src='${remotePath}'"
			/>

			${figcaption &&
			html`
				<div>
					<figcaption>
						${Arrow(
							isInlineTablet
								? { direction: Direction.left }
								: { direction: Direction.top },
						)}
						${figcaption}
					</figcaption>
					${showViewMore &&
					html`
						<span
							onclick="window.ReactNativeWebView.postMessage(JSON.stringify({kind: 'Lightbox', index: ${index}, isMainImage: false}))"
						>
							view more
						</span>
					`}
				</div>
			`}
		</figure>
	`;
};

const Image = ({
	imageElement,
	path,
	index,
	remotePath,
	displayCaptionAndCredit,
	articleType,
}: {
	imageElement: ImageElement;
	path: string | undefined;
	index?: number | undefined;
	remotePath?: string;
	displayCaptionAndCredit?: boolean;
	articleType?: string;
}) => {
	if (path) {
		return ImageBase({
			path,
			index,
			remotePath,
			displayCaptionAndCredit,
			articleType,
			...imageElement,
		});
	}
	return null;
};

export { Image, imageStyles };
