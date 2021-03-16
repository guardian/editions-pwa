import React from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import { Newspaper } from '../Newspaper';

describe('Newspaper', () => {
	it('should display a Newspaper icon in SVG', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<Newspaper />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
});
