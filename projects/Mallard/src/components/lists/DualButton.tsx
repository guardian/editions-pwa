import React from 'react';
import type { AccessibilityRole } from 'react-native';
import { Text, View } from 'react-native';
import { Highlight } from '../highlight';
import { UiBodyCopy } from '../styled-text';
import { styles } from './styles';

const DualButton = ({
	textPrimary,
	textSecondary,
	onPressPrimary,
	onPressSecondary,
	accessible = true,
	accessibilityRole = 'none',
}: {
	textPrimary: string;
	textSecondary: string;
	onPressPrimary: () => void;
	onPressSecondary: () => void;
	accessible: boolean;
	accessibilityRole: AccessibilityRole;
}) => (
	<View
		style={styles.buttonContainer}
		accessible={accessible}
		accessibilityRole={accessibilityRole}
	>
		<Highlight
			style={[styles.button, styles.buttonPrimary]}
			onPress={onPressPrimary}
		>
			<UiBodyCopy weight="bold" numberOfLines={1}>
				{textPrimary}
			</UiBodyCopy>
		</Highlight>
		<Highlight style={styles.button} onPress={onPressSecondary}>
			<Text style={styles.buttonSecondary}>{textSecondary}</Text>
		</Highlight>
	</View>
);

export { DualButton };
