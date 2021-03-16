import { css, px } from 'src/helpers/webview';
import { metrics } from 'src/theme/spacing';

export const breakSides = css`
	margin-left: ${px(metrics.article.sides * -1)};
	padding-left: ${px(metrics.article.sides)};
	margin-right: ${px(metrics.article.sides * -1)};
	padding-right: ${px(metrics.article.sides)};
`;
