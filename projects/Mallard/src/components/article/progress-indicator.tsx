import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ArticleTheme } from 'src/components/article/html/article';
import { themeColors } from 'src/components/article/html/helpers/css';

const styles = StyleSheet.create({
	progressIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

type ProgressType = 'current' | 'small' | 'big';

type ProgressIndicatorProps = {
	imageCount: number;
	currentIndex: number;
	windowStart: number;
	windowSize: number;
	scrollInProgress: boolean;
};

const progressStyle = (type: ProgressType) => {
	const diameter = type === 'small' ? 5 : 10;
	const colour =
		type === 'current' ? 'white' : themeColors(ArticleTheme.Dark).line;
	return {
		width: diameter,
		height: diameter,
		borderRadius: diameter / 2,
		backgroundColor: colour,
		margin: 3,
	};
};

const ProgressCircle = ({ type }: { type: ProgressType }) => {
	return <View style={progressStyle(type)} />;
};

// TODO: write tests for getWindowStart and getNewWindowStart
// following verdict whether this is the way we want to render these dots
export const getWindowStart = (
	index: number,
	numDots: number,
	numItems: number,
): number => {
	if (index >= numDots) {
		// if we're not at the start or the end stick the dot in the middle
		if (index < numItems - numDots) {
			return index - 2;
		} else {
			return numItems - numDots;
		}
	} else {
		return 0;
	}
};

// needs tests - see above
export const getNewWindowStart = (
	newIndex: number,
	currentWindowStart: number,
	numItems: number,
	numDots: number,
): number => {
	if (
		newIndex >= currentWindowStart + numDots - 1 &&
		newIndex < numItems - 1
	) {
		return currentWindowStart + 1;
	}
	if (newIndex <= currentWindowStart && currentWindowStart > 0) {
		return currentWindowStart - 1;
	}
	return currentWindowStart;
};

export const ProgressIndicator = ({
	imageCount,
	currentIndex,
	windowStart,
	windowSize,
	scrollInProgress,
}: ProgressIndicatorProps) => {
	const current = currentIndex - windowStart;
	const showStarter = windowStart > 0;
	const showEnd = imageCount > windowStart + windowSize;
	const circles = Array(windowSize)
		.fill('', 0)
		.map((e, index) =>
			scrollInProgress && showStarter && showEnd && index === current
				? 'big'
				: (showStarter && index === 0) ||
				  (showEnd && index === windowSize - 1)
				? 'small'
				: index === current
				? 'current'
				: 'big',
		);

	return (
		<View style={styles.progressIndicator}>
			{circles.map((t, i) => (
				<ProgressCircle type={t} key={`circle-${i}`} />
			))}
		</View>
	);
};
