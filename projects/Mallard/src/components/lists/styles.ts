import { Dimensions, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { getFont } from 'src/theme/typography';

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	button: {
		padding: metrics.horizontal,
		paddingVertical: metrics.vertical,
		marginVertical: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	buttonPrimary: {
		maxWidth: DeviceInfo.isTablet()
			? 300
			: Dimensions.get('screen').width * 0.75,
	},
	buttonSecondary: {
		color: color.ui.supportBlue,
		...getFont('sans', 1),
	},
});

export { styles };
