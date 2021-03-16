import { palette } from '@guardian/pasteup/palette';
import React from 'react';
import { StyleSheet } from 'react-native';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { Button } from '../Button/Button';

const baseButtonStyles = StyleSheet.create({
	buttonContainer: {
		flex: 0,
		marginRight: metrics.horizontal / 2,
		alignSelf: 'flex-start',
	},
	button: {
		marginBottom: 10,
	},
});

const customButtonStyles = {
	cta: StyleSheet.create({
		buttonStyles: {
			backgroundColor: color.primary,
		},
		textStyle: {
			color: palette.neutral[100],
		},
	}),
	default: StyleSheet.create({
		buttonStyles: {
			borderColor: color.primary,
			borderWidth: 1,
			backgroundColor: palette.neutral[100],
		},
		textStyle: {
			color: color.primary,
		},
	}),
};

const LoginButton = ({
	type = 'default',
	onPress,
	children,
}: {
	type?: keyof typeof customButtonStyles;
	onPress: () => void;
	children: string;
}) => (
	<Button
		center
		style={baseButtonStyles.buttonContainer}
		buttonStyles={[
			baseButtonStyles.button,
			customButtonStyles[type].buttonStyles,
		]}
		textStyles={customButtonStyles[type].textStyle}
		onPress={onPress}
	>
		{children}
	</Button>
);

export { LoginButton };
