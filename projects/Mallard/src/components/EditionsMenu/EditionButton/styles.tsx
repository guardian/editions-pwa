import { brand, neutral } from '@guardian/src-foundations';
import { StyleSheet } from 'react-native';
import { families } from 'src/theme/typography';

export const EDITIONS_MENU_TEXT_LEFT_PADDING = 75;
const imageWidth = 75;
const imageHeight = 150;

const styles = (selected: boolean, special: boolean, titleColor: string) => {
	return StyleSheet.create({
		container: {
			borderColor: selected ? brand[400] : neutral[86],
			borderWidth: selected ? 4 : 1,
			borderRadius: 3,
			paddingBottom: special ? 8 : 30,
			paddingTop: special ? 14 : 10,
			flexDirection: 'row',
		},
		imageContainer: {
			width: EDITIONS_MENU_TEXT_LEFT_PADDING,
			marginRight: 13,
		},
		textContainer: {
			flex: 1,
		},
		title: {
			fontSize: special ? 32 : 20,
			lineHeight: special ? 34 : 20,
			fontFamily: special
				? families.headline.medium
				: families.titlepiece.regular,
			marginBottom: 5,
			color: titleColor,
		},
		subTitle: {
			flexWrap: 'wrap',
			paddingRight: 20,
			color: neutral[7],
		},
		expiry: {
			flexWrap: 'wrap',
			paddingRight: 20,
			color: neutral[46],
		},
		image: {
			width: imageWidth,
			height: imageHeight,
		},
	});
};

export { styles };
