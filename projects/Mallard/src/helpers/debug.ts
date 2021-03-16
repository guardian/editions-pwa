import type { SFC } from 'react';
import { memo } from 'react';

type DiffEntry<Props, K extends keyof Props> = {
	key: K;
	prev: Props[K];
	next: Props[K];
};

type Diff<Props extends object> = Array<DiffEntry<Props, keyof Props>>;

/**
 * This will help to log the difference between props on subsequent renders.
 *
 * It (ab)uses, React.memo to get access to the prev / next props and you
 * use it just as you would use React.memo, except the second argument
 * passes through those prev / next props _and_ an array of diffs to log.
 *
 * If you only want to log the diffs of one specific component instance you can
 * use the props to log conditionally e.g. comparing against a specific article id
 */
const logPropDiff = <T extends object>(
	component: SFC<T>,
	log: (prevProps: T, nextProps: T, diff: Diff<T>) => boolean = () => true,
) =>
	memo(component, (prevProps, nextProps) => {
		const allKeys = Object.keys(prevProps).concat(
			Object.keys(nextProps),
		) as Array<keyof T>;

		const diff: Diff<T> = [];

		for (const key of allKeys) {
			const prev = prevProps[key];
			const next = nextProps[key];
			if (!Object.is(prev, next)) {
				diff.push({
					key,
					prev,
					next,
				});
			}
		}

		log(prevProps, nextProps, diff);

		return false;
	});

export { logPropDiff };
