import React from 'react';
import { ModalButton } from './Button/ModalButton';
import { CardAppearance, OnboardingCard } from './onboarding/onboarding-card';

const MissingIAPModalCard = ({
	title,
	subtitle,
	close,
	onTryAgain,
}: {
	title: string;
	subtitle: string;
	close: () => void;
	onTryAgain: () => void;
}) => (
	<OnboardingCard
		title={title}
		subtitle={subtitle}
		appearance={CardAppearance.blue}
		size="small"
		onDismissThisCard={() => {
			close();
		}}
		bottomContent={
			<>
				<ModalButton
					onPress={() => {
						close();
						onTryAgain();
					}}
				>
					Try again
				</ModalButton>
			</>
		}
	/>
);

export { MissingIAPModalCard };
