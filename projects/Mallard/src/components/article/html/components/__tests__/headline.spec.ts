import { getHeadline } from '../headline';
import { HeaderType, ArticleType } from 'src/common';

jest.mock('src/components/article/html/components/icon/quotes', () => ({
	Quotes: () => '<Quotes />',
}));

describe('getHeadline', () => {
	it('should display a headline with the byline and quotes', () => {
		const html = getHeadline(HeaderType.LargeByline, ArticleType.Opinion, {
			headline: 'Test Headline',
			bylineHtml: '<p>Test Byline</p>',
		});
		expect(html).toMatchSnapshot();
	});
	it('should display a headline with only the byline', () => {
		const html = getHeadline(HeaderType.LargeByline, ArticleType.Article, {
			headline: 'Test Headline',
			bylineHtml: '<p>Test Byline</p>',
		});
		expect(html).toMatchSnapshot();
	});
	it('should display a headline on its own', () => {
		const html = getHeadline(HeaderType.NoByline, ArticleType.Opinion, {
			headline: 'Test Headline',
			bylineHtml: '<p>Test Byline</p>',
		});
		expect(html).toMatchSnapshot();
	});
});
