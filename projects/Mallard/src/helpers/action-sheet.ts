import { ActionSheetIOS, Alert, Platform } from 'react-native';

/**
 * iOS action sheets have not parallel on Android so just replace them with
 * an Alert
 *
 * For android we `reverse` the options so that the cancel option is on the left
 * and the "top" action is on the right.
 */
const runActionSheet = (
	title: string,
	message: string,
	options: Array<{ text: string; onPress: () => void }>,
) => {
	const optionsWithCancel = options.concat({
		text: 'Cancel',
		onPress: () => {},
	});
	return Platform.select({
		ios: () =>
			ActionSheetIOS.showActionSheetWithOptions(
				{
					options: optionsWithCancel.map(({ text }) => text),
					title,
					message,
					cancelButtonIndex: options.length,
				},
				async (index) =>
					index !== options.length && options[index].onPress(),
			),
		android: () =>
			Alert.alert(title, message, optionsWithCancel.slice().reverse()),
	})();
};

export { runActionSheet };
