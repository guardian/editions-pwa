import fetchMock from 'fetch-mock';
import { defaultSettings } from 'src/helpers/settings/defaults';
import {
	defaultEditionCache,
	editionsListCache,
	selectedEditionCache,
} from 'src/helpers/storage';
import type { EditionId, SpecialEdition } from '../../../../Apps/common/src';
import { defaultRegionalEditions } from '../../../../Apps/common/src/editions-defaults';
import {
	BASE_EDITION,
	DEFAULT_EDITIONS_LIST,
	defaultEditionDecider,
	fetchEditions,
	getDefaultEdition,
	getEditions,
	getSelectedEditionSlug,
	removeExpiredSpecialEditions,
} from '../use-edition-provider';

jest.mock('@react-native-community/netinfo', () => ({
	fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

jest.mock('src/services/remote-config', () => ({
	remoteConfigService: {
		getBoolean: jest.fn().mockReturnValue(true),
	},
}));

const specialEditions: SpecialEdition[] = [
	{
		edition: 'special-edition-expired' as EditionId,
		expiry: new Date(2020, 1, 1).toISOString(),
		editionType: 'Special',
		notificationUTCOffset: 1,
		topic: 'food',
		title: `Food
Monthly`,
		subTitle: 'Store cupboard special: 20 quick and easy lockdown suppers',
		header: {
			title: 'Food',
			subTitle: 'Monthly',
		},
		buttonImageUri:
			'https://media.guim.co.uk/49cebb0db4a3e4d26d7d190da7be4a2e9bd7534f/0_0_103_158/103.png',
		buttonStyle: {
			backgroundColor: '#FEEEF7',
			expiry: {
				color: '#7D0068',
				font: 'GuardianTextSans-Regular',
				lineHeight: 16,
				size: 15,
			},

			subTitle: {
				color: '#7D0068',
				font: 'GuardianTextSans-Bold',
				lineHeight: 20,
				size: 17,
			},
			title: {
				color: '#121212',
				font: 'GHGuardianHeadline-Regular',
				lineHeight: 34,
				size: 34,
			},
			image: {
				height: 134,
				width: 87,
			},
		},
	},
	{
		edition: 'special-edition-notexpired' as EditionId,
		expiry: new Date(3000, 3, 1).toISOString(),
		editionType: 'Special',
		notificationUTCOffset: 1,
		topic: 'food',
		title: `Food
Monthly`,
		subTitle: 'Store cupboard special: 20 quick and easy lockdown suppers',
		header: {
			title: 'Food',
			subTitle: 'Monthly',
		},
		buttonImageUri:
			'https://media.guim.co.uk/49cebb0db4a3e4d26d7d190da7be4a2e9bd7534f/0_0_103_158/103.png',
		buttonStyle: {
			backgroundColor: '#FEEEF7',
			expiry: {
				color: '#7D0068',
				font: 'GuardianTextSans-Regular',
				lineHeight: 16,
				size: 15,
			},

			subTitle: {
				color: '#7D0068',
				font: 'GuardianTextSans-Bold',
				lineHeight: 20,
				size: 17,
			},
			title: {
				color: '#121212',
				font: 'GHGuardianHeadline-Regular',
				lineHeight: 34,
				size: 34,
			},
			image: {
				height: 134,
				width: 87,
			},
		},
	},
];

describe('removeExpiredSpecialEditions', () => {
	it('should remove an expired special edition and ignore non-expired editions', () => {
		const editionsList = {
			...DEFAULT_EDITIONS_LIST,
			specialEditions: specialEditions,
		};
		const filteredList = removeExpiredSpecialEditions(editionsList);
		expect(filteredList.specialEditions.length).toEqual(1);
		expect(filteredList.specialEditions[0].edition).toEqual(
			'special-edition-notexpired',
		);
	});
});

describe('useEditions', () => {
	describe('getSelectedEditionSlug', () => {
		beforeEach(async () => {
			await selectedEditionCache.reset();
			await editionsListCache.reset();
		});
		it('should return the default slug as there is nothing in Async Storage', async () => {
			const editionSlug = await getSelectedEditionSlug();
			expect(editionSlug).toEqual(BASE_EDITION.edition);
		});
		it('should return "australian-edition" slug when the AU edition is set', async () => {
			await selectedEditionCache.set(defaultRegionalEditions[1]);
			await editionsListCache.set(DEFAULT_EDITIONS_LIST);
			const editionSlug = await getSelectedEditionSlug();
			expect(editionSlug).toEqual('australian-edition');
		});
	});

	describe('fetchEditions', () => {
		it('should return json if there is a 200 response from the endpoint', async () => {
			const body = DEFAULT_EDITIONS_LIST;

			fetchMock.getOnce(defaultSettings.editionsUrl, {
				status: 200,
				body,
			});
			const editionsList = await fetchEditions(
				defaultSettings.editionsUrl,
			);
			expect(editionsList).toEqual(body);
		});
		it('should return null if there is not a 200 response from the endpoint', async () => {
			fetchMock.getOnce(
				defaultSettings.editionsUrl,
				{
					status: 500,
				},
				{ overwriteRoutes: false },
			);
			const editionsList = await fetchEditions(
				defaultSettings.editionsUrl,
			);
			expect(editionsList).toEqual(null);
		});
	});

	describe('getEditions', () => {
		// Dont forget Offline
		beforeEach(async () => {
			await editionsListCache.reset();
		});
		it('should return the editions list from the endpoint in the happy path', async () => {
			const body = DEFAULT_EDITIONS_LIST;

			fetchMock.getOnce(
				defaultSettings.editionsUrl,
				{
					status: 200,
					body,
				},
				{ overwriteRoutes: false },
			);

			const editions = await getEditions();
			const editionsListInCache = await editionsListCache.get();
			expect(editions).toEqual(body);
			expect(editionsListInCache).toEqual(body);
		});
		it('should return the editions list from the cache if endpoint is not avaialble', async () => {
			fetchMock.getOnce(
				defaultSettings.editionsUrl,
				{
					status: 500,
				},
				{ overwriteRoutes: false },
			);
			await editionsListCache.set(DEFAULT_EDITIONS_LIST);

			const editions = await getEditions();
			expect(editions).toEqual(DEFAULT_EDITIONS_LIST);
		});
		it('should return the default editions list if there is nothing from the endpoint and no cache', async () => {
			fetchMock.getOnce(
				defaultSettings.editionsUrl,
				{
					status: 500,
				},
				{ overwriteRoutes: false },
			);

			const editions = await getEditions();
			expect(editions).toEqual(DEFAULT_EDITIONS_LIST);
		});
	});

	describe('defaultEditionDecider', () => {
		beforeEach(async () => {
			await defaultEditionCache.reset();
			await selectedEditionCache.reset();
		});
		it('should set default and selected edition local state as well as selected storage if found in default storage', async () => {
			const defaultLocalState = jest.fn();
			const selectedLocalState = jest.fn();
			defaultEditionCache.set(defaultRegionalEditions[1]);

			await defaultEditionDecider(
				defaultLocalState,
				selectedLocalState,
				DEFAULT_EDITIONS_LIST,
			);
			expect(defaultLocalState).toBeCalledTimes(1);
			expect(defaultLocalState).toBeCalledWith(
				defaultRegionalEditions[1],
			);
			expect(selectedLocalState).toBeCalledTimes(1);
			expect(selectedLocalState).toBeCalledWith(
				defaultRegionalEditions[1],
			);
			const selectedEdition = await selectedEditionCache.get();
			expect(selectedEdition).toEqual(defaultRegionalEditions[1]);
			const defaultEdition = await defaultEditionCache.get();
			expect(defaultEdition).toEqual(defaultRegionalEditions[1]);
		});
		it('should set a default based on locale if the feature flag is on and nothing in the default edition cache', async () => {
			// defaultRegionalEditions[1] = AU and locale mock = AU
			const defaultLocalState = jest.fn();
			const selectedLocalState = jest.fn();

			await defaultEditionDecider(
				defaultLocalState,
				selectedLocalState,
				DEFAULT_EDITIONS_LIST,
			);
			expect(defaultLocalState).toBeCalledTimes(1);
			expect(defaultLocalState).toBeCalledWith(
				defaultRegionalEditions[1],
			);
			expect(selectedLocalState).toBeCalledTimes(1);
			expect(selectedLocalState).toBeCalledWith(
				defaultRegionalEditions[1],
			);
			const selectedEdition = await selectedEditionCache.get();
			expect(selectedEdition).toEqual(defaultRegionalEditions[1]);
			const defaultEdition = await defaultEditionCache.get();
			expect(defaultEdition).toEqual(defaultRegionalEditions[1]);
		});
	});

	describe('getDefaultEdition', () => {
		beforeEach(async () => {
			await defaultEditionCache.reset();
		});
		it('should return the default edition from storage if its there', async () => {
			await defaultEditionCache.set(defaultRegionalEditions[1]);

			const defaultEdition = await getDefaultEdition();
			expect(defaultEdition).toEqual(defaultRegionalEditions[1]);
		});
		it('should return null if default edition is not in storage', async () => {
			const defaultEdition = await getDefaultEdition();
			expect(defaultEdition).toEqual(null);
		});
	});
});
