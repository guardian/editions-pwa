export enum Breakpoints {
	smallPhone = 0,
	phone = 375,
	tabletVertical = 690,
	tabletLandscape = 1000,
}

export const MINIMUM_BREAKPOINT: number = Breakpoints.smallPhone;

export type BreakpointList<T> = Record<number, T>;

export const getClosestBreakpoint = (breakpoints: number[], size: number) => {
	let max = MINIMUM_BREAKPOINT;
	for (const key of breakpoints) {
		if (size >= key) {
			max = key;
		}
	}
	return max;
};

export const pickClosestBreakpoint = <T>(
	breakpoints: BreakpointList<T>,
	size: number,
) =>
	breakpoints[
		getClosestBreakpoint(
			(Object.keys(breakpoints) as unknown[]) as number[],
			size,
		)
	];
