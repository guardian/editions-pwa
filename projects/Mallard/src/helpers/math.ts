export const clamp = (number: number, min: number, max: number) => {
	if (number > max) return max;
	if (number < min) return min;
	return number;
};

export const isSafeValue = (value: unknown): value is number => {
	if (!isFinite(value as number)) {
		return false;
	}
	return true;
};

export const safeValue = (value: unknown, fallback: number): number => {
	if (!isSafeValue(value)) {
		return fallback;
	}
	return value;
};

export const safeInterpolation = (values: unknown[]): number[] => {
	for (const value of values) {
		if (!isSafeValue(value)) {
			return [...new Array(values.length - 1).fill(0), 1];
		}
	}
	return values as number[];
};
