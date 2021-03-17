import type { PillarColoursWithTint } from 'src/helpers/transform';
import { color } from 'src/theme/color';
import { ArticleTheme } from '../article';

export interface CssProps {
	colors: PillarColoursWithTint;
	theme: ArticleTheme;
}

export const themeColors = (theme: ArticleTheme) => {
	if (theme === ArticleTheme.Dark) {
		return {
			background: color.photoBackground,
			text: color.textOverDarkBackground,
			line: color.line,
			dimText: color.palette.neutral[86],
		};
	}

	return {
		background: color.background,
		text: color.text,
		line: color.line,
		dimText: color.palette.neutral[46],
	};
};
