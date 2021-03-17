import type { NetInfoState } from '@react-native-community/netinfo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { NON_IMPLEMENTED_LINK } from 'src/helpers/apollo_link';
import { DownloadBlockedStatus } from '../use-net-info';
import type { NetInfo as NetInfoType } from '../use-net-info';

type Handler = (state: NetInfoState) => void;

type NetInfoMock = {
	addEventListener: jest.Mock<(fn: Handler) => void>;
	emit: Handler;
	fetch: jest.MockedFunction<() => Promise<NetInfoState>>;
};

const wifiState = {
	type: 'wifi',
	isConnected: true,
	details: {
		isConnectionExpensive: false,
	},
} as NetInfoState;

const cellularState = {
	type: 'cellular',
	isConnected: true,
	details: {
		isConnectionExpensive: true,
	},
} as NetInfoState;

const offlineState = {
	type: 'none',
	isConnected: false,
	details: null,
} as NetInfoState;

jest.mock(
	'@react-native-community/netinfo',
	(): NetInfoMock => {
		let bound: Handler = () => {};

		const addEventListener = jest.fn((fn: Handler) => {
			bound = fn;
			return () => {};
		});

		const ret = {
			NetInfoStateType: {
				unknown: 'unknown',
				none: 'none',
			},
			addEventListener,
			emit: (state: NetInfoState) => bound(state),
			fetch: jest.fn(),
		};
		return ret;
	},
);

describe('use-net-info', () => {
	describe('createNetInfoResolver', () => {
		let NetInfo: NetInfoMock;
		let createNetInfoResolver: () => (
			_obj: unknown,
			_vars: unknown,
			opts: { client: ApolloClient<object> },
		) => Promise<NetInfoType>;
		let client: ApolloClient<object>;

		beforeEach(() => {
			jest.resetModules();
			createNetInfoResolver = require('../use-net-info')
				.createNetInfoResolver;
			NetInfo = require('@react-native-community/netinfo');
			NetInfo.addEventListener.mockClear(); // ignore side-effects form module load
			client = new ApolloClient({
				cache: new InMemoryCache(),
				link: NON_IMPLEMENTED_LINK,
				resolvers: {},
			});
			// Some mock data that the NetInfo resolver depends on.
			client.writeData({ data: { wifiOnlyDownloads: false } });
		});

		it('registers when resolver is called', () => {
			const resolve = createNetInfoResolver();
			resolve(null, null, { client });
			expect(NetInfo.addEventListener).toHaveBeenCalledTimes(1);
		});

		it('returns a promise with the first value of NetInfo.fetch()', async () => {
			const resolve = createNetInfoResolver();
			NetInfo.fetch.mockResolvedValue(wifiState);

			const state = await resolve(null, null, { client });
			expect(state).toEqual({
				__typename: 'NetInfo',
				...wifiState,
				downloadBlocked: DownloadBlockedStatus.NotBlocked,
				isDevButtonShown: false,
				isForcedOffline: false,
				setIsDevButtonShown: expect.any(Function),
				setIsForcedOffline: expect.any(Function),
				isPoorConnection: false,
			});
		});

		it('returns the latest value of the emitter as a promise', async () => {
			const resolve = createNetInfoResolver();
			NetInfo.fetch.mockResolvedValue(wifiState);
			await resolve(null, null, { client });

			NetInfo.fetch.mockResolvedValue(cellularState);
			NetInfo.emit(cellularState);

			const state = await resolve(null, null, { client });
			expect(state).toEqual({
				__typename: 'NetInfo',
				...cellularState,
				downloadBlocked: DownloadBlockedStatus.NotBlocked,
				isDevButtonShown: false,
				isForcedOffline: false,
				setIsDevButtonShown: expect.any(Function),
				setIsForcedOffline: expect.any(Function),
				isPoorConnection: false,
			});
		});

		it('updates Apollo client with the the latest value', async () => {
			const resolve = createNetInfoResolver();
			NetInfo.fetch.mockResolvedValue(wifiState);
			await resolve(null, null, { client });

			const query = gql`
				{
					netInfo @client {
						type @client
						details @client
						isConnected @client
					}
				}
			`;

			NetInfo.fetch.mockResolvedValue(cellularState);
			NetInfo.emit(cellularState);
			await Promise.resolve();

			const res = client.cache.readQuery<any>({
				query,
			});
			expect(res.netInfo).toEqual({
				...cellularState,
				__typename: 'NetInfo',
			});
		});

		it('applies the setForceOffline() override', async () => {
			const resolve = createNetInfoResolver();
			NetInfo.fetch.mockResolvedValue(wifiState);
			let state = await resolve(null, null, { client });

			state.setIsForcedOffline(true);

			state = await resolve(null, null, { client });
			expect(state).toEqual({
				__typename: 'NetInfo',
				...offlineState,
				downloadBlocked: DownloadBlockedStatus.Offline,
				isDevButtonShown: false,
				isForcedOffline: true,
				setIsDevButtonShown: expect.any(Function),
				setIsForcedOffline: expect.any(Function),
				isPoorConnection: false,
			});
		});
	});
});
