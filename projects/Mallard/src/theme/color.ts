import { palette } from '@guardian/pasteup/palette';
import {
	background,
	border,
	brand,
	brandBackground,
	brandBorder,
	brandText,
	neutral,
	news,
	opinion,
	sport,
	text,
} from '@guardian/src-foundations/palette';

/*
Roles for colors.  Prefer using these over the palette.  It makes it easier
to change things. Also it makes night mode possible so there's that.

The only roles we need to place in here are the ones that span through the app.
If you have a specific use-case, like a spinner color.  It makes more sense to
put that in the <Spinner /> component.
*/

export const color = {
	/*
    Backgrounds
    */
	background: background.primary,
	text: text.primary,
	dimBackground: neutral[93],
	dimmerBackground: neutral[86],
	dimText: neutral[20],
	darkBackground: neutral[20],
	photoBackground: neutral[7],
	textOverPhotoBackground: background.primary,
	textOverDarkBackground: background.primary,
	artboardBackground: neutral[7],
	skeleton: neutral[60],

	/*
    Brand (our blue)
    */
	textOverPrimary: brandText.primary,
	primary: brandBackground.primary,
	primaryDarker: brand[300],

	/*
    Border colors
    */
	line: border.primary,
	dimLine: border.secondary,
	lineOverPrimary: brandBorder.primary,

	/*
    Error messages and icons.
    */
	error: text.error,

	/*
    Onboarding & button UI.
    */
	ui: {
		tomato: news[500],
		apricot: opinion[500],
		shark: sport[400],
		sea: '#279DDC',
		supportBlue: '#41A9E0',
	},

	/*
    The palette is available to use, but prefer using the name.
    */
	palette,
};
