import React, { useContext } from 'react';
import { Platform, Text } from 'react-native';
import type { NavigationInjectedProps } from 'react-navigation';
import { AccessContext, useAccess } from 'src/authentication/AccessContext';
import { isError, isValid } from 'src/authentication/lib/Attempt';
import { RightChevron } from 'src/components/icons/RightChevron';
import { ScrollContainer } from 'src/components/layout/ui/container';
import { Heading } from 'src/components/layout/ui/row';
import { List } from 'src/components/lists/list';
import { MissingIAPModalCard } from 'src/components/missing-iap-modal-card';
import { useModal } from 'src/components/modal';
import { SubFoundModalCard } from 'src/components/sub-found-modal-card';
import { Copy } from 'src/helpers/words';
import { routeNames } from 'src/navigation/routes';
import { WithAppAppearance } from 'src/theme/appearance';

const AlreadySubscribedScreen = ({ navigation }: NavigationInjectedProps) => {
	const canAccess = useAccess();
	const { authIAP } = useContext(AccessContext);
	const { open } = useModal();
	const rightChevronIcon = <RightChevron />;

	return (
		<WithAppAppearance value={'settings'}>
			<ScrollContainer>
				<Heading>{Copy.alreadySubscribed.subscriptionHeading}</Heading>
				<List
					data={
						!canAccess
							? [
									{
										key: 'Sign in to activate',
										title:
											Copy.alreadySubscribed.signInTitle,
										onPress: () => {
											navigation.navigate(
												routeNames.SignIn,
											);
										},
										proxy: rightChevronIcon,
										linkWeight: 'regular',
									},
									{
										key: 'Activate with subscriber ID',
										title:
											Copy.alreadySubscribed
												.subscriberIdTitle,
										onPress: () => {
											navigation.navigate(
												routeNames.CasSignIn,
											);
										},
										proxy: rightChevronIcon,
										linkWeight: 'regular',
									},
							  ]
							: []
					}
				/>
				{Platform.OS === 'ios' ? (
					<>
						<Heading>{``}</Heading>
						<Heading>{Copy.alreadySubscribed.appHeading}</Heading>
						<List
							data={[
								{
									key: 'Restore App Store subscription',
									title:
										Copy.alreadySubscribed.restoreIapTitle,
									onPress: async () => {
										const {
											accessAttempt,
										} = await authIAP();
										if (isValid(accessAttempt)) {
											open((close) => (
												<SubFoundModalCard
													close={close}
												/>
											));
										} else if (isError(accessAttempt)) {
											open((close) => (
												<MissingIAPModalCard
													title={
														Copy.alreadySubscribed
															.restoreErrorTitle
													}
													subtitle={
														Copy.alreadySubscribed
															.restoreErrorSubtitle
													}
													close={close}
													onTryAgain={authIAP}
												/>
											));
										} else {
											open((close) => (
												<MissingIAPModalCard
													title={
														Copy.alreadySubscribed
															.restoreMissingTitle
													}
													subtitle={
														Copy.alreadySubscribed
															.restoreMissingSubtitle
													}
													close={close}
													onTryAgain={authIAP}
												/>
											));
										}
									},
									proxy: rightChevronIcon,
									linkWeight: 'regular',
								},
							]}
						/>
					</>
				) : (
					<></>
				)}
			</ScrollContainer>
		</WithAppAppearance>
	);
};

AlreadySubscribedScreen.navigationOptions = {
	title: <Text style={{ fontSize: 20 }}>{Copy.alreadySubscribed.title}</Text>,
};

export { AlreadySubscribedScreen };
