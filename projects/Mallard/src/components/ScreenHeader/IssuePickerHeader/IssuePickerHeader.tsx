import React from 'react';
import type { NavigationInjectedProps } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import type { SpecialEditionHeaderStyles } from 'src/common';
import { CloseButton } from 'src/components/Button/CloseButton';
import { SettingsButton } from 'src/components/Button/SettingsButton';
import { IssueTitle } from 'src/components/issue/issue-title';
import { Header } from 'src/components/layout/header/header';
import { styles } from 'src/components/styled-text';
import { navigateToSettings } from 'src/navigation/helpers/base';

const IssuePickerHeader = withNavigation(
	({
		headerStyles,
		navigation,
		subTitle,
		title,
	}: {
		headerStyles?: SpecialEditionHeaderStyles;
		subTitle?: string;
		title: string;
	} & NavigationInjectedProps) => (
		<Header
			alignment={'drawer'}
			onPress={() => navigation.goBack()}
			action={
				<CloseButton
					accessibilityLabel="Close button"
					accessibilityHint="Returns to the edition"
					onPress={() => navigation.goBack()}
				/>
			}
			leftAction={
				<SettingsButton
					onPress={() => {
						navigateToSettings(navigation);
					}}
				/>
			}
			headerStyles={headerStyles}
		>
			{title ? (
				<IssueTitle
					title={title}
					subtitle={subTitle}
					titleStyle={styles.issueLightText}
					overwriteStyles={headerStyles}
				/>
			) : null}
		</Header>
	),
);

export { IssuePickerHeader };
