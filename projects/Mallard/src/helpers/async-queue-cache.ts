/**
 * This is a class based around the asyncCache in helpers/storage.ts.
 * This provides a base class to inherit for JSON like Async Storage data structures
 */

import { errorService } from 'src/services/errors';

type AsyncQueueCache = {
	set: (value: any) => Promise<void>;
	get: () => Promise<any>;
	reset: () => Promise<void>;
};

class AsyncQueue {
	private cache: AsyncQueueCache;

	constructor(cache: AsyncQueueCache) {
		this.cache = cache;
	}

	async getQueuedItems(): Promise<object[]> {
		try {
			return (await this.cache.get()) || [{}];
		} catch (e) {
			return [{}];
		}
	}

	async saveQueuedItems(item: object[]): Promise<void | Error> {
		try {
			return await this.cache.set(item);
		} catch (e) {
			errorService.captureException(e);
			throw new Error(e);
		}
	}

	async queueItems(item: object[]) {
		try {
			const parsedQueue = await this.getQueuedItems();
			const newQueue = [...parsedQueue, ...item];
			const cleanLogs = newQueue.filter(
				(value) => Object.keys(value).length !== 0,
			);
			return cleanLogs;
		} catch (e) {
			errorService.captureException(e);
			throw new Error(e);
		}
	}

	filterByMaxNumberAndSaveItems(itemsToStore: object[], maxNumber: number) {
		if (itemsToStore.length > maxNumber) {
			const startIndex = itemsToStore.length - maxNumber;
			return itemsToStore.slice(startIndex);
		}
		return itemsToStore;
	}

	async upsertQueuedItems(
		item: object[],
		maxNumber?: number,
	): Promise<void | Error> {
		try {
			const itemsToStore = await this.queueItems(item);

			if (maxNumber) {
				const reducedItemsToStore = this.filterByMaxNumberAndSaveItems(
					itemsToStore,
					maxNumber,
				);
				return this.saveQueuedItems(reducedItemsToStore);
			}

			return this.saveQueuedItems(itemsToStore);
		} catch (e) {
			errorService.captureException(e);
			throw new Error(e);
		}
	}

	async clearItems() {
		try {
			return await this.cache.reset();
		} catch (e) {
			errorService.captureException(e);
			throw new Error(e);
		}
	}
}

export { AsyncQueue };
