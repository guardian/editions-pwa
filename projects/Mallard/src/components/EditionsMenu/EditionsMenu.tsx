import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import type { EditionId, RegionalEdition, SpecialEdition } from 'src/common';
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

function isSpecial(
	edition: SpecialEdition | RegionalEdition,
): edition is SpecialEdition {
	return (edition as SpecialEdition).editionType === 'Special';
}

type MenuProps = {
	navigationPress: () => void;
	regionalEditions?: RegionalEdition[];
	selectedEdition: EditionId;
	specialEditions?: SpecialEdition[];
	storeSelectedEdition: (
		chosenEdition: RegionalEdition | SpecialEdition,
	) => void;
};

const EditionsMenu = ({
	navigationPress,
	regionalEditions,
	selectedEdition,
	specialEditions,
	storeSelectedEdition,
}: MenuProps) => {
	const renderItems = ({
		item,
	}: {
		item: RegionalEdition | SpecialEdition;
	}) => {
		const handlePress = () => {
			storeSelectedEdition(item);
			navigationPress();
		};

		const isSelected = selectedEdition === item.edition;

		if (isSpecial(item)) {
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
		} else {
			return (
				<EditionButton
					selected={isSelected}
					onPress={handlePress}
					title={item.title}
					subTitle={item.subTitle}
				/>
			);
		}
	};

	const concatEditions = (): Array<RegionalEdition | SpecialEdition> => {
		const regionalEditionsArray =
			regionalEditions ?? defaultRegionalEditions;
		if (!specialEditions || specialEditions.length <= 0) {
			return regionalEditionsArray;
		} else {
			const concatArray = [...regionalEditionsArray, ...specialEditions];
			return concatArray;
		}
	};

	const editionList = concatEditions();
	return (
		<FlatList
			style={styles.container}
			data={editionList}
			renderItem={renderItems}
			ItemSeparatorComponent={() => <ItemSeperator />}
			keyExtractor={(item: RegionalEdition | SpecialEdition) =>
				item.title
			}
		/>
	);
};

export { EditionsMenu };
