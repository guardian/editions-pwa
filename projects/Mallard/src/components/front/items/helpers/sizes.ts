import type { ItemSizes } from '../../../../common';
import { PageLayoutSizes } from '../../../../common';
import { getPageLayoutSizeXY } from '../../helpers/helpers';

/**
 * "starter" cards use a bigger font, so we need to reduce the size taken by
 * the image a little bit in all cases.
 */
export const getImageHeight = ({ story, layout }: ItemSizes) => {
	if (layout === PageLayoutSizes.tablet) {
		// 1 story main
		if (story.height == 4 && story.width === 3) {
			return '66.66%';
		}
		// 3 story main
		if (story.height === 4 && story.width == 2) {
			return '50%';
		}
		// 2 story main
		if (story.height === 3) {
			return '66.66%';
		}
		// 3/4/5 story secondary
		if (story.height === 2) {
			return '50%';
		}
		// 2/4 story secondary
		if (story.height === 1 && (story.width === 2 || story.width === 3)) {
			return '100%';
		}
		return '75.5%';
	}
	if (layout === PageLayoutSizes.mobile) {
		// 1 story main
		if (story.height === 6) {
			return '68%';
		}
		// 2/3 story main
		if (story.height === 4) {
			return '66%';
		}
		// 3/4/5 story secondary
		if (story.height == 3) {
			return '51%';
		}
		// 2 story secondary
		if (story.height == 2) {
			return '98%';
		}
		return '50%';
	}
};

// most image widths are 100% - this is use in SplitImageItem - where text and images are on the same row
export const getImageWidth = ({ story, layout }: ItemSizes) => {
	if (layout === PageLayoutSizes.tablet) {
		if (story.width === 3) {
			return '33%';
		}
		return '50%';
	}
	if (layout === PageLayoutSizes.mobile) {
		return '50%';
	}
};

export const isSmallItem = (size: ItemSizes) => {
	return size.story.width <= 1;
};

export const isFullHeightItem = (size: ItemSizes) => {
	const { height: pageHeight } = getPageLayoutSizeXY(size.layout);
	return size.story.height >= pageHeight;
};
export const isFullWidthItem = (size: ItemSizes) => {
	const { width } = getPageLayoutSizeXY(size.layout);
	return size.story.width >= width;
};
