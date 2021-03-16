import { AsyncQueue } from '../async-queue-cache';

jest.mock('src/services/errors', () => ({
	captureException: jest.fn(),
}));

const mockCache = {
	set: () => Promise.resolve(),
	get: () => Promise.resolve(),
	reset: () => Promise.resolve(),
};

const items = [{ test: 1 }, { test: 2 }, { test: 3 }, { test: 4 }, { test: 5 }];

describe('AsyncQueue', () => {
	describe('filterByMaxNumberAndSaveItems', () => {
		it('should return items if the number of items are less than the max number', () => {
			const queue = new AsyncQueue(mockCache);
			expect(queue.filterByMaxNumberAndSaveItems(items, 6)).toEqual(
				items,
			);
		});
		it('should return items if the number of items are equal to the max number', () => {
			const queue = new AsyncQueue(mockCache);
			expect(queue.filterByMaxNumberAndSaveItems(items, 5)).toEqual(
				items,
			);
		});
		it('should return remove items from the front if items are more than the max number', () => {
			const queue = new AsyncQueue(mockCache);
			const expectedItems = [
				{ test: 2 },
				{ test: 3 },
				{ test: 4 },
				{ test: 5 },
			];
			console.log(queue.filterByMaxNumberAndSaveItems(items, 4));
			expect(queue.filterByMaxNumberAndSaveItems(items, 4)).toEqual(
				expectedItems,
			);
		});
	});
});
