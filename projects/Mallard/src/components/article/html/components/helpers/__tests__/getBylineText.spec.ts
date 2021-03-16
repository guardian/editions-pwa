import { getByLineText } from '../getBylineText';
import { HeaderType } from 'src/common';

describe('getBylineText', () => {
	it('should return undefined if the header type is NoByline or LargeByline and there is no standfirst', () => {
		const bylineText = getByLineText(HeaderType.NoByline, {
			headline: 'Test Headline',
		});
		expect(bylineText).toEqual(undefined);
	});
	it('should return undefined if the header type is RegularByline and there is no byline html', () => {
		const bylineText = getByLineText(HeaderType.RegularByline, {
			headline: 'Test Headline',
		});
		expect(bylineText).toEqual(undefined);
	});
	it('should return uneditted html if the byline text ends in a link', () => {
		const bylineHtml =
			'<a href="path/to/bio">James Miller</a> and <a href="path/to/bio">Autumn Miller</a>';
		const bylineText = getByLineText(HeaderType.RegularByline, {
			headline: 'Test Headline',
			bylineHtml,
		});
		expect(bylineText).toEqual(bylineHtml);
	});
	it('should add a new line if the byline text does not end in a link', () => {
		const standfirst =
			'<a href="path/to/bio">James Miller</a> and <a href="path/to/bio">Autumn Miller</a> at Kenilworth Road';
		const bylineText = getByLineText(HeaderType.NoByline, {
			headline: 'Test Headline',
			standfirst,
		});
		expect(bylineText).toEqual(
			'<a href="path/to/bio">James Miller</a> and <a href="path/to/bio">Autumn Miller</a><br /> at Kenilworth Road',
		);
	});
});
