import { ArticleTheme } from '../article';
import { color } from 'src/theme/color';
import { PillarColoursWithTint } from 'src/helpers/transform';

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
