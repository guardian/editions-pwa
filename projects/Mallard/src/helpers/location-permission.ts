import type { ApolloClient } from 'apollo-client';
import { Platform } from 'react-native';
import type { PermissionStatus } from 'react-native-permissions';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import { refreshWeather } from './weather';

const LOCATION_PERMISSION = Platform.select({
	ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
	android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
});

const { resolveLocationPermissionStatus, requestLocationPermission } = (() => {
	let promise: Promise<PermissionStatus> | undefined;

	const resolveLocationPermissionStatus = () => {
		if (promise) return promise;
		promise = check(LOCATION_PERMISSION);
		return promise;
	};

	const requestLocationPermission = async (
		apolloClient: ApolloClient<object>,
	): Promise<PermissionStatus> => {
		promise = request(LOCATION_PERMISSION);
		const result = await promise;
		apolloClient.writeData({
			data: {
				locationPermissionStatus: result,
			},
		});
		refreshWeather(apolloClient);
		return result;
	};

	return { resolveLocationPermissionStatus, requestLocationPermission };
})();

export { resolveLocationPermissionStatus, requestLocationPermission };
