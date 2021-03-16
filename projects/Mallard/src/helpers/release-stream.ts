import { NativeModules, Platform } from 'react-native';
import { ANDROID_RELEASE_STREAM } from 'src/constants';

export const isInTestFlight = () =>
	NativeModules.RNReleaseStream.getReleaseStream === 'TESTFLIGHT';

export const isInBeta = () =>
	__DEV__ ||
	Platform.select({
		ios: isInTestFlight(),
		android: ANDROID_RELEASE_STREAM === 'DEBUG',
	});
