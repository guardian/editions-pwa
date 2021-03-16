import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { BugButton } from './BugButton';
import { ButtonAppearance } from './Button';
import { CloseButton } from './CloseButton';
import { IssueMenuButton } from './IssueMenuButton';
import { ModalButton } from './ModalButton';
import { ReloadButton } from './ReloadButton';
import { SettingsButton } from './SettingsButton';

storiesOf('Buttons', module)
	.addDecorator(withKnobs)
	.add('IssueMenuButton - default', () => (
		<IssueMenuButton onPress={() => {}} />
	))
	.add('CloseButton - default', () => {
		return (
			<CloseButton
				onPress={() => {}}
				appearance={ButtonAppearance.default}
				accessibilityHint="Accesibility Hint"
				accessibilityLabel="Accesibility Label"
			/>
		);
	})
	.add('CloseButton - with appearance', () => {
		return (
			<CloseButton
				onPress={() => {}}
				appearance={ButtonAppearance.modal}
				accessibilityHint="Accesibility Hint"
				accessibilityLabel="Accesibility Label"
			/>
		);
	})
	.add('BugButton - default', () => <BugButton onPress={() => {}} />)
	.add('ReloadButton - default', () => <ReloadButton onPress={() => {}} />)
	.add('ModalButton - default', () => (
		<ModalButton onPress={() => {}}>
			{text('Button Text', 'Sign In')}
		</ModalButton>
	))
	.add('SettingsButton - default', () => (
		<SettingsButton onPress={() => {}} />
	));
