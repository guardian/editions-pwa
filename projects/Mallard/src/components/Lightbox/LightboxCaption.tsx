import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { ArticleTheme } from 'src/components/article/html/article';
import { NativeArrow } from 'src/components/article/html/components/icon/native-arrow';
import { themeColors } from 'src/components/article/html/helpers/css';
import { families } from 'src/theme/typography';
import { Direction } from '../../../../Apps/common/src';

const styles = StyleSheet.create({
	captionWrapper: {
		fontFamily: families.text.regular,
		position: 'absolute',
		zIndex: 1,
		opacity: 0.8,
		backgroundColor: themeColors(ArticleTheme.Dark).background,
		bottom: 0,
		width: '100%',
		padding: 10,
	},
	captionText: {
		color: themeColors(ArticleTheme.Dark).text,
		paddingLeft: 2,
		paddingRight: 13,
	},
	caption: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingBottom: 50,
	},
});

const captionStyleSheet = (pillarColor: string) => {
	return StyleSheet.create({
		caption: {
			fontFamily: families.sans.regular,
			color: themeColors(ArticleTheme.Dark).text,
			fontSize: Platform.OS === 'android' ? 16 : 14,
		},
		b: {
			fontFamily: families.sans.bold,
			color: themeColors(ArticleTheme.Dark).text,
		},
		strong: {
			fontFamily: families.sans.bold,
			color: themeColors(ArticleTheme.Dark).text,
			paddingLeft: 12,
		},
		a: {
			color: pillarColor,
			textDecorationLine: 'underline',
			textDecorationColor: pillarColor,
		},
		em: {
			fontFamily: families.sans.regularItalic,
		},
	});
};

const LightboxCaption = ({
	caption,
	pillarColor,
	displayCredit,
	credit,
}: {
	caption: string;
	pillarColor: string;
	displayCredit?: boolean;
	credit?: string;
}) => {
	const captionStyles = captionStyleSheet(pillarColor);
	const captionText = () => {
		if (displayCredit === true && credit) {
			return caption + ' ' + credit;
		} else {
			return caption;
		}
	};
	return (
		<View style={styles.captionWrapper}>
			<View style={styles.caption}>
				{caption.length > 1 && (
					<NativeArrow
						fill={pillarColor}
						direction={Direction.top}
						marginTop={Platform.OS === 'android' ? 10 : 4}
					/>
				)}
				<View style={styles.captionText}>
					<HTMLView
						value={'<caption>' + captionText() + '</caption>'}
						stylesheet={captionStyles}
					/>
				</View>
			</View>
		</View>
	);
};

export { LightboxCaption };
