const getMockPromise = <T>(val: T) => jest.fn(() => Promise.resolve(val));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMockCache = <T>(val: T) => (buildNumber: string) => ({
	get: () => val,
	set: () => void 0,
	reset: () => true,
});

const getMockAsyncCache = <T>(val: T) => ({
	get: getMockPromise(val),
	set: getMockPromise(void 0),
	reset: getMockPromise(void 0),
});

const getMockStore = (val?: string) => ({
	get: getMockPromise(
		typeof val !== 'undefined' && {
			service: 's',
			username: 'u',
			password: val,
		},
	),
	set: getMockPromise(true),
	reset: getMockPromise(true),
});

const getOffsetDate = (offset: number) => {
	const other = new Date();
	other.setDate(new Date().getDate() + offset);
	return other;
};

const tomorrow = () => getOffsetDate(1);
const yesterday = () => getOffsetDate(-1);

export {
	getMockCache,
	getMockAsyncCache,
	getMockPromise,
	getMockStore,
	tomorrow,
	yesterday,
};
