import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { EditionsMenuButton } from './EditionsMenuButton';

storiesOf('EditionsMenu', module)
	.addDecorator(withKnobs)
	.add('EditionsMenuButton - default', () => (
		<EditionsMenuButton onPress={() => {}} />
	))
	.add('EditionsMenuButton - selected', () => (
		<EditionsMenuButton onPress={() => {}} selected />
	));
