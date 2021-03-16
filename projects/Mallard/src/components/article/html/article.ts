import { html, makeHtml } from 'src/helpers/webview';
import {
	ArticlePillar,
	ArticleType,
	HeaderType,
	BlockElement,
	CAPIArticle,
	ImageSize,
	Issue,
} from '../../../common';
import {
	Header,
	ArticleHeaderProps,
	HeaderShowcase,
	HeaderInterview,
} from './components/header';
import { Image } from './components/images';
import { Line } from './components/line';
import { Pullquote } from './components/pull-quote';
import { TwitterEmbed } from './components/twitter-embed';
import { makeCss } from './css';
import { renderMediaAtom } from './components/media-atoms';
import { GetImagePath } from 'src/hooks/use-image-paths';
import { Image as TImage, Content } from '../../../../../Apps/common/src';
import { getPillarColors } from 'src/helpers/transform';
import { getLightboxImages } from '../types/article';

interface ArticleContentProps {
	showMedia: boolean;
	publishedId: Issue['publishedId'] | null;
	imageSize: ImageSize;
	getImagePath: GetImagePath;
	displayHint?: string;
}

export enum ArticleTheme {
	Default = 'default',
	Dark = 'dark',
}

const usesDarkTheme = (type: Content['type']) =>
	['picture', 'gallery'].includes(type);

const PictureArticleContent = (image: TImage, getImagePath: GetImagePath) => {
	const path = getImagePath(image);
	const remotePath = getImagePath(image, 'full-size', true);
	return Image({
		imageElement: {
			src: image,
			id: 'image',
			role: 'immersive',
		},
		index: 0, // allows us to open lightbox
		path,
		remotePath,
	});
};

/*
As well as list items bullet points from composer can be sent as a unicode character •
This method applies a class to the bullet string in order to add stlying through css
*/
const cleanupBullets = (html: string) => {
	return html.replace(/•/g, `<span class="bullet">•</span>`);
};

const renderArticleContent = (
	elements: BlockElement[],
	{ showMedia, publishedId, getImagePath, displayHint }: ArticleContentProps,
	articleType: string,
) => {
	const imagePaths = getLightboxImages(elements).map((i) => i.src.path);
	return elements
		.map((el) => {
			switch (el.id) {
				case 'html':
					if (el.hasDropCap) {
						return html` <div class="drop-cap">${el.html}</div> `;
					}
					if (el.html.includes('•')) {
						return cleanupBullets(el.html);
					}
					return el.html;
				case 'media-atom':
					return showMedia ? renderMediaAtom(el) : '';
				case 'image': {
					const path = getImagePath(el.src);
					const index = imagePaths.findIndex(
						(e) => e === el.src.path,
					);
					const displayCaptionAndCredit = displayHint != 'photoEssay';
					return publishedId
						? Image({
								imageElement: el,
								path,
								index,
								displayCaptionAndCredit,
								articleType,
						  })
						: '';
				}
				case 'pullquote':
					return Pullquote({
						cite: el.html,
						role: el.role || 'inline',
						...el,
					});
				case 'tweet':
					return TwitterEmbed(el.html);
				default:
					return '';
			}
		})
		.join('');
};

export const renderArticle = (
	elements: BlockElement[],
	{
		pillar,
		showMedia,
		topPadding,
		publishedId,
		showWebHeader,
		article,
		imageSize,
		type,
		getImagePath,
	}: {
		pillar: ArticlePillar;
		topPadding: number;
		article: CAPIArticle;
		type: ArticleType;
		showWebHeader: boolean;
		headerProps?: ArticleHeaderProps & { type: ArticleType };
	} & ArticleContentProps,
) => {
	let content, header;
	const headerType = article.headerType || HeaderType.RegularByline;
	switch (article.type) {
		case 'picture':
			header = Header({
				publishedId,
				type: ArticleType.Gallery,
				headerType: HeaderType.RegularByline,
				headline: article.headline,
				byline: article.byline,
				bylineHtml: article.bylineHtml,
				showMedia,
				webUrl: article.webUrl,
				getImagePath,
				pillar,
			});
			if (article.image && publishedId) {
				content = PictureArticleContent(article.image, getImagePath);
			}
			break;
		case 'gallery':
			header = Header({
				publishedId,
				type: ArticleType.Gallery,
				headerType: HeaderType.RegularByline,
				headline: article.headline,
				byline: article.byline,
				bylineHtml: article.bylineHtml,
				standfirst: article.standfirst,
				image: article.image,
				showMedia,
				getImagePath,
				pillar,
			});
			content = renderArticleContent(
				elements,
				{
					showMedia,
					publishedId,
					imageSize,
					getImagePath,
				},
				article.type,
			);
			break;
		default:
			header =
				type === ArticleType.Showcase
					? HeaderShowcase({
							...article,
							type,
							headerType,
							publishedId,
							showMedia,
							pillar,
							getImagePath,
					  })
					: type === ArticleType.Interview
					? HeaderInterview({
							...article,
							type,
							headerType,
							publishedId,
							showMedia,
							pillar,
							getImagePath,
					  })
					: Header({
							...article,
							type,
							headerType,
							publishedId,
							showMedia,
							pillar,
							getImagePath,
					  });
			const displayHint = article.displayHint;
			content = renderArticleContent(
				elements,
				{
					showMedia,
					publishedId,
					imageSize,
					getImagePath,
					displayHint,
				},
				article.type,
			);
			break;
	}

	const theme: ArticleTheme = usesDarkTheme(article.type)
		? ArticleTheme.Dark
		: ArticleTheme.Default;

	const styles = makeCss({
		colors: getPillarColors(pillar),
		theme,
	});
	const body = html`
		${showWebHeader && article && header}
		<div class="content-wrap">
			${showWebHeader && Line({ zIndex: 999 })}
			<main>${content}</main>
		</div>
	`;
	return makeHtml({ styles, body, topPadding, type });
};
