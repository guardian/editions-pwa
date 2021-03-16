import React from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import { Stars } from 'src/components/Stars/Stars';

const rating = 5;

describe('Stars', () => {
	it('should show a Stars with default styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<Stars rating={rating} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should show a Stars with trailImage styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<Stars rating={rating} position="bottomLeft" />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should show a Stars with smallItems styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<Stars rating={rating} position="inline" />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
});
