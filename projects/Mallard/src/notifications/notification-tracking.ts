import { notificationTrackingUrl } from 'src/helpers/settings/defaults';

const notificationTracking = (
	notificationId: string,
	type: 'received' | 'downloaded',
) => {
	const url = notificationTrackingUrl(notificationId, type);
	return fetch(url);
};

export { notificationTracking };
