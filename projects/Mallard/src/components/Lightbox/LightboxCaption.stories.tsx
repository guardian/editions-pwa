import { color, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { LightboxCaption } from './LightboxCaption';

const caption = text('caption', 'Some people jumping for joy');
const pillarColor = color('pillar', '#FF0000');

storiesOf('LightboxCaption', module)
	.addDecorator(withKnobs)
	.add('LightboxCaption - default', () => (
		<LightboxCaption caption={caption} pillarColor={pillarColor} />
	));
