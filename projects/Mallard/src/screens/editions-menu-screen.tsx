import { useNavigation } from '@react-navigation/native';
import type { ReactElement } from 'react';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { EditionsMenu } from 'src/components/EditionsMenu/EditionsMenu';
import { EditionsMenuScreenHeader } from 'src/components/ScreenHeader/EditionMenuScreenHeader';
import { useEditions } from 'src/hooks/use-edition-provider';
import { RouteNames } from 'src/navigation/NavigationModels';
import { WithAppAppearance } from 'src/theme/appearance';
import { ApiState } from './settings/api-screen';

const sidebarWidth = 360;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row-reverse',
	},
	touchable: {
		backgroundColor: 'transparent',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width - sidebarWidth,
	},
	screenFiller: {
		flex: 1,
		backgroundColor: 'white',
		maxWidth: DeviceInfo.isTablet() ? sidebarWidth : undefined,
	},
});

export const ScreenFiller = ({
	direction,
	children,
}: {
	direction?: string;
	children: ReactElement;
}) => {
	const navigation = useNavigation();
	return (
		<View
			style={[
				styles.container,
				{ flexDirection: direction === 'end' ? 'row' : 'row-reverse' },
			]}
		>
			{DeviceInfo.isTablet() && (
				<TouchableWithoutFeedback
					onPress={navigation.goBack}
					style={styles.touchable}
				/>
			)}

			<View
				style={[
					styles.screenFiller,
					direction === 'end' && { alignSelf: 'flex-end' },
				]}
			>
				{children}
			</View>
		</View>
	);
};

export const EditionsMenuScreen = () => {
	const navigation = useNavigation();
	return (
		<WithAppAppearance value="default">
			<ScreenFiller>
				<>
					<EditionsMenuScreenHeader
						leftActionPress={() =>
							navigation.navigate(RouteNames.Issue)
						}
					/>

					<EditionsMenu
						navigationPress={() =>
							navigation.navigate(RouteNames.Issue)
						}
					/>
					<ApiState />
				</>
			</ScreenFiller>
		</WithAppAppearance>
	);
};
