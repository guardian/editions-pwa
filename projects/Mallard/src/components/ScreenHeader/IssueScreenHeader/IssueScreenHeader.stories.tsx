import { color, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import type { IssueOrigin } from '../../../../../Apps/common/src';
import { IssueScreenHeader } from './IssueScreenHeader';

const issue = {
	name: 'Daily Edition',
	date: '2020-06-25',
	key: 'daily-edition/2020-06-25',
	publishedId: 'daily-edition/2020-06-25/2020-06-25T00:58:19.4Z',
	localId: 'daily-edition/2020-06-25',
	fronts: [],
	origin: 'api' as IssueOrigin,
};

storiesOf('IssueScreenHeader', module)
	.addDecorator(withKnobs)
	.add('Default', () => <IssueScreenHeader />)
	.add('With Issue', () => <IssueScreenHeader issue={issue} />)
	.add('With Issue and Header Styles', () => (
		<IssueScreenHeader
			issue={issue}
			headerStyles={{
				backgroundColor: color('Background Colour', '#7D0068'),
				textColorPrimary: color('Text Colour Primary', '#007ABC'),
				textColorSecondary: color('Text Colour Secondary', '#F3C100'),
			}}
		/>
	));
