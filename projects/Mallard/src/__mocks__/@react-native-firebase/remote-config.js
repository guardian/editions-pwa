export default () => ({
	getValue: () => ({
		asBoolean: () => jest.fn().mockReturnValue({ value: undefined }),
	}),
});
