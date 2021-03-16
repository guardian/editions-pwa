import { useApolloClient } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import type { NavigationInjectedProps } from 'react-navigation';
import { AccessContext } from 'src/authentication/AccessContext';
import { RightChevron } from 'src/components/icons/RightChevron';
import { ScrollContainer } from 'src/components/layout/ui/container';
import { Heading } from 'src/components/layout/ui/row';
import { List } from 'src/components/lists/list';
import {
	copyDiagnosticInfo,
	createSupportMailto,
} from 'src/helpers/diagnostics';
import {
	APPS_FEEDBACK_EMAIL,
	DIAGNOSTICS_TITLE,
	ISSUE_EMAIL,
	READERS_EMAIL,
	SUBSCRIPTION_EMAIL,
} from 'src/helpers/words';
import { useToast } from 'src/hooks/use-toast';
import { routeNames } from 'src/navigation/routes';
import { WithAppAppearance } from 'src/theme/appearance';

export interface OnCompletionToast {
	(msg: string): void;
}

const HelpScreen = ({ navigation }: NavigationInjectedProps) => {
	const { showToast } = useToast();
	const { attempt } = useContext(AccessContext);
	const client = useApolloClient();

	const showToastCallback: OnCompletionToast = (msg: string) => {
		showToast(msg);
	};

	return (
		<WithAppAppearance value={'settings'}>
			<ScrollContainer>
				<List
					data={[
						{
							key: 'Frequently Asked Questions',
							title: 'Frequently Asked Questions',
							onPress: () => {
								navigation.navigate(routeNames.FAQ);
							},
							proxy: <RightChevron />,
						},
					]}
				/>
				<Heading>Contact us</Heading>
				<List
					data={[
						createSupportMailto(
							client,
							'Report an issue',
							ISSUE_EMAIL,
							attempt,
							DIAGNOSTICS_TITLE,
						),
						createSupportMailto(
							client,
							'Subscription, payment and billing issues',
							SUBSCRIPTION_EMAIL,
							attempt,
						),
						createSupportMailto(
							client,
							'Comment or query about an article',
							READERS_EMAIL,
							attempt,
						),
						createSupportMailto(
							client,
							'Send feedback',
							APPS_FEEDBACK_EMAIL,
							attempt,
						),
					]}
				/>
				<Heading>Diagnostics</Heading>
				<List
					data={[
						copyDiagnosticInfo(
							client,
							'Copy diagnostic information',
							attempt,
							showToastCallback,
						),
					]}
				/>
			</ScrollContainer>
		</WithAppAppearance>
	);
};

HelpScreen.navigationOptions = {
	title: 'Help',
};

export { HelpScreen };
