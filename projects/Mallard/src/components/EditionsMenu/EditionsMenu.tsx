import React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import type { EditionId, RegionalEdition, SpecialEdition } from 'src/common';
import { metrics } from 'src/theme/spacing';
import { defaultRegionalEditions } from '../../../../Apps/common/src/editions-defaults';
import { EditionButton } from './EditionButton/EditionButton';
import { ItemSeperator } from './ItemSeperator/ItemSeperator';

const styles = StyleSheet.create({
	container: { paddingTop: 17, paddingHorizontal: metrics.horizontal },
});

const EditionsMenu = ({
	navigationPress,
	regionalEditions,
	selectedEdition,
	specialEditions,
	storeSelectedEdition,
}: {
	navigationPress: () => void;
	regionalEditions?: RegionalEdition[];
	selectedEdition: EditionId;
	specialEditions?: SpecialEdition[];
	storeSelectedEdition: (
		chosenEdition: RegionalEdition | SpecialEdition,
	) => void;
}) => {
	const renderRegionalItem = ({ item }: { item: RegionalEdition }) => {
		const handlePress = () => {
			storeSelectedEdition(item);
			navigationPress();
		};
		const isSelected = selectedEdition === item.edition ? true : false;

		return (
			<EditionButton
				selected={isSelected}
				onPress={handlePress}
				title={item.title}
				subTitle={item.subTitle}
			/>
		);
	};

	const renderSpecialItem = ({ item }: { item: SpecialEdition }) => {
		const { buttonStyle, buttonImageUri, expiry, title, subTitle } = item;
		const handlePress = () => {
			storeSelectedEdition(item);
			navigationPress();
		};

		const isSelected = selectedEdition === item.edition ? true : false;

		return (
			<EditionButton
				title={title}
				subTitle={subTitle}
				imageUri={buttonImageUri}
				expiry={new Date(expiry)}
				titleColor={buttonStyle.backgroundColor}
				selected={isSelected}
				onPress={handlePress}
				isSpecial
			/>
		);
	};

	return (
		<ScrollView style={styles.container}>
			<FlatList
				data={regionalEditions || defaultRegionalEditions}
				renderItem={renderRegionalItem}
				ItemSeparatorComponent={() => <ItemSeperator />}
				ListFooterComponent={() => <ItemSeperator />}
			/>
			{specialEditions && specialEditions.length > 0 && (
				<>
					<FlatList
						data={specialEditions}
						renderItem={renderSpecialItem}
						ItemSeparatorComponent={() => <ItemSeperator />}
					/>
				</>
			)}
		</ScrollView>
	);
};

export { EditionsMenu };
