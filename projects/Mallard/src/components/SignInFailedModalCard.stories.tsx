import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { SignInFailedModalCard } from './SignInFailedModalCard';

storiesOf('SignInFailedModalCard', module)
	.addDecorator(withKnobs)
	.add('SignInFailedModalCard - default', () => (
		<SignInFailedModalCard
			email={'harry@potter.com'}
			onDismiss={() => undefined}
			onOpenCASLogin={() => undefined}
			onLoginPress={() => undefined}
			onFaqPress={() => undefined}
			close={() => undefined}
		/>
	))
	.add('SignInFailedModalCard - apple sign in hidden email', () => (
		<SignInFailedModalCard
			email={'harry@privaterelay.appleid.com'}
			onDismiss={() => undefined}
			onOpenCASLogin={() => undefined}
			onLoginPress={() => undefined}
			onFaqPress={() => undefined}
			close={() => undefined}
		/>
	));
