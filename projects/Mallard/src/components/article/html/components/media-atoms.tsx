import { MediaAtomElement, Direction } from 'src/common';
import { Arrow } from './arrow';
import { css, html } from 'src/helpers/webview';

/**
 * 56.25% is the perfect 16:9 ratio that matches most videos (ex. YouTube).
 *
 * It'd be complex to have a ratio dynamically adjusted depending on the
 * video without the server providing us this information, so we just have
 * a default ratio of 16:9 that will almost always work great.
 *
 * We use a little trick here to set-up our height based on the width,
 * [Aspect Ratio Boxes](https://css-tricks.com/aspect-ratio-boxes/). It relies
 * on the fact that `padding-top` percentage is based off the real width of
 * the element, not its height (surprisingly, perhaps). We then position the
 * iframe in an `absolute` fashion.
 */
export const mediaAtomStyles = css`
	.mediaWrapper {
		width: 100%;
		height: 0;
		padding-top: 56.25%;
		position: relative;
		background: #eee;
	}

	.mediaIframe {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;
export const EMBED_DOMAIN = 'https://embed.theguardian.com';

export const renderMediaAtom = (mediaAtomElement: MediaAtomElement) => {
	return html`
		<figure class="image" style="overflow: hidden;">
			<div class="mediaWrapper">
				<iframe
					scrolling="no"
					src="${EMBED_DOMAIN}/embed/atom/media/${mediaAtomElement.atomId}#noadsaf"
					class="mediaIframe"
					frameborder="0"
				></iframe>
			</div>
			${mediaAtomElement.title
				? html`
						<figcaption>
							${Arrow({ direction: Direction.top })}
							${mediaAtomElement.title}
						</figcaption>
				  `
				: ''}
		</figure>
	`;
};
