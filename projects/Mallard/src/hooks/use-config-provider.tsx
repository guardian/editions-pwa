import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getSetting, storeSetting } from 'src/helpers/settings';
import { notificationsEnabledCache } from 'src/helpers/storage';
import { errorService } from 'src/services/errors';
import { Breakpoints } from 'src/theme/breakpoints';

const oneGB = 1073741824;
const IS_APPS_RENDERING = 'isAppsRendering';

interface ConfigState {
	largeDeviceMemeory: boolean;
	dimensions: {
		width: number;
		height: number;
		scale: number;
		fontScale: number;
	};
	notificationsEnabled: boolean;
	setNotifications: (setting: boolean) => Promise<void>;
	isAppsRendering: boolean;
	storeisAppsRendering: (setting: boolean) => void;
}

const notificationInitialState = () =>
	Platform.OS === 'android' ? true : false;

const initialState: ConfigState = {
	largeDeviceMemeory: false,
	dimensions: {
		width: 0,
		height: 0,
		scale: 0,
		fontScale: 0,
	},
	notificationsEnabled: notificationInitialState(),
	setNotifications: () => Promise.resolve(),
	isAppsRendering: false,
	storeisAppsRendering: () => {},
};

const ConfigContext = createContext(initialState);

export const largeDeviceMemory = () => {
	return DeviceInfo.getTotalMemory().then(
		(deviceMemory) => deviceMemory > oneGB,
	);
};

export const notificationsAreEnabled = async () => {
	if (Platform.OS !== 'android') {
		return false;
	}
	const isEnabled = await notificationsEnabledCache.get();
	return isEnabled || false;
};

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
	const [largeDeviceMemeory, setLargeDeviceMemory] = useState(false);
	const [dimensions, setDimensions] = useState(Dimensions.get('window'));
	const [notificationsEnabled, setNotificationsEnabled] = useState(
		notificationInitialState(),
	);
	const [isAppsRendering, setIsAppsRendering] = useState(false);

	const storeisAppsRendering = async (setting: boolean) => {
		await storeSetting(IS_APPS_RENDERING, setting);
		setIsAppsRendering(setting);
	};

	const setNotifications = async (setting: boolean) => {
		try {
			await notificationsEnabledCache.set(setting);
			setNotificationsEnabled(setting);
		} catch (e) {
			console.log(e);
			e.message = `Unable to Set Notifications Enabled: ${e.message}`;
			errorService.captureException(e);
		}
	};

	useEffect(() => {
		notificationsAreEnabled().then((setting) =>
			setNotificationsEnabled(setting),
		);
	}, []);

	useEffect(() => {
		largeDeviceMemory().then((deviceMemory) =>
			setLargeDeviceMemory(deviceMemory),
		);
	}, []);
	useEffect(() => {
		const listener = (
			ev: Parameters<
				Parameters<typeof Dimensions.addEventListener>[1]
			>[0],
		) => {
			/*
            this fixes this issue:
            https://trello.com/c/iEtMz9TH/867-video-stretched-on-ios-and-android-crash-on-orientation-change

            this means we will never relayout on smaller screens. For now this is ok
            because our screen size assumptions are a 1:1 match with iphone/ipad and
            a good enough™ match on android

            a more elegant fix would be to detect when a full screen video/photo
            is playing, basically anything that enables rotation when
            things below it should not rotate, and not relayout then.
            */
			if (
				Math.min(ev.window.width, ev.window.height) >=
				Breakpoints.tabletVertical
			) {
				setDimensions(ev.window);
			}
		};
		Dimensions.addEventListener('change', listener);
		return () => {
			Dimensions.removeEventListener('change', listener);
		};
	}, []);

	useEffect(() => {
		getSetting(IS_APPS_RENDERING).then((result) => {
			setIsAppsRendering(result);
		});
	}, []);

	return (
		<ConfigContext.Provider
			value={{
				largeDeviceMemeory,
				dimensions,
				notificationsEnabled,
				setNotifications,
				isAppsRendering,
				storeisAppsRendering,
			}}
		>
			{children}
		</ConfigContext.Provider>
	);
};

export const useLargeDeviceMemory = () =>
	useContext(ConfigContext).largeDeviceMemeory;

export const useDimensions = () => useContext(ConfigContext).dimensions;

export const useNotificationsEnabled = () => ({
	notificationsEnabled: useContext(ConfigContext).notificationsEnabled,
	setNotifications: useContext(ConfigContext).setNotifications,
});

export const useIsAppsRendering = () => ({
	isAppsRendering: useContext(ConfigContext).isAppsRendering,
	setIsAppsRendering: useContext(ConfigContext).storeisAppsRendering,
});
