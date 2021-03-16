import { editionsListCache } from 'src/helpers/storage';
import { DEFAULT_EDITIONS_LIST, getEditions } from '../use-edition-provider';

jest.mock('@react-native-community/netinfo', () => ({
	fetch: jest.fn(() => Promise.resolve({ isConnected: false })),
}));

describe('useEditions', () => {
	describe('getEditions', () => {
		beforeEach(async () => {
			await editionsListCache.reset();
		});
		it('should return the editions list from cache if offline', async () => {
			await editionsListCache.set(DEFAULT_EDITIONS_LIST);

			const editions = await getEditions();
			expect(editions).toEqual(DEFAULT_EDITIONS_LIST);
		});
		it('should return the default editions list if offline and no cache available', async () => {
			const editions = await getEditions();
			expect(editions).toEqual(DEFAULT_EDITIONS_LIST);
		});
	});
});
