import React from 'react';
import TestRenderer from 'react-test-renderer';
import { EditionsMenuScreenHeader } from '../EditionMenuScreenHeader';

describe('Edition Menu Screen Header', () => {
	it('Edition menu screen Header should render with correct title and style', () => {
		const component = TestRenderer.create(
			<EditionsMenuScreenHeader leftActionPress={() => {}} />,
		).toJSON();
		expect(component).toMatchSnapshot();
	});
});
