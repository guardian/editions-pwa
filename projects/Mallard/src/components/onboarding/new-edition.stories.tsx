import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { NewEditionCard } from './new-edition';

const modalText = {
	title: 'New edition alert',
	bodyText: 'This special edition will blow your mind',
	dismissButtonText: 'Great!',
};

storiesOf('NewEdiition', module)
	.addDecorator(withKnobs)
	.add('NewEdition - default', () => <NewEditionCard modalText={modalText} />)
	.add('NewEdition - headerStyles', () => {
		const headerStyles = {
			backgroundColor: 'red',
			textColorPrimary: 'black',
			textColorSecondary: 'green',
		};
		return (
			<NewEditionCard headerStyle={headerStyles} modalText={modalText} />
		);
	});
