import { FSPaths } from '../';

jest.mock('react-native-fs', () => ({
	DocumentDirectoryPath: 'path/to/base/directory',
}));

describe('paths', () => {
	describe('FSPaths', () => {
		it('should give correct issues directory', () => {
			expect(FSPaths.issuesDir).toEqual('path/to/base/directory/issues');
		});

		it('should give correct issues root based on localId', () => {
			expect(FSPaths.issueRoot('daily-edition/2019-10-10')).toEqual(
				'path/to/base/directory/issues/daily-edition/2019-10-10',
			);
		});

		it('should give correct zip file location based on a local issue id and filename', () => {
			expect(
				FSPaths.zip('daily-edition/2019-10-10', '2019-10-10'),
			).toEqual(
				'path/to/base/directory/issues/daily-edition/2019-10-10/2019-10-10.zip',
			);
		});

		it('should give a correct issue location based on a local issue id', () => {
			expect(FSPaths.issue('daily-edition/2019-10-10')).toEqual(
				'path/to/base/directory/issues/daily-edition/2019-10-10/issue',
			);
		});

		it('should give a correct front based on a local issue id and front id', () => {
			expect(FSPaths.front('daily-edition/2019-10-10', 'Books')).toEqual(
				'path/to/base/directory/issues/daily-edition/2019-10-10/front/Books',
			);
		});

		it('should give a media path on the local device for a full sized image', () => {
			expect(
				FSPaths.image(
					'daily-edition/2019-10-10',
					{
						source: 'source',
						path: 'path',
					},
					'full-size',
				),
			).toEqual(
				'path/to/base/directory/issues/daily-edition/2019-10-10/media/images/source/path',
			);
		});
		it('should give a media path on the local device for a thumbnail image', () => {
			expect(
				FSPaths.image(
					'daily-edition/2019-10-10',
					{
						source: 'source',
						path: 'path',
					},
					'thumb',
				),
			).toEqual(
				'path/to/base/directory/issues/daily-edition/2019-10-10/thumbs/images/thumb/source/path',
			);
		});
	});
});
