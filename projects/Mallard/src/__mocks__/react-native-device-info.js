export default {
	getBundleId: jest.fn().mockReturnValue('com.guardian.gce'),
	getUniqueId: jest
		.fn()
		.mockReturnValue('FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9'),
	getSystemVersion: jest.fn().mockReturnValue('13.3'),
	getVersion: jest.fn().mockReturnValue('3.1'),
	getBuildNumber: jest.fn().mockReturnValue('666'),
	getDeviceId: jest.fn().mockReturnValue('iPad4,1'),
	isTablet: jest.fn(),
};
