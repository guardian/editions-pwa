import React from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import { ButtonAppearance } from '../Button';
import { ModalButton } from '../ModalButton';

describe('ModalButton', () => {
	it('should display a default ModalButton', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<ModalButton onPress={() => {}}>Sign out</ModalButton>,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
	it('should display a ModalButton with accessible text', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<ModalButton onPress={() => {}} alt="This button signs you out">
				Sign out
			</ModalButton>,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
	it('should display a ModalButton with an alternative appearance', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<ModalButton
				onPress={() => {}}
				buttonAppearance={ButtonAppearance.apricot}
			>
				Sign out
			</ModalButton>,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
});
