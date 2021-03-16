import { css, html, px } from 'src/helpers/webview';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { families } from 'src/theme/typography';
import { CssProps } from '../helpers/css';

export const sportScoreStyles = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	config: CssProps,
) => css`
	.sport-score {
		font-family: ${families.text.regular};
		background-color: ${color.palette.highlight.main};
		padding: 0 ${px(metrics.horizontal / 3)} ${px(7)};
		line-height: 1;
		font-size: 0.9em;
	}
`;

const SportScore = ({ sportScore }: { sportScore: string }) => {
	return html` <div class="sport-score">${sportScore.trim()}</div> `;
};

export { SportScore };
