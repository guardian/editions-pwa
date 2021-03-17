import { ArticleType, HeaderType } from 'src/common';
import type { ArticleHeaderProps } from '../header';

const getByLineText = (
	headerType: HeaderType,
	headerProps: ArticleHeaderProps,
	articleType?: ArticleType,
): string | undefined => {
	const byLineText =
		articleType !== ArticleType.Interview &&
		(headerType === HeaderType.NoByline ||
			headerType === HeaderType.LargeByline)
			? headerProps.standfirst
			: headerProps.bylineHtml;
	if (!byLineText) return undefined;

	const newLineCheck = byLineText.split('</a>');
	// Link at the end? No new line needed
	if (newLineCheck[newLineCheck.length - 1] === '') {
		return byLineText;
	}

	const bylineWithNewLine = byLineText.replace(
		`</a>${newLineCheck[newLineCheck.length - 1]}`,
		`</a><br />${newLineCheck[newLineCheck.length - 1]}`,
	);
	return bylineWithNewLine;
};

export { getByLineText };
