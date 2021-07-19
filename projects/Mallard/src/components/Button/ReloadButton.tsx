import React from 'react';
import { View } from 'react-native';
import { useInsets } from 'src/hooks/use-screen';
import { Button, ButtonAppearance } from './Button';

export const ReloadButton: React.FC<{
	onPress: () => void;
}> = ({ onPress }) => {
	const { top, left } = useInsets();
	return (
		<View
			style={[
				{
					position: 'absolute',
					top: top + 20,
					right: 70,
					zIndex: 99999,
				},
			]}
		>
			<Button
				appearance={ButtonAppearance.Tomato}
				onPress={onPress}
				buttonStyles={{ left: 0 }}
			>
				Reload
			</Button>
		</View>
	);
};
