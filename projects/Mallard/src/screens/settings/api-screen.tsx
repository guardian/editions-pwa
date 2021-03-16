import { useApolloClient } from '@apollo/react-hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import type { NavigationScreenProp } from 'react-navigation';
import { ScrollContainer } from 'src/components/layout/ui/container';
import { Footer, Heading } from 'src/components/layout/ui/row';
import { List } from 'src/components/lists/list';
import { UiBodyCopy } from 'src/components/styled-text';
import { backends, defaultSettings } from 'src/helpers/settings/defaults';
import { setApiUrl } from 'src/helpers/settings/setters';
import { useApiUrl } from 'src/hooks/use-settings';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';

const ApiState = () => {
	const apiUrl = useApiUrl();
	if (apiUrl === defaultSettings.apiUrl) return null;
	return (
		<Footer>
			<UiBodyCopy>
				{`API backend pointing to ${apiUrl}. This is not PROD!`}
			</UiBodyCopy>
		</Footer>
	);
};

const ApiScreen = ({
	navigation,
}: {
	navigation: NavigationScreenProp<{}>;
}) => {
	const client = useApolloClient();
	const apiUrl = useApiUrl();

	return (
		<ScrollContainer>
			<Heading>Selected backend</Heading>
			<TextInput
				style={{
					padding: metrics.horizontal,
					paddingVertical: metrics.vertical * 2,
					backgroundColor: color.background,
					borderBottomColor: color.line,
					borderBottomWidth: StyleSheet.hairlineWidth,
				}}
				onChangeText={(value) => {
					if (value) {
						setApiUrl(client, value);
					}
				}}
				value={apiUrl || ''}
			/>
			<Heading>Presets</Heading>
			<List
				data={backends.map(({ title, value }) => ({
					title: (apiUrl === value ? '✅ ' : '') + title,
					explainer: value,
					key: value,
					onPress: () => {
						setApiUrl(client, value);
						navigation.goBack();
					},
				}))}
			/>
		</ScrollContainer>
	);
};
ApiScreen.navigationOptions = {
	title: 'API Endpoint',
};

export { ApiScreen, ApiState };
