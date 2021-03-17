import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import {
	Alert,
	StyleSheet,
	Switch,
	TouchableOpacity,
	View,
} from 'react-native';
import { List } from 'src/components/lists/list';
import { UiBodyCopy } from 'src/components/styled-text';
import { deleteIssueFiles } from 'src/download-edition/clear-issues-and-editions';
import {
	setMaxAvailableEditions,
	setWifiOnlyDownloads,
} from 'src/helpers/settings/setters';
import { Copy, MANAGE_EDITIONS_TITLE } from 'src/helpers/words';
import { getIssueSummary } from 'src/hooks/use-issue-summary';
import { Action, ComponentType, sendComponentEvent } from 'src/services/ophan';
import { WithAppAppearance } from 'src/theme/appearance';

const buttonStyles = StyleSheet.create({
	background: {
		borderWidth: 1,
		borderRadius: 3,
		flex: 1,
		marginHorizontal: 5,
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 10,
		paddingBottom: 10,
		alignItems: 'center',
	},
});

const MultiButton = ({
	children,
	onPress,
	selected,
}: {
	children: string;
	onPress: () => void;
	selected?: boolean;
}) => (
	<TouchableOpacity
		style={{ flex: 1 }}
		accessibilityRole="button"
		onPress={onPress}
	>
		<View
			style={[
				buttonStyles.background,
				{
					backgroundColor: selected ? '#0077b3' : 'transparent',
					borderColor: selected ? 'transparent' : '#999',
				},
			]}
		>
			<UiBodyCopy
				weight="bold"
				style={{ color: selected ? 'white' : 'black' }}
			>
				{children}
			</UiBodyCopy>
		</View>
	</TouchableOpacity>
);

const AvailableEditionsButtons = ({
	numbers,
	isSelected,
	onPress,
}: {
	numbers: number[];
	isSelected: (n: number) => boolean;
	onPress: (n: number) => void;
}) => (
	<View
		style={{
			display: 'flex',
			flexDirection: 'row',
			marginHorizontal: -5,
			paddingTop: 10,
		}}
	>
		{numbers.map((number) => (
			<MultiButton
				key={number}
				selected={isSelected(number)}
				onPress={() => onPress(number)}
			>
				{`${number} issues`}
			</MultiButton>
		))}
	</View>
);

const ManageEditionsScreen = () => {
	const { client, data, loading } = useQuery(gql`
		{
			wifiOnlyDownloads @client
			maxAvailableEditions @client
		}
	`);

	return (
		<WithAppAppearance value="settings">
			<List
				data={[
					...(loading
						? []
						: [
								{
									key: 'Wifi-only',
									title: Copy.manageDownloads.wifiOnlyTitle,
									explainer:
										Copy.manageDownloads.wifiOnlyExplainer,
									proxy: (
										<Switch
											accessible={true}
											accessibilityLabel="Wifi-only."
											accessibilityRole="switch"
											value={data.wifiOnlyDownloads}
											onValueChange={(val) => {
												setWifiOnlyDownloads(
													client,
													val,
												);
												sendComponentEvent({
													componentType:
														ComponentType.appButton,
													action: Action.click,
													componentId:
														'manageEditionsWifiDownload',
													value: val.toString(),
												});
											}}
										/>
									),
								},
								{
									key: 'Available editions',
									title:
										Copy.manageDownloads.availableDownloads,
									explainer: (
										<AvailableEditionsButtons
											numbers={[7, 14, 30]}
											isSelected={(n) =>
												n === data.maxAvailableEditions
											}
											onPress={async (n) => {
												setMaxAvailableEditions(
													client,
													n,
												);
												getIssueSummary(false);
												sendComponentEvent({
													componentType:
														ComponentType.appButton,
													action: Action.click,
													componentId:
														'manageEditionsAvailableEditions',
													value: n.toString(),
												});
											}}
										/>
									),
								},
						  ]),
					{
						key: 'Delete all downloads',
						title: Copy.manageDownloads.deleteDownloadsTitle,
						explainer:
							Copy.manageDownloads.deleteDownloadsExplainer,
						onPress: () => {
							Alert.alert(
								Copy.manageDownloads.deleteDownloadsAlertTitle,
								Copy.manageDownloads
									.deleteDownloadsAlertSubtitle,
								[
									{
										text: Copy.manageDownloads.delete,
										style: 'destructive',
										onPress: deleteIssueFiles,
									},
									{
										text: Copy.manageDownloads.cancel,
										style: 'cancel',
									},
								],
								{ cancelable: false },
							);
							sendComponentEvent({
								componentType: ComponentType.appButton,
								action: Action.click,
								value: 'deleteAllDownload',
								componentId: 'manageEditions',
							});
						},
					},
				]}
			/>
		</WithAppAppearance>
	);
};

const ManageEditionScreenFromIssuePicker = () => <ManageEditionsScreen />;

ManageEditionsScreen.navigationOptions = {
	title: MANAGE_EDITIONS_TITLE,
};

ManageEditionScreenFromIssuePicker.navigationOptions = {
	title: MANAGE_EDITIONS_TITLE,
	showHeaderLeft: false,
	showHeaderRight: true,
};

export { ManageEditionsScreen, ManageEditionScreenFromIssuePicker };
