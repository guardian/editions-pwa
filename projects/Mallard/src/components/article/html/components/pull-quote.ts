import { css, html, px } from 'src/helpers/webview';
import { Breakpoints } from 'src/theme/breakpoints';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { families } from 'src/theme/typography';
import { CssProps } from '../helpers/css';
import { Quotes } from './icon/quotes';

const BubblePointer = () => html`
	<svg
		class="bubble"
		width="22"
		height="22"
		aria-hidden="true"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M22.007 0l-.033.53c-.273 4.415-1.877 9.35-4.702 13.22-3.74 5.124-9.301 8.115-16.763 8.246L0 22.005V0h22.007z"
			class="line"
			fill="#C70000"
		/>
		<path
			d="M1 0v20.982c6.885-.248 11.992-3.063 15.464-7.822 2.593-3.552 4.12-8.064 4.473-12.16.033-.38.037-.72.063-1H1z"
			fill="#FFF"
		/>
	</svg>
`;

const quoteStyles = ({ colors }: CssProps) => css`
	blockquote {
		box-sizing: border-box;
		border: 1px solid ${colors.main};
		color: ${colors.main};
		border-top-width: 12px;
		padding: 0 3px ${px(metrics.vertical * 2)}
			${px(metrics.article.sides / 2)};
		position: relative;
		margin-bottom: calc(22px + 0.25em);
		margin-top: 0.25em;
		font-size: 1.1em;
		-webkit-hyphens: manual;
		-moz-hyphens: manual;
		hyphens: manual;
		z-index: 10000;
	}

	blockquote svg.bubble {
		position: absolute;
		height: 22px;
		bottom: -22px;
		left: -1px;
	}

	blockquote svg.bubble .line,
	blockquote svg.quotes g {
		fill: ${colors.main};
	}

	blockquote cite {
		font-style: normal;
		font-weight: bold;
		display: block;
	}

	blockquote[data-role='supporting'] {
		font-family: ${families.titlepiece.regular};
	}
	blockquote[data-role='supporting'] cite {
		color: ${color.text};
	}

	@media (max-width: ${px(Breakpoints.tabletVertical)}) {
		blockquote[data-role='inline'],
		blockquote[data-role='supporting'] {
			width: 50%;
			float: left;
			margin-right: ${px(metrics.article.sides / 2)};
		}
	}

	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		blockquote[data-role='inline'],
		blockquote[data-role='supporting'] {
			position: absolute;
			right: 0;
			display: block;
			width: ${px(metrics.article.rightRail + 1)};
		}
	}

	@media (min-width: ${px(Breakpoints.tabletVertical)}) {
		blockquote[data-role='showcase'] {
			width: 50%;
			float: left;
			margin-right: ${px(metrics.article.sides / 2)};
		}
	}

	@media (min-width: ${px(Breakpoints.tabletLandscape)}) {
		blockquote[data-role='showcase'] {
			width: 60%;
			margin-left: ${px(
				((Breakpoints.tabletLandscape - metrics.article.maxWidth) / 2) *
					-1,
			)};
		}
	}
`;

/*
Some quotes have non breakable spaces
so we gotta replace them bc our layout
is hella narrow
*/
const Pullquote = ({
	cite,
	attribution,
	role,
}: {
	cite: string;
	role: string;
	attribution?: string;
}) => html`
	<blockquote data-role=${role}>
		${Quotes()} ${cite.replace(/\s/g, ' ')}
		${attribution && html` <cite>${attribution}</cite> `} ${BubblePointer()}
	</blockquote>
`;

export { Pullquote, quoteStyles };
