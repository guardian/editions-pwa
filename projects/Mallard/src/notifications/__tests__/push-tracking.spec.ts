import MockDate from 'mockdate';
import { findLastXDaysPushTracking } from '../push-tracking';
import { NetInfoStateType } from '@react-native-community/netinfo';

const fixtures = [
	{
		time: '2020-01-04T12:43:01Z',
		id: 'unzipImages',
		value: 'complete',
		networkStatus: NetInfoStateType.wifi,
	},
	{
		time: '2020-01-03T12:43:01Z',
		id: 'unzipImages',
		value: 'complete',
		networkStatus: NetInfoStateType.wifi,
	},
	{
		time: '2020-01-02T12:43:01Z',
		id: 'unzipImages',
		value: 'complete',
		networkStatus: NetInfoStateType.wifi,
	},
	{
		time: '2020-01-01T12:43:01Z',
		id: 'unzipImages',
		value: 'complete',
		networkStatus: NetInfoStateType.wifi,
	},
	{
		time: '2019-12-31T12:43:01Z',
		id: 'unzipImages',
		value: 'complete',
		networkStatus: NetInfoStateType.wifi,
	},
	{
		time: '2019-12-30T12:43:01Z',
		id: 'unzipImages',
		value: 'complete',
		networkStatus: NetInfoStateType.wifi,
	},
	{
		time: '2019-12-29T12:43:01Z',
		id: 'unzipImages',
		value: 'complete',
		networkStatus: NetInfoStateType.wifi,
	},
	{
		time: '2019-12-28T12:43:01Z',
		id: 'unzipImages',
		value: 'complete',
		networkStatus: NetInfoStateType.wifi,
	},
];

describe('helpers/push-tracking', () => {
	describe('findLastXDaysPushTracking', () => {
		beforeEach(() => MockDate.set('2020-01-04'));

		it('should return only last 7 days of tracking by default', () => {
			const lastSevenDays = findLastXDaysPushTracking(fixtures);
			expect(lastSevenDays).toEqual(fixtures.slice(0, 7));
		});
		it('should return an empty array if there is no tracking available inside of the default 7 day period', () => {
			const outsideOfScope = findLastXDaysPushTracking([fixtures[7]]);
			expect(outsideOfScope).toEqual([]);
		});
		it('should return only 2 days worth of tracking if 2 days are selected', () => {
			const lastTwoDays = findLastXDaysPushTracking(fixtures, 2);
			expect(lastTwoDays).toEqual(fixtures.slice(0, 2));
		});
	});
});
