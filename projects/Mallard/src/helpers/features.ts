import { Platform } from 'react-native';

export const supportsAnimatedClipView = () => Platform.OS === 'ios';

export const areEqualShallow = <A>(
	a: A,
	b: { [key in keyof A]: unknown },
): boolean => {
	for (const key in a) {
		if (a[key] !== b[key]) {
			return false;
		}
	}
	return true;
};
