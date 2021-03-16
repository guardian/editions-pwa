import { getStandFirst } from '../header';
import { HeaderType, ArticleType } from 'src/common';

jest.mock('src/components/article/html/components/icon/quotes', () => ({
	Quotes: () => '<Quotes />',
}));

describe('article html Header', () => {
	describe('getStandFirst', () => {
		it('should display LargeByline Header Type with Opinion Article Type', () => {
			const html = getStandFirst(
				HeaderType.LargeByline,
				ArticleType.Opinion,
				{
					headline: 'Test Headline',
					bylineHtml: '<p>Test Byline</p>',
				},
				null,
				() => undefined,
				'news',
			);
			expect(html).toMatchSnapshot();
		});
		it('should display LargeByline Header Type with Opinion Article Type with a cutout space', () => {
			const html = getStandFirst(
				HeaderType.LargeByline,
				ArticleType.Opinion,
				{
					headline: 'Test Headline',
					bylineHtml: '<p>Test Byline</p>',
					bylineImages: {
						cutout: { source: 'media', path: 'path/to/image' },
					},
				},
				null,
				() => undefined,
				'news',
			);
			expect(html).toMatchSnapshot();
		});
		it('should display LargeByline Header Type with Opinion Article Type with a cutout image', () => {
			const html = getStandFirst(
				HeaderType.LargeByline,
				ArticleType.Opinion,
				{
					headline: 'Test Headline',
					bylineHtml: '<p>Test Byline</p>',
					bylineImages: {
						cutout: { source: 'media', path: 'path/to/image' },
					},
				},
				'1234567880',
				() => undefined,
				'news',
			);
			expect(html).toMatchSnapshot();
		});
		it('should display LargeByline Header Type with alternative Article Type with a cutout image', () => {
			const html = getStandFirst(
				HeaderType.LargeByline,
				ArticleType.Article,
				{
					headline: 'Test Headline',
					bylineHtml: '<p>Test Byline</p>',
					bylineImages: {
						cutout: { source: 'media', path: 'path/to/image' },
					},
				},
				null,
				() => undefined,
				'news',
			);
			expect(html).toMatchSnapshot();
		});
		it('should display RegularByline Header Type, show a standfirst with the headline', () => {
			const html = getStandFirst(
				HeaderType.RegularByline,
				ArticleType.Article,
				{
					headline: 'Test Headline',
					bylineHtml: '<p>Test Byline</p>',
					standfirst: 'Test Standfirst',
				},
				null,
				() => undefined,
				'news',
			);
			expect(html).toMatchSnapshot();
		});
		it('should display NoByline Header Type, show only the headline', () => {
			const html = getStandFirst(
				HeaderType.NoByline,
				ArticleType.Article,
				{
					headline: 'Test Headline',
					bylineHtml: '<p>Test Byline</p>',
				},
				null,
				() => undefined,
				'news',
			);
			expect(html).toMatchSnapshot();
		});
	});
});
