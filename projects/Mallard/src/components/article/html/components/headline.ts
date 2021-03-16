import { html } from 'src/helpers/webview';
import { HeaderType, ArticleType, ArticlePillar } from 'src/common';
import { ArticleHeaderProps } from './header';
import { Quotes } from './icon/quotes';

const getHeadline = (
	articleHeaderType: HeaderType,
	articleType: ArticleType,
	headerProps: ArticleHeaderProps,
	pillar?: ArticlePillar,
) => {
	if (
		articleHeaderType === HeaderType.LargeByline ||
		articleType === ArticleType.Interview
	) {
		return html`
			<h1>
				<span class="header-top-headline"
					>${articleType === ArticleType.Opinion &&
					Quotes()}${headerProps.headline}
				</span>
				${articleType !== ArticleType.Interview &&
				html`
					<span class="header-top-byline"
						>${headerProps.bylineHtml}
					</span>
				`}
			</h1>
		`;
	} else {
		const pillarInclusion =
			pillar === 'news' || pillar === 'neutral' || pillar === 'opinion';
		const showcaseStyle =
			articleType === ArticleType.Showcase && pillarInclusion
				? ` class="alt"`
				: ``;
		return html`
            <h1${showcaseStyle}>
                ${headerProps.headline}
            </h1>
        `;
	}
};

export { getHeadline };
