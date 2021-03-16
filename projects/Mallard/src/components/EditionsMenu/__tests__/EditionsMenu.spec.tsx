import React from 'react';
import type { ReactTestRendererJSON } from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
import { editions } from 'src/common';
import {
	regionalEditions,
	specialEditions,
} from '../../../../../Apps/common/src/__tests__/fixtures/editions-fixtures';
import { EditionsMenu } from '../EditionsMenu';

jest.mock('src/components/EditionsMenu/EditionButton/EditionButton', () => ({
	EditionButton: () => 'EditionButton',
}));

const props = {
	navigationPress: () => {},
	selectedEdition: editions.daily,
	storeSelectedEdition: () => {},
};

describe('EditionsMenu', () => {
	it('should display a default EditionsMenu with correct styling and default Regional Buttons', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<EditionsMenu {...props} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
	it('should display a EditionsMenu with correct styling and alternative Regional Buttons', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<EditionsMenu {...props} regionalEditions={regionalEditions} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
	it('should display a EditionsMenu with correct styling default Regional Buttons and a Special Edition Button', () => {
		const component: ReactTestRendererJSON | null = TestRenderer.create(
			<EditionsMenu {...props} specialEditions={specialEditions} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
});
