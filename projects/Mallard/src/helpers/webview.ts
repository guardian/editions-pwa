import type { LightboxMessage, ShareMessage } from '@guardian/renditions';
import { Platform } from 'react-native';
import type { ArticleType } from 'src/common';
import { bundles } from 'src/html-bundle-info.json';
import type { FontFamily, FontSizes } from 'src/theme/typography';
import { getFont, getScaledFont } from 'src/theme/typography';

export type WebViewPing =
	| {
			kind: 'shouldShowHeaderChange';
			shouldShowHeader: boolean;
	  }
	| { kind: 'isAtTopChange'; isAtTop: boolean }
	| ShareMessage
	| LightboxMessage;

/*
this tricks vs code into thinking
we are using emotion & lit-html
and gives us syntax colors
*/
const passthrough = (
	literals: TemplateStringsArray,
	...placeholders: any[]
): string =>
	literals.reduce((acc, literal, i) => {
		if (placeholders[i] != null && placeholders[i] !== false) {
			return acc + literal + String(placeholders[i]);
		}
		return acc + literal;
	}, '');

export const css = passthrough;
export const html = passthrough;

export const px = (value: string | number) => `${value}px`;

export const getFontCss = <F extends FontFamily>(
	family: F,
	level: FontSizes<F>,
) => {
	const font = getFont(family, level);
	return css`
		font-size: ${px(font.fontSize)};
		line-height: ${px(font.lineHeight)};
	`;
};
export const getScaledFontCss = <F extends FontFamily>(
	family: F,
	level: FontSizes<F>,
) => {
	const font = getScaledFont(family, level);
	const adjustment = Platform.OS == 'android' ? 2 : 0;
	return css`
		font-size: ${px(font.fontSize + adjustment)};
		line-height: ${px(font.lineHeight + adjustment)};
	`;
};

interface AltFont {
	showsAsFamily: string;
	style: string;
	weight: number;
}

export const generateAssetsFontCss = ({
	fontFamily,
	variant,
	extension = 'ttf',
}: {
	fontFamily: string;
	variant?: AltFont;
	extension?: string;
}) => {
	const fileName = Platform.select({
		ios: `${fontFamily}.${extension}`,
		android: `file:///android_asset/fonts/${fontFamily}.${extension}`,
	});

	return css`
		@font-face {
			font-family: '${fontFamily}';
			src: url('${fileName}');
		}
		${variant &&
		css`
			@font-face {
				font-family: '${variant.showsAsFamily}';
				font-weight: ${variant.weight};
				font-style: ${variant.style};
				src: url('${fileName}');
			}
		`}
	`;
};

export const getBundleUri = (
	key: keyof typeof bundles,
	use?: 'dev' | 'prod',
): string => {
	const uris = {
		dev:
			(Platform.OS === 'android'
				? // 10.0.2.2 is a special IP directing to the host dev machine
				  // from within the emulator
				  'http://10.0.2.2:'
				: 'http://localhost:') + bundles[key].watchPort,
		prod:
			(Platform.OS === 'android' ? 'file:///android_asset/' : '') +
			bundles[key].key +
			'.bundle/index.html',
	};
	if (!use) {
		return __DEV__ ? uris.dev : uris.prod;
	}
	return uris[use];
};

export const parsePing = (data: string) => JSON.parse(data) as WebViewPing;

const makeJavaScript = (topPadding: number) => html`
	<script>
		const TOP_PADDING = ${topPadding};

		const debounce = (fn) => {
			let frame;
			return (...params) => {
				if (frame) cancelAnimationFrame(frame);
				frame = requestAnimationFrame(() => fn(...params));
			};
		};

		// Scroll position since last "scroll" event.
		let oldScrollY = 0;

		// Scroll position since last change of direction (up or down).
		let baseScrollY = 0;

		// Is header currently shown? Needs to be a global so that
		// it can be updated directly from React Native.
		window.shouldShowHeader = true;

		// Are we at the top?
		window.isAtTop = true;

		// How much do we need scroll down before the header
		// hides. Even if one scrolls slowly, the header would
		// predictably hides after that many pixels scrolling down.
		// We want to avoid relying too much on timing APIs because it
		// can be fairly unreliable depending on device perf.
		const DOWN_THRESHOLD = 10;

		// How much do we need scroll up before the
		// header shows up again.
		const UP_THRESHOLD = 160;

		const onScroll = () => {
			const scrollY = window.scrollY;

			// "turn" stands for "last change of direction" here.
			let distanceSinceTurn = scrollY - baseScrollY;
			const distanceSinceOld = scrollY - oldScrollY;

			// If the sign of the scroll direction changed, it's time
			// to reset our "base" offset.
			if (
				(distanceSinceOld > 0 && distanceSinceTurn < 0) ||
				(distanceSinceOld < 0 && distanceSinceTurn > 0)
			) {
				baseScrollY = oldScrollY;
				distanceSinceTurn = distanceSinceOld;
			}
			oldScrollY = scrollY;

			// We always want to show the header when we are at the top
			// of the article. Otherwise, we show it as long as it's
			// been shown and we didn't scroll enough to trigger a
			// change. Or, if it's not shown and we scrolled *back*
			// enough.
			const shouldNowShowHeader =
				scrollY < TOP_PADDING ||
				(distanceSinceTurn < DOWN_THRESHOLD &&
					window.shouldShowHeader) ||
				(distanceSinceTurn < -UP_THRESHOLD && !window.shouldShowHeader);

			if (shouldNowShowHeader !== window.shouldShowHeader) {
				window.shouldShowHeader = shouldNowShowHeader;

				// React Native can't "listen" to a particular variable
				// within the web view, so we need to call it back
				// though a message.
				window.ReactNativeWebView.postMessage(
					JSON.stringify({
						kind: 'shouldShowHeaderChange',
						shouldShowHeader: window.shouldShowHeader,
					}),
				);
			}

			const isNowAtTop = scrollY === 0;
			if (isNowAtTop != window.isAtTop) {
				window.isAtTop = isNowAtTop;

				window.ReactNativeWebView.postMessage(
					JSON.stringify({
						kind: 'isAtTopChange',
						isAtTop: window.isAtTop,
					}),
				);
			}
		};

		// The "passive" flag tells the browser we won't call
		// "preventDefault", which improve performance.
		document.addEventListener('scroll', debounce(onScroll), {
			passive: true,
		});
	</script>
`;

/* makes some HTML and posts the height back */
export const makeHtml = ({
	styles,
	body,
	topPadding = 0,
	type,
}: {
	styles: string;
	body: string;
	topPadding?: number;
	type?: ArticleType;
}) => html`
	<html>
		<head>
			<style>
				${styles}
			</style>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta name="format-detection" content="telephone=no" />
		</head>
		<body style="padding-top:${px(topPadding)}">
			<div id="app" class="app" data-type="${type}">${body}</div>
			${makeJavaScript(topPadding)}
		</body>
	</html>
`;
