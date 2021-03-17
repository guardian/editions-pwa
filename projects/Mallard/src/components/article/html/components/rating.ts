import { getRatingAsText } from 'src/components/Stars/Stars';
import { css, html, px } from 'src/helpers/webview';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { families } from 'src/theme/typography';
import type { CssProps } from '../helpers/css';

export const starRatingStyles = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	config: CssProps,
) => css`
	.rating {
		font-family: ${families.icon.regular};
		background-color: ${color.palette.highlight.main};
		padding: 0 ${px(metrics.horizontal / 3)} ${px(7)};
		line-height: 1;
		font-size: 1.2em;
	}
`;

const Rating = ({ starRating = 3.5 }) => {
	return html`
		<div class="rating" aria-label="${starRating} stars">
			${getRatingAsText(starRating).join('')}
		</div>
	`;
};

export { Rating };
