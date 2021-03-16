import type { LayoutRectangle, View } from 'react-native';
import { Dimensions } from 'react-native';
import type { Article } from 'src/common';

/*
TODO: Pass this via router options

This stores the screen positions of all items so
that when you try to go and open them the transitioner
knows where to place the screen.

Ideally we'd use state for something like this but
a) it's unclear how to retrieve react state
   from navigation/index :(
b) animations in react in general are always a
   bunch of imperative escape hatches put together
   for performance reasons. I'm not sure we wanna
   bother with proper state every time a tile goes
   on screen?
*/

export type ScreenPosition = LayoutRectangle;

const positions: Record<string, ScreenPosition> = {};

const setScreenPositionOfItem = (
	item: Article['key'],
	position: ScreenPosition,
) => {
	positions[item] = position;
};

const setScreenPositionFromView = (key: Article['key'], item: View) => {
	item.measureInWindow((x, y, width, height) => {
		setScreenPositionOfItem(key, {
			x,
			y,
			width,
			height,
		});
	});
};

const getScreenPositionOfItem = (item: Article['key']): ScreenPosition => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (positions[item]) return positions[item];
	const { height, width } = Dimensions.get('window');
	return {
		x: 0,
		y: height * 0.9,
		width,
		height,
	};
};

export {
	getScreenPositionOfItem,
	setScreenPositionOfItem,
	setScreenPositionFromView,
};
