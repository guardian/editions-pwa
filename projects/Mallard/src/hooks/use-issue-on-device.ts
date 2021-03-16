import { useEffect, useState } from 'react';
import { isIssueOnDevice } from 'src/helpers/files';

export enum ExistsStatus {
	pending,
	doesExist,
	doesNotExist,
}

class LocalIssueListStore {
	private issues: Map<string, ExistsStatus> = new Map();
	private subscribers: Array<() => void> = [];

	getStatus(key: string) {
		const status = this.issues.get(key);
		if (status) return status;
		this.issues.set(key, ExistsStatus.pending);
		this.query(key);
		return ExistsStatus.pending;
	}

	private async query(key: string) {
		const is = await isIssueOnDevice(key);
		if (this.issues.get(key)) return;
		this.issues.set(
			key,
			is ? ExistsStatus.doesExist : ExistsStatus.doesNotExist,
		);
		this.updateListeners();
	}

	add(key: string) {
		this.issues.set(key, ExistsStatus.doesExist);
		this.updateListeners();
	}

	reset() {
		this.issues.forEach((_, k) =>
			this.issues.set(k, ExistsStatus.doesNotExist),
		);
		this.updateListeners();
	}

	remove(key: string) {
		this.issues.set(key, ExistsStatus.doesNotExist);
		this.updateListeners();
	}

	subscribe(fn: () => void) {
		this.subscribers.push(fn);
		return () => {
			this.subscribers = this.subscribers.filter((sub) => sub !== fn);
		};
	}
	updateListeners() {
		this.subscribers.forEach((sub) => sub());
	}
}

export const localIssueListStore = new LocalIssueListStore();

const useIssueOnDevice = (localId: string) => {
	const [status, setStatus] = useState(
		localIssueListStore.getStatus(localId),
	);

	useEffect(
		() =>
			localIssueListStore.subscribe(() => {
				const newStatus = localIssueListStore.getStatus(localId);
				setStatus(newStatus);
			}),
		[localId],
	);

	return status;
};

export { useIssueOnDevice };
