import { FSPaths } from '../'

jest.mock('rn-fetch-blob', () => ({
    fs: {
        dirs: {
            DocumentDir: 'path/to/base/directory',
        },
    },
}))

describe('paths', () => {
    describe('FSPaths', () => {
        it('should give correct context prefixed directory', () => {
            expect(FSPaths.contentPrefixDir).toEqual(
                'path/to/base/directory/issues/daily-edition',
            )
        })

        it('should give correct issues directory', () => {
            expect(FSPaths.issuesDir).toEqual('path/to/base/directory/issues')
        })

        it('should give correct issues root based on localId', () => {
            expect(FSPaths.issueRoot('daily-edition/2019-10-10')).toEqual(
                'path/to/base/directory/issues/daily-edition/2019-10-10',
            )
        })

        it('should give correct media root directory', () => {
            expect(FSPaths.mediaRoot('daily-edition/2019-10-10')).toEqual(
                'path/to/base/directory/issues/daily-edition/2019-10-10/media',
            )
        })

        it('should give correct zip file location based on a local issue id and filename', () => {
            expect(
                FSPaths.zip('daily-edition/2019-10-10', '2019-10-10'),
            ).toEqual(
                'path/to/base/directory/issues/daily-edition/2019-10-10/2019-10-10.zip',
            )
        })

        it('should give a correct issue zip location based on a local issue id', () => {
            expect(FSPaths.issueZip('daily-edition/2019-10-10')).toEqual(
                'path/to/base/directory/issues/daily-edition/2019-10-10/data.zip',
            )
        })
        it('should give a correct issue location based on a local issue id', () => {
            expect(FSPaths.issue('daily-edition/2019-10-10')).toEqual(
                'path/to/base/directory/issues/daily-edition/2019-10-10/issue',
            )
        })

        it('should give a correct front based on a local issue id and front id', () => {
            expect(FSPaths.front('daily-edition/2019-10-10', 'Books')).toEqual(
                'path/to/base/directory/issues/daily-edition/2019-10-10/front/Books',
            )
        })

        it('should give a media path on the local device', () => {
            expect(
                FSPaths.media(
                    'daily-edition/2019-10-10',
                    'source',
                    'path',
                    'phone',
                ),
            ).toEqual(
                'path/to/base/directory/issues/daily-edition/2019-10-10/media/phone/source/path',
            )
        })
    })
})
