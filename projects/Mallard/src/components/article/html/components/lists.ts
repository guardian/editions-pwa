import type { PillarColoursWithTint } from 'src/helpers/transform';
import { css } from 'src/helpers/webview';
import { color } from 'src/theme/color';

const bulletStyle = () => css`
	display: inline-block;
	content: '';
	border-radius: 0.375rem;
	height: 0.75rem;
	width: 0.75rem;
`;

export const listStyles = (colors: PillarColoursWithTint) => css`
	ul {
		list-style: none;
		margin-bottom: 15px;
	}

	li {
		padding-left: 1.25rem;
		display: inline-block;
	}

	ul > li > p:first-child {
		display: inline;
	}

	ul > li:before {
		${bulletStyle()};
		margin-right: 0.5rem;
		margin-left: -1.25rem;
		background-color: ${color.palette.neutral[86]};
	}

	.bullet {
		font-size: 0rem;
	}

	.bullet:before {
		${bulletStyle()};
		background-color: ${colors.main};
		margin-right: 0.125rem;
	}
`;
