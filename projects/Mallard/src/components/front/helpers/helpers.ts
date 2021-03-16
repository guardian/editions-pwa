import type { FunctionComponent } from 'react';
import type { Animated, FlatList } from 'react-native';
import type { Front, Rectangle, Size } from 'src/common';
import { PageLayoutSizes } from 'src/common';
import { safeInterpolation } from 'src/helpers/math';
import { useArticle } from 'src/hooks/use-article';
import { useAppAppearance } from 'src/theme/appearance';
import { metrics } from 'src/theme/spacing';
import type { PropTypes } from '../items/helpers/item-tappable';

export type Item = FunctionComponent<PropTypes>;

export interface AnimatedFlatListRef {
	_component: FlatList<Front['collections'][0]>;
}

export const getPageLayoutSizeXY = (size: PageLayoutSizes): Size => {
	if (size === PageLayoutSizes.tablet) {
		return { width: 3, height: 4 };
	}
	return { width: 2, height: 6 };
};

/*
This resolves where each article goes
*/

export const getItemRectanglePerc = (
	itemFit: Rectangle,
	layout: PageLayoutSizes,
): Rectangle => {
	const layoutSize = getPageLayoutSizeXY(layout);
	return {
		left: itemFit.left / layoutSize.width,
		top: itemFit.top / layoutSize.height,
		height: itemFit.height / layoutSize.height,
		width: itemFit.width / layoutSize.width,
	};
};

export const toPercentage = (nm: number): string => `${nm * 100}%`;

export const toAbsoluteRectangle = (
	rectangle: Rectangle,
	cardSize: Size,
): Rectangle => ({
	left: rectangle.left * cardSize.width,
	width: rectangle.width * cardSize.width,
	top: rectangle.top * cardSize.height,
	height: rectangle.height * cardSize.height,
});

/*
Map the position of the tap on the screen to
the position of the tap on the scrubber itself (which has padding).
This is coupled to the visual layout and we can be a bit more
clever but also for now this works
*/
export const getScrollPos = (width: number, screenX: number) => {
	return screenX + (metrics.horizontal * 6 * screenX) / width;
};

export const getNearestPage = (
	width: number,
	screenX: number,
	pageCount: number,
): number => {
	return Math.round((getScrollPos(width, screenX) * (pageCount - 1)) / width);
};

export const getTranslateForPage = (
	width: number,
	scrollX: Animated.Value,
	page: number,
	multiplier = 1,
) => {
	return scrollX.interpolate({
		inputRange: safeInterpolation([
			width * (page - 1),
			width * page,
			width * (page + 1),
		]),
		outputRange: safeInterpolation([
			metrics.fronts.sides * (-1.75 * multiplier),
			0,
			metrics.fronts.sides * (1.75 * multiplier),
		]),
	});
};

/*get the card bg */
export const useCardBackgroundStyle = () => {
	const [color, { pillar }] = useArticle();
	const appColor = useAppAppearance();
	return pillar !== 'news' && pillar !== 'sport'
		? { backgroundColor: color.faded }
		: { backgroundColor: appColor.cardBackgroundColor };
};
