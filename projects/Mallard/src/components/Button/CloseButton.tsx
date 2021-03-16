import React from 'react';
import type { ArticlePillar } from '../../../../Apps/common/src';
import { Button, ButtonAppearance } from './Button';

const CloseButton = ({
	onPress,
	appearance,
	accessibilityLabel,
	accessibilityHint,
	pillar,
}: {
	onPress: () => void;
	appearance?: ButtonAppearance;
	accessibilityLabel: string;
	accessibilityHint: string;
	pillar?: ArticlePillar;
}) => {
	return (
		<Button
			icon={'\uE04F'}
			alt="Dismiss"
			appearance={appearance || ButtonAppearance.default}
			onPress={onPress}
			accessibilityLabel={accessibilityLabel}
			accessibilityRole="button"
			accessibilityHint={accessibilityHint}
			pillar={pillar || null}
		/>
	);
};

export { CloseButton };
