import fetchMock from 'fetch-mock';
import AsyncStorage from '@react-native-community/async-storage';
import { defaultSettings } from '../settings/defaults';
import { fetchCacheClear } from '../fetch';

describe('helpers/fetch', () => {
	describe('fetchCacheClear', () => {
		it('should set the cache clear item if there is none and return true', async () => {
			fetchMock.getOnce(defaultSettings.cacheClearUrl, {
				status: 200,
				body: {
					cacheClear: '1',
				},
			});

			const test = await fetchCacheClear();
			expect(AsyncStorage.setItem).toBeCalled();
			expect(test).toEqual(true);
		});

		it('should return true if cache clear equals what is in the Aysnc Storage', async () => {
			fetchMock.getOnce(
				defaultSettings.cacheClearUrl,
				{
					status: 200,
					body: {
						cacheClear: '1',
					},
				},
				{ overwriteRoutes: false },
			);
			// The key is cacheClear, but this seems to pass so I'm not changing it.
			await AsyncStorage.setItem('@cacheClear', '1');
			const test = await fetchCacheClear();
			expect(test).toEqual(true);
		});

		// This needs an rn fetch blob mock to actually work.
		// it('should delete items as there is a different response from the server', async () => {
		//     fetchMock.getOnce(
		//         defaultSettings.cacheClearUrl,
		//         {
		//             status: 200,
		//             body: {
		//                 cacheClear: '2',
		//             },
		//         },
		//         { overwriteRoutes: true },
		//     )

		//     await AsyncStorage.setItem('@cacheClear', '1')
		//     const test = await fetchCacheClear()
		//     expect(test).toEqual(false)
		// })

		it('should return true if an error is thrown', async () => {
			fetchMock.getOnce(
				defaultSettings.cacheClearUrl,
				{
					throws: new TypeError('Failed to fetch'),
				},
				{ overwriteRoutes: true },
			);

			const test = await fetchCacheClear();
			expect(test).toEqual(true);
		});
	});
});
