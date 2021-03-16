import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { fetchDeprecationWarning } from 'src/helpers/fetch';
import { ScreenTracking, sendAppScreenEvent } from 'src/services/ophan';

const useDeprecationModal = (): {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
} => {
	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		fetchDeprecationWarning().then(
			(buildNumbers: { ios: string; android: string }) => {
				const platformDeprecationBuildNumber =
					Platform.OS === 'ios' && buildNumbers
						? buildNumbers.ios
						: buildNumbers.android;
				const buildNumber = DeviceInfo.getBuildNumber();
				console.warn('Build:' + DeviceInfo.getBuildNumber());
				if (
					!__DEV__ &&
					buildNumber &&
					buildNumber <= platformDeprecationBuildNumber
				) {
					setShowModal(true);
					sendAppScreenEvent({
						screenName: ScreenTracking.Deprecation,
					});
				}
			},
		);
	}, []);

	return {
		showModal,
		setShowModal,
	};
};

export { useDeprecationModal };
