import { ItemType } from 'src/common';
import { StarterItem } from '../items/image-items';
import {
	ImageItem,
	SidekickImageItem,
	SmallItem,
	SmallItemLargeText,
	SplashImageItem,
	SplitImageItem,
	SuperHeroImageItem,
} from '../items/items';
import type { Item } from './helpers';

const itemTypeLookup: { [key in ItemType]: Item } = {
	[ItemType.SplashImageItemType]: SplashImageItem,
	[ItemType.SuperHeroImageItemType]: SuperHeroImageItem,
	[ItemType.ImageItemType]: ImageItem,
	[ItemType.SmallItemType]: SmallItem,
	[ItemType.StarterItemType]: StarterItem,
	[ItemType.SplitImageItemType]: SplitImageItem,
	[ItemType.SidekickImageItemType]: SidekickImageItem,
	[ItemType.SmallItemLargeTextType]: SmallItemLargeText,
};

export { itemTypeLookup };
