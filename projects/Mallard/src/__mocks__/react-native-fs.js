const existsMock = jest.fn();
existsMock.mockReturnValueOnce({ then: jest.fn() });

const mkDirMock = jest.fn();
mkDirMock.mockReturnValueOnce({ then: jest.fn(), catch: jest.fn() });

export default {
	mkdir: mkDirMock,
	exists: existsMock,
	unlink: jest.fn,
};
