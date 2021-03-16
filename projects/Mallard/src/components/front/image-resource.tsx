import React from 'react';
import type { ImageProps, ImageStyle, StyleProp } from 'react-native';
import { Image, View } from 'react-native';
import { useAspectRatio } from 'src/hooks/use-aspect-ratio';
import { useImagePath } from 'src/hooks/use-image-paths';
import type { Image as IImage, ImageUse } from '../../../../Apps/common/src';

/**
 * This component abstracts away the endpoint for images
 *
 * Bascially it will try to go to the filesystem and if it fails will
 * go to the API
 *
 */
type ImageResourceProps = {
	image: IImage;
	use: ImageUse;
	style?: StyleProp<ImageStyle>;
	setAspectRatio?: boolean;
} & Omit<ImageProps, 'source'>;

const ImageResource = ({
	image,
	style,
	setAspectRatio = false,
	use,
	...props
}: ImageResourceProps) => {
	const imagePath = useImagePath(image, use);
	const aspectRatio = useAspectRatio(imagePath);
	const styles = [
		style,
		setAspectRatio && aspectRatio ? { aspectRatio } : {},
	];

	return imagePath ? (
		<Image
			key={imagePath}
			resizeMethod={'resize'}
			{...props}
			style={[styles, style]}
			source={{ uri: imagePath }}
		/>
	) : (
		<View style={styles}></View>
	);
};

export { ImageResource };
