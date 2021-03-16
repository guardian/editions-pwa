import React from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import { EditionButton } from '../EditionButton';

const props = {
	onPress: () => {},
	title: 'Australia Weekend',
	subTitle: 'Published every Saturday by 6am (AEST)',
};

const specialProps = {
	expiry: new Date(98, 1),
	image: {
		source: 'media',
		path: '/path/to/image',
	},
	onPress: () => {},
	title: `Food
Monthly`,
	subTitle: 'Store cupboard special: 20 quick and easy lockdown suppers',
	titleColor: '#FEEEF7',
	buttonImageUri:
		'https://media.guim.co.uk/49cebb0db4a3e4d26d7d190da7be4a2e9bd7534f/0_0_103_158/103.png',
};

jest.mock('src/components/front/image-resource', () => ({
	ImageResource: () => 'ImageResource',
}));

describe('RegionButton', () => {
	it('should display a default RegionButton with correct styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<EditionButton {...props} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
	it('should display a selected RegionButton with correct styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<EditionButton selected={true} {...props} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
});

describe('SpecialEditionButton', () => {
	it('should display a default SpecialEditionButton with correct styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<EditionButton isSpecial {...specialProps} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
	it('should display a selected SpecialEditionButton despite correct styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<EditionButton isSpecial selected {...specialProps} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
});
