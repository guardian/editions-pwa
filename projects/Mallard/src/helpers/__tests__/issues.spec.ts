import MockDate from 'mockdate';
import { todayAsFolder, lastNDays, todayAsKey } from '../issues';

describe('helpers/issues', () => {
	describe('todayAsFolder', () => {
		it('should return "today\'s" date in the correct format', () => {
			MockDate.set('2000-11-22');
			expect(todayAsFolder()).toEqual('2000-11-22');
		});
	});

	describe('lastNDays', () => {
		it('should give the last seven days, including today in the correct format', () => {
			MockDate.set('2019-08-21');
			expect(lastNDays(7)).toEqual([
				'2019-08-21',
				'2019-08-20',
				'2019-08-19',
				'2019-08-18',
				'2019-08-17',
				'2019-08-16',
				'2019-08-15',
			]);
		});
	});

	describe('todayAsKey', () => {
		it('should return a key in the correct format for "todays" date', async () => {
			MockDate.set('2019-08-21');
			const funcToTest = await todayAsKey();
			expect(funcToTest).toEqual('daily-edition/2019-08-21');
		});
	});
});
