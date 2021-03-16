import React from 'react';
import { StyleSheet } from 'react-native';
import { EditionsMenuButton } from 'src/components/EditionsMenu/EditionsMenuButton/EditionsMenuButton';
import { IssueTitle } from 'src/components/issue/issue-title';
import { Header } from '../layout/header/header';

const styles = StyleSheet.create({
	title: { paddingLeft: 100, alignSelf: 'flex-start' },
});

export const EditionsMenuScreenHeader = ({
	leftActionPress,
}: {
	leftActionPress: () => void;
}) => (
	<Header
		leftAction={<EditionsMenuButton selected onPress={leftActionPress} />}
		layout={'center'}
	>
		<IssueTitle title={`Editions`} style={styles.title} />
	</Header>
);
