import React from 'react';
import type { NavigationInjectedProps } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import type { IssueWithFronts, SpecialEditionHeaderStyles } from 'src/common';
import { IssueTitle } from 'src/components/issue/issue-title';
import { Header } from 'src/components/layout/header/header';
import { styles } from 'src/components/styled-text';
import { useIssueDate } from 'src/helpers/issues';
import { useEditions } from 'src/hooks/use-edition-provider';
import {
	navigateToEditionMenu,
	navigateToIssueList,
} from 'src/navigation/helpers/base';
import { IssueMenuButton } from '../../Button/IssueMenuButton';
import { EditionsMenuButton } from '../../EditionsMenu/EditionsMenuButton/EditionsMenuButton';

interface Titles {
	title: string;
	subTitle: string;
	titleStyle: any;
}

const IssueScreenHeader = withNavigation(
	({
		headerStyles,
		issue,
		navigation,
	}: {
		headerStyles?: SpecialEditionHeaderStyles;
		issue?: IssueWithFronts;
	} & NavigationInjectedProps) => {
		const { date, weekday } = useIssueDate(issue);
		const { setNewEditionSeen, selectedEdition } = useEditions();

		const getDateString = () => {
			const abbreviatedDay = weekday.substring(0, 3);
			return `${abbreviatedDay} ${date}`;
		};

		const goToIssueList = () => {
			navigateToIssueList(navigation);
		};

		const handleEditionMenuPress = () => {
			setNewEditionSeen();
			navigateToEditionMenu(navigation);
		};

		const isSpecialEdition = (editionType: string) => {
			return editionType === 'Special';
		};

		const getTitles = (): Titles => {
			if (isSpecialEdition(selectedEdition.editionType)) {
				const splitTitle = selectedEdition.title.split('\n');
				return {
					title: splitTitle[0],
					subTitle: splitTitle[1],
					titleStyle: styles.issueHeavyText,
				};
			}
			const dateString = getDateString();
			return {
				title: selectedEdition.title,
				subTitle: dateString,
				titleStyle: styles.issueLightText,
			};
		};

		const { title, subTitle, titleStyle } = getTitles();

		return (
			<Header
				onPress={goToIssueList}
				action={<IssueMenuButton onPress={goToIssueList} />}
				leftAction={
					<EditionsMenuButton onPress={handleEditionMenuPress} />
				}
				headerStyles={headerStyles}
			>
				{title ? (
					<IssueTitle
						title={title}
						subtitle={subTitle}
						titleStyle={titleStyle}
						overwriteStyles={headerStyles}
					/>
				) : null}
			</Header>
		);
	},
);

export { IssueScreenHeader };
