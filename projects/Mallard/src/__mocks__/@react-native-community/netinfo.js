module.exports = {
	getCurrentState: jest.fn(() => Promise.resolve()),
	addListener: jest.fn(),
	removeListeners: jest.fn(),
	NetInfoStateType: {
		unknown: 'unknown',
	},
	fetch: jest.fn(() => Promise.resolve(true)),
};
