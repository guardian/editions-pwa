import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import type { Edition, RegionalEdition, SpecialEdition } from 'src/common';
import { useEditions } from 'src/hooks/use-edition-provider';
import { metrics } from 'src/theme/spacing';
import { defaultRegionalEditions } from '../../../../Apps/common/src/editions-defaults';
import { EditionButton } from './EditionButton/EditionButton';
import { ItemSeperator } from './ItemSeperator/ItemSeperator';

const styles = StyleSheet.create({
	container: {
		paddingTop: 17,
		paddingHorizontal: metrics.horizontal,
		height: Dimensions.get('window').height,
	},
});

const isSpecial = (edition: Edition): edition is SpecialEdition => {
	return (edition as SpecialEdition).editionType === 'Special';
};

const mergeEditionLists = (
	regionalEditions: RegionalEdition[] | undefined,
	specialEditions: SpecialEdition[],
): Edition[] => {
	const regionalEditionsArray = regionalEditions ?? defaultRegionalEditions;
	if (!specialEditions || specialEditions.length <= 0) {
		return regionalEditionsArray;
	} else {
		const concatArray = [...regionalEditionsArray, ...specialEditions];
		return concatArray;
	}
};

type RenderEditionProps = {
	item: Edition;
	selectedEdition: Edition;
	storeSelectedEdition: (chosenEdition: Edition) => void;
	navigationPress: () => void;
};

const renderEditions = ({
	item,
	storeSelectedEdition,
	navigationPress,
	selectedEdition,
}: RenderEditionProps) => {
	const handlePress = () => {
		storeSelectedEdition(item);
		navigationPress();
	};
	const isSelected = selectedEdition.edition === item.edition;
	if (isSpecial(item))
		return (
			<EditionButton
				title={item.title}
				subTitle={item.subTitle}
				imageUri={item.buttonImageUri}
				expiry={new Date(item.expiry)}
				titleColor={item.buttonStyle.backgroundColor}
				selected={isSelected}
				onPress={handlePress}
				isSpecial
			/>
		);
	else
		return (
			<EditionButton
				selected={isSelected}
				onPress={handlePress}
				title={item.title}
				subTitle={item.subTitle}
			/>
		);
};

type MenuProps = {
	navigationPress: () => void;
};

const EditionsMenu = ({ navigationPress }: MenuProps) => {
	const {
		editionsList: { regionalEditions, specialEditions },
		selectedEdition,
		storeSelectedEdition,
	} = useEditions();

	const editionList = mergeEditionLists(regionalEditions, specialEditions);
	return (
		<FlatList
			style={styles.container}
			data={editionList}
			renderItem={({ item }: { item: Edition }) =>
				renderEditions({
					item,
					storeSelectedEdition,
					navigationPress,
					selectedEdition,
				})
			}
			ItemSeparatorComponent={() => <ItemSeperator />}
			keyExtractor={(item: Edition) => item.title}
		/>
	);
};

export { EditionsMenu };
