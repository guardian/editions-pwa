import { color, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { IssuePickerHeader } from './IssuePickerHeader';

storiesOf('IssuePickerHeader', module)
	.addDecorator(withKnobs)
	.add('Default', () => (
		<IssuePickerHeader title="Recent" subTitle="Editions" />
	))
	.add('With Different Title and SubTitle', () => (
		<IssuePickerHeader title="Australia" subTitle="Weekend" />
	))
	.add('With Header Styles', () => (
		<IssuePickerHeader
			title="Food"
			subTitle="Monthly"
			headerStyles={{
				backgroundColor: color('Background Colour', '#7D0068'),
				textColorPrimary: color('Text Colour Primary', '#007ABC'),
				textColorSecondary: color('Text Colour Secondary', '#F3C100'),
			}}
		/>
	));
