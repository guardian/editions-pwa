import { Direction } from 'src/common';
import { html } from 'src/helpers/webview';
import { color } from 'src/theme/color';

const Arrow = ({ fill = color.text, direction = Direction.top } = {}) => html`
	<svg
		style="transform: rotate(${direction}deg)"
		width="11"
		height="9"
		role="img"
		aria-hidden="true"
		viewBox="0 0 11 9"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M5.5 0L10.5 9H0.5L5.5 0Z" fill="${fill}" />
	</svg>
`;

export { Arrow };
