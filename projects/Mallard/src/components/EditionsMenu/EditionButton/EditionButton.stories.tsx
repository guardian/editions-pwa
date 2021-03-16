import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { EditionButton } from './EditionButton';

const specialProps = {
	imageUri:
		'https://media.guim.co.uk/49cebb0db4a3e4d26d7d190da7be4a2e9bd7534f/0_0_103_158/103.png',
	expiry: new Date(),
	onPress: () => {},
	title: 'Food Monthly',
	subTitle: 'The best food of the month',
	titleColor: '#FEEEF7',
	isSpecial: true,
};

storiesOf('EditionsMenu', module)
	.addDecorator(withKnobs)
	.add('RegionButton - default', () => (
		<EditionButton
			onPress={() => {}}
			title="Daily Edition"
			subTitle={'Published every day by 6am (GMT)'}
		/>
	))
	.add('RegionButton - selected', () => (
		<EditionButton
			selected
			onPress={() => {}}
			title={'Daily Edition'}
			subTitle={'Published every day by 6am (GMT)'}
		/>
	))

	.add('SpecialEditionButton - default', () => (
		<EditionButton {...specialProps} />
	))
	.add('SpecialEditionButton - selected', () => (
		<EditionButton selected {...specialProps} />
	));
