import { brand } from '@guardian/src-foundations/palette';
import React, { useState } from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { TitlepieceText, UiExplainerCopy } from 'src/components/styled-text';
import { localDate } from 'src/helpers/date';
import { styles } from './styles';

interface Props {
	expiry?: Date;
	imageUri?: string;
	onPress: () => void;
	selected?: boolean;
	subTitle: string;
	title: string;
	titleColor?: string;
	isSpecial?: boolean;
}

const EditionButton: React.FC<Props> = ({
	title,
	subTitle,
	imageUri,
	expiry,
	titleColor = brand[400],
	isSpecial = false,
	selected,
	onPress,
}) => {
	const [pressed, setPressed] = useState(false);
	const defaultStyles = styles(selected || pressed, isSpecial, titleColor);

	return (
		<TouchableWithoutFeedback
			accessibilityRole="button"
			accessibilityLabel={`${title} - Edition Button`}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			onPress={onPress}
		>
			<View style={defaultStyles.container}>
				<View style={defaultStyles.imageContainer}>
					{imageUri && (
						<Image
							key={imageUri}
							resizeMethod={'resize'}
							style={defaultStyles.image}
							source={{ uri: imageUri }}
						/>
					)}
				</View>
				<View style={defaultStyles.textContainer}>
					<TitlepieceText style={defaultStyles.title}>
						{title}
					</TitlepieceText>
					<UiExplainerCopy style={defaultStyles.subTitle}>
						{subTitle}
					</UiExplainerCopy>
					{expiry && (
						<UiExplainerCopy style={defaultStyles.expiry}>
							Available until {localDate(expiry)}
						</UiExplainerCopy>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export { EditionButton };
