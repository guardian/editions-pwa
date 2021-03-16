import { Platform, StatusBar } from 'react-native';
import { toSize } from 'src/common';
import { iosMajorVersion } from 'src/helpers/platform';
import { getFont } from './typography';

const spacing = [0, 3, 6, 12, 18, 30];

const headerHeight = spacing[5];
const basicMetrics = {
	horizontal: 14,
	vertical: 10,
};

const buttonHeight = getFont('sans', 1).fontSize + basicMetrics.vertical * 2.5;
const sides = basicMetrics.horizontal;

// FIXME - iOS13 and above hack for dodgy background scale issue
const slideCardSpacing = () => {
	if (Platform.OS === 'ios' && iosMajorVersion >= 13) {
		return 40;
	} else if (Platform.OS === 'ios') {
		return spacing[5];
		// Not sure about this line, but should remove the final else if we keep it after multi device testing
	} else if (Platform.OS === 'android') {
		return 20;
	} else {
		return StatusBar.currentHeight || spacing[5] + spacing[5];
	}
};

export const metrics = {
	...basicMetrics,
	headerHeight,
	buttonHeight,
	sides,
	radius: 10,
	article: {
		sides,
		maxWidth: 800,
		rightRail: 180 + sides,
		railPaddingLeft: sides * 1.5,
		standfirstBottom: basicMetrics.vertical * 1.5,
	},
	fronts: {
		sides: basicMetrics.horizontal * 1.5,
		marginBottom: basicMetrics.horizontal * 2,
		cardSize: toSize(540, 510),
		cardSizeTablet: toSize(650, 646),
		circleButtonDiameter: 36,
	},
	gridRowSplit: {
		narrow: (width: number) => width * 0.65,
		wide: 240,
	},
	slideCardSpacing: slideCardSpacing(),
};
