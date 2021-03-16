import React from 'react';
import { Alert } from 'react-native';
import { IssueMenuButton } from '../Button/IssueMenuButton';
import { EditionsMenuButton } from '../EditionsMenu/EditionsMenuButton/EditionsMenuButton';

const props = {
	title: 'Friday',
	subTitle: '26 June',
	rightAction: (
		<IssueMenuButton onPress={() => Alert.alert('Right Action')} />
	),
	leftAction: (
		<EditionsMenuButton onPress={() => Alert.alert('Left Action')} />
	),
	onPress: () => Alert.alert('On Press'),
	headerStyles: {
		backgroundColor: '#7D0068',
		textColorPrimary: '#007ABC',
		textColorSecondary: '#F3C100',
	},
};

export { props };
