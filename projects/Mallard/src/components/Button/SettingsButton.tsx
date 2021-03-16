import React from 'react';
import { Button, ButtonAppearance } from './Button';

const SettingsButton = ({ onPress }: { onPress: () => void }) => (
	<Button
		accessibilityLabel="Settings button"
		accessibilityHint="Navigates to the settings screen"
		accessibilityRole="button"
		icon={'\uE040'}
		alt="Settings"
		onPress={onPress}
		appearance={ButtonAppearance.skeleton}
	/>
);

export { SettingsButton };
