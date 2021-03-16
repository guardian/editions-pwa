import type { ReactElement } from 'react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import { EditionsMenu } from 'src/components/EditionsMenu/EditionsMenu';
import { EditionsMenuScreenHeader } from 'src/components/ScreenHeader/EditionMenuScreenHeader';
import { useEditions } from 'src/hooks/use-edition-provider';
import { routeNames } from 'src/navigation/routes';
import { WithAppAppearance } from 'src/theme/appearance';
import { ApiState } from './settings/api-screen';

const styles = StyleSheet.create({
	screenFiller: {
		flex: 1,
		backgroundColor: 'white',
	},
});

const ScreenFiller = ({ children }: { children: ReactElement }) => (
	<View style={styles.screenFiller}>{children}</View>
);

export const EditionsMenuScreen = ({
	navigation,
}: {
	navigation: NavigationScreenProp<{}>;
}) => {
	const {
		editionsList: { regionalEditions, specialEditions },
		selectedEdition,
		storeSelectedEdition,
	} = useEditions();

	return (
		<WithAppAppearance value="default">
			<ScreenFiller>
				<>
					<EditionsMenuScreenHeader
						leftActionPress={() =>
							navigation.navigate(routeNames.Issue)
						}
					/>

					<EditionsMenu
						navigationPress={() =>
							navigation.navigate(routeNames.Issue)
						}
						regionalEditions={regionalEditions}
						specialEditions={specialEditions}
						selectedEdition={selectedEdition.edition}
						storeSelectedEdition={storeSelectedEdition}
					/>
					<ApiState />
				</>
			</ScreenFiller>
		</WithAppAppearance>
	);
};
