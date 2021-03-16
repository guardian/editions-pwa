import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { SportScore } from 'src/components/SportScore/SportScore';

const sportScore = text('sportScore', 'Luton 3 - Watford 0');

storiesOf('SportScore', module)
	.addDecorator(withKnobs)
	.add('SportScore - default', () => <SportScore sportScore={sportScore} />)
	.add('SportScore - smallItems', () => (
		<SportScore sportScore={sportScore} type="smallItems" />
	))
	.add('SportScore - trailImage', () => (
		<SportScore sportScore={sportScore} type="trailImage" />
	));
