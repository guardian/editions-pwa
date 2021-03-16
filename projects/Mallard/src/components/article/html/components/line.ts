import { css, html, px } from 'src/helpers/webview';
import { Breakpoints } from 'src/theme/breakpoints';
import { metrics } from 'src/theme/spacing';
import { CssProps, themeColors } from '../helpers/css';

export const lineStyles = ({ theme }: CssProps) => css`
	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		.line {
			position: absolute;
			width: 1px;
			height: '100%';
			background: ${themeColors(theme).line};
			top: 0;
			right: ${px(metrics.article.rightRail + metrics.article.sides)};
			bottom: 0;
			display: block;
			z-index: 99999;
		}
	}
`;

const Line = ({ zIndex = 9999 }) => {
	return html` <div class="line" style="z-index: ${zIndex};"></div> `;
};

export { Line };
