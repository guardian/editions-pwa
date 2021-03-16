import DeviceInfo from 'react-native-device-info';
import type { CASExpiry } from '../../../Apps/common/src/cas-expiry';
import { CAS_ENDPOINT_URL } from '../constants';

interface CasErrorResponse {
	error: {
		message: string;
		code: number;
	};
}

/**
 * DO NOT USE THIS DIRECTLY
 *
 * In most cases you will want to use the method that caches the result of this request
 * in order that re-authentication can use the cached credentials
 */
const fetchCasSubscription = async (
	subscriberID: string,
	password: string,
): Promise<CASExpiry> => {
	const appId = DeviceInfo.getBundleId();
	const deviceId = DeviceInfo.getUniqueId();

	const res = await fetch(CAS_ENDPOINT_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			appId,
			deviceId,
			subscriberId: subscriberID,
			password: password,
		}),
	});

	const json = await res.json();

	if (res.status !== 200) {
		const casErrorRes: CasErrorResponse = json;
		throw new Error(
			casErrorRes.error
				? casErrorRes.error.message
				: 'Something went wrong',
		);
	}

	return json.expiry;
};

export { fetchCasSubscription };
