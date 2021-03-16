import { editionDirsToClean } from '../clear-issues-and-editions';

describe('clear-issues-and-editions', () => {
	describe('editionDirsToClean', () => {
		it('should never return the download folder', () => {
			const toClean = editionDirsToClean(
				[
					{ name: 'test-edition', path: '' },
					{ name: 'download', path: '' },
				],
				[],
			);
			expect(toClean).toEqual([{ name: 'test-edition', path: '' }]);
		});

		it('should never return hidden folders', () => {
			const toClean = editionDirsToClean(
				[
					{ name: 'test-edition', path: '' },
					{ name: '.DS_STORE', path: '' },
					{ name: '.hidden', path: '' },
				],
				[],
			);
			expect(toClean).toEqual([{ name: 'test-edition', path: '' }]);
		});

		it('should never return current editions', () => {
			const toClean = editionDirsToClean(
				[
					{ name: 'test-edition', path: '' },
					{ name: 'important-edition', path: '' },
				],
				['important-edition'],
			);
			expect(toClean).toEqual([{ name: 'test-edition', path: '' }]);
		});
	});
});
