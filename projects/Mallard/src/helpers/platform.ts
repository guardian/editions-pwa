import { Platform } from 'react-native';

export const iosMajorVersion =
	Platform.OS === 'ios' ? parseInt(Platform.Version as string, 10) : 0;
