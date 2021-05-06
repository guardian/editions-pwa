import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { EditionsMenu } from './EditionsMenu';

storiesOf('EditionsMenu', module)
	.addDecorator(withKnobs)
	.add('EditionsMenu - default', () => (
		<EditionsMenu navigationPress={() => {}} />
	))
	.add('EditionsMenu - with Special Edition', () => (
		<EditionsMenu navigationPress={() => {}} />
	));
