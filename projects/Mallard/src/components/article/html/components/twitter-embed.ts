import { html, css } from 'src/helpers/webview';
import { color } from 'src/theme/color';

// https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites
const makeTwitterEmbedJavaScript = () => html`
	<script>
		window.twttr = (function (d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0],
				t = window.twttr || {};
			if (d.getElementById(id)) return t;
			js = d.createElement(s);
			js.id = id;
			js.src = 'https://platform.twitter.com/widgets.js';
			fjs.parentNode.insertBefore(js, fjs);

			t._e = [];
			t.ready = function (f) {
				t._e.push(f);
			};

			return t;
		})(document, 'script', 'twitter-wjs');
	</script>
`;

export const TwitterEmbed = (elHtml: string) =>
	makeTwitterEmbedJavaScript() + html` ${elHtml} `;

export const twitterEmbedStyles = css`
	.twitter-tweet {
		border: none;
		font-style: italic;
		color: ${color.palette.neutral[46]};
	}
`;
