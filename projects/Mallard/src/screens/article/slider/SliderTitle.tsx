import React from 'react';
import type { Animated } from 'react-native';
import { Platform, StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getFont } from 'src/theme/typography';
import { SliderDots } from './SliderDots';

const getSliderHeight = (): number => {
	const isTablet = DeviceInfo.isTablet();
	if (Platform.OS === 'android') {
		return isTablet ? 68 : 54;
	} else {
		return isTablet ? 61 : 48;
	}
};

// SLIDER_FRONT_HEIGHT isn't actually used in this file but is important for calculating the layout of fronts in issue-screen.
// the 'jump to section' feature from the nav depends on this value being accurate
const SLIDER_FRONT_HEIGHT = getSliderHeight();

const FIRST_SUBTITLE_DATE = new Date('2020-03-05').getTime();

interface SliderTitleProps {
	title: string;
	numOfItems: number;
	color: string;
	location?: 'article' | 'front';
	subtitle?: string;
	position: Animated.AnimatedInterpolation;
	startIndex?: number;
	editionDate: Date | undefined; //temporary until we have subtitles for the last 30 editions
}

const styles = (color: string, location: string) => {
	const titleShared = {
		color,
		fontFamily: getFont('titlepiece', 1).fontFamily,
	};

	const titleArticle = {
		...titleShared,
		fontSize: getFont('titlepiece', 1.1).fontSize,
		lineHeight: getFont('titlepiece', 1.1).lineHeight,
	};

	const titleFront = {
		...titleShared,
		fontSize: getFont('titlepiece', 1.4).fontSize,
		lineHeight: getFont('titlepiece', 1.4).lineHeight,
	};

	const title = location === 'article' ? titleArticle : titleFront;

	return StyleSheet.create({
		container: {
			paddingLeft: location === 'front' ? 10 : 0,
			maxWidth: location === 'article' ? 800 : undefined,
			width: '100%',
			alignSelf: 'center',
		},
		titleContainer: {
			flexDirection: 'row',
		},
		title,
		subtitle: {
			...title,
			color: 'grey', //TBC
		},
	});
};

const SliderTitle = React.memo(
	({
		title,
		numOfItems,
		color,
		location = 'article',
		subtitle,
		position,
		startIndex,
		editionDate,
	}: SliderTitleProps) => {
		const appliedStyle = styles(color, location);
		// takes a key e.g. O:Top Stories and provides the end part
		const transformedSubtitle =
			subtitle && subtitle.split(':')[subtitle.split(':').length - 1];
		const showSubtitle =
			transformedSubtitle !== title &&
			// this check (and associated editionDate prop) can be removed one month after HIDE_SUBTITLE_BEFORE
			// this is to hide subtitles on past issues created before subtitles were a thing
			(!editionDate || editionDate.getTime() > FIRST_SUBTITLE_DATE);

		return (
			<View style={appliedStyle.container}>
				<View style={appliedStyle.titleContainer}>
					<Text style={appliedStyle.title}>{title}</Text>
					{showSubtitle && (
						<Text style={appliedStyle.subtitle}>
							{' '}
							{transformedSubtitle}
						</Text>
					)}
				</View>
				{numOfItems > 1 && (
					<SliderDots
						numOfItems={numOfItems}
						color={color}
						location={location}
						position={position}
						startIndex={startIndex}
					/>
				)}
			</View>
		);
	},
);

export { SliderTitle, SLIDER_FRONT_HEIGHT, SliderTitleProps };
