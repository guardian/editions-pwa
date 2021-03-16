import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useArticle } from 'src/hooks/use-article';
import { useAspectRatio } from 'src/hooks/use-aspect-ratio';
import { useImagePath } from 'src/hooks/use-image-paths';
import { color } from 'src/theme/color';
import type { CreditedImage } from '../../common';
import { Button } from '../Button/Button';
import { UiBodyCopy } from '../styled-text';

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: 'black',
		width: '100%',
	},
	credit: {
		color: color.palette.neutral[100],
		zIndex: 1,
		backgroundColor: 'black',
		height: '100%',
		padding: 10,
	},
	button: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		zIndex: 2,
	},
	buttonText: {
		color: color.palette.neutral[100],
	},
	proxy: { position: 'absolute', bottom: 0, left: 0 },
});

interface PropTypes {
	image: CreditedImage;
	style?: {};
	proxy?: ReactNode;
	aspectRatio?: number;
}

const ArticleImage = ({ image, style, proxy, aspectRatio }: PropTypes) => {
	const path = useImagePath(image);
	const defaultAspectRatio = useAspectRatio(path);

	const [showCredit, setShowCredit] = useState(false);
	const toggleCredit = () => setShowCredit((curr) => !curr);
	const [colors] = useArticle();

	return (
		<View
			style={[
				style,
				styles.wrapper,
				{ aspectRatio: aspectRatio ? aspectRatio : defaultAspectRatio },
			]}
		>
			{image.credit && (
				<UiBodyCopy
					weight="bold"
					style={[
						styles.credit,
						{
							display: showCredit ? 'flex' : 'none',
						},
					]}
				>
					{image.credit}
				</UiBodyCopy>
			)}
			<ImageBackground
				resizeMethod={'resize'}
				style={[
					StyleSheet.absoluteFillObject,
					{
						display: showCredit ? 'none' : 'flex',
					},
				]}
				source={{
					uri: path,
				}}
			>
				{proxy && <View style={styles.proxy}>{proxy}</View>}
			</ImageBackground>
			{image.credit && (
				<Button
					accessibilityLabel="Image captions button"
					accessibilityHint="Tells you the image credits and description"
					accessibilityRole="button"
					alt="Toggle credit"
					icon={showCredit ? '' : ''}
					onPress={toggleCredit}
					style={styles.button}
					buttonStyles={{
						backgroundColor: colors.bright,
					}}
					textStyles={styles.buttonText}
				/>
			)}
		</View>
	);
};

const CoverImage = ({
	small,
	...props
}: Omit<PropTypes, 'style' | 'aspectRatio'> & { small?: boolean }) => {
	return <ArticleImage {...props} aspectRatio={small ? 1.18 : 0.95} />;
};

export { ArticleImage, CoverImage };
