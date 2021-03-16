import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Stars } from 'src/components/Stars/Stars';

const rating = number('rating', 3);

storiesOf('Stars', module)
	.addDecorator(withKnobs)
	.add('Stars - default', () => <Stars rating={rating} />)
	.add('Stars - smallItems', () => (
		<Stars rating={rating} position="inline" />
	))
	.add('Stars - trailImage', () => (
		<Stars rating={rating} position="bottomLeft" />
	));
