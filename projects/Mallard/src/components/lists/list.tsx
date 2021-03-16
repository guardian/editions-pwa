import type { ReactElement } from 'react';
import React from 'react';
import type { FlatListProps } from 'react-native';
import { FlatList } from 'react-native';
import { Row, Separator } from 'src/components/layout/ui/row';
/*
An item is what the list uses to draw its own row –
See https://facebook.github.io/react-native/docs/using-a-listview
*/
export interface Item {
	key: string;
	title: string;
	explainer?: React.ReactNode;
	proxy?: ReactElement;
	onPress?: () => void;
	linkWeight?: 'bold' | 'regular';
}

export const BaseList = <I extends {}>({
	...flatListProps
}: FlatListProps<I>) => {
	return (
		<FlatList
			ItemSeparatorComponent={Separator}
			ListFooterComponent={Separator}
			ListHeaderComponent={Separator}
			{...flatListProps}
		/>
	);
};

export const List = ({ data }: { data: Item[] }) => {
	return (
		<BaseList
			data={data}
			renderItem={({ item }) => <Row {...item}></Row>}
		/>
	);
};
