import React from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import { SportScore } from 'src/components/SportScore/SportScore';

const sportScore = 'Luton 3 - 0 Watford';

describe('SportScore', () => {
	it('should show a SportScore with default styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<SportScore sportScore={sportScore} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should show a SportScore with trailImage styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<SportScore sportScore={sportScore} type="trailImage" />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should show a SportScore with smallItems styling', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<SportScore sportScore={sportScore} type="smallItems" />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
});
