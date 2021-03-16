import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { minScreenSize } from 'src/helpers/screen';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { getFont } from 'src/theme/typography';
import { ButtonAppearance } from '../Button/Button';
import { CloseButton } from '../Button/CloseButton';
import { TitlepieceText, UiExplainerCopy } from '../styled-text';

export enum CardAppearance {
	tomato,
	apricot,
	blue,
}

const styles = StyleSheet.create({
	flexRow: {
		flexDirection: 'row',
	},
	container: {
		flex: 0,
		flexDirection: 'column',
	},
	top: {
		alignContent: 'space-between',
		padding: metrics.horizontal,
		paddingVertical: metrics.vertical,
	},
	explainer: {
		backgroundColor: color.background,
		padding: metrics.horizontal,
		paddingVertical: metrics.vertical,
	},
	explainerTitle: {
		marginBottom: metrics.vertical * 2,
	},
	explainerSubtitle: {
		...getFont('titlepiece', 1.25),
	},
	bottomContentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: metrics.vertical * 3,
	},
	dismissIconContainer: {
		alignItems: 'flex-end',
		marginBottom: metrics.vertical / 2,
	},
	titlePieceContainer: {
		alignItems: 'flex-start',
		flex: 1,
	},
});

const appearances: {
	[key in CardAppearance]: {
		background: StyleProp<ViewStyle>;
		titleText: StyleProp<TextStyle>;
		subtitleText: StyleProp<TextStyle>;
	};
} = {
	[CardAppearance.tomato]: StyleSheet.create({
		background: { backgroundColor: color.ui.tomato },
		titleText: { color: color.palette.neutral[100] },
		subtitleText: { color: color.palette.neutral[100] },
	}),
	[CardAppearance.apricot]: StyleSheet.create({
		background: { backgroundColor: color.ui.apricot },
		titleText: { color: color.palette.neutral[100] },
		subtitleText: { color: color.palette.neutral[100] },
	}),
	[CardAppearance.blue]: StyleSheet.create({
		background: { backgroundColor: color.ui.sea },
		titleText: { color: color.palette.neutral[100] },
		subtitleText: { color: color.primary },
	}),
};

const OnboardingCard = ({
	children,
	title,
	subtitle,
	bottomContent,
	explainerTitle,
	explainerSubtitle,
	bottomExplainerContent,
	onDismissThisCard,
	style,
	appearance,
	size = 'big',
	maxSize = 500,
}: {
	children?: React.ReactNode;
	title: string;
	subtitle?: string;
	bottomContent?: React.ReactNode;
	explainerTitle?: string;
	explainerSubtitle?: string;
	bottomExplainerContent?: React.ReactNode;
	onDismissThisCard?: () => void;
	style?: StyleProp<ViewStyle>;
	appearance: CardAppearance;
	size?: 'big' | 'medium' | 'small';
	maxSize?: number;
}) => {
	const max = Math.min(minScreenSize() * 0.95, maxSize);
	return (
		<View
			style={[
				appearances[appearance].background,
				styles.container,
				{
					width: max,
				},
				style,
			]}
		>
			<View style={[styles.top, appearances[appearance].background]}>
				<View style={styles.flexRow}>
					<View style={styles.titlePieceContainer}>
						<TitlepieceText
							accessibilityRole="header"
							style={[
								getFont(
									'titlepiece',
									size === 'big'
										? 2.5
										: size === 'medium'
										? 2.25
										: 2,
								),
								{ marginBottom: size === 'big' ? 16 : 8 },
								appearances[appearance].titleText,
							]}
						>
							{title}
						</TitlepieceText>
					</View>
					{onDismissThisCard && (
						<View style={styles.dismissIconContainer}>
							<CloseButton
								onPress={onDismissThisCard}
								accessibilityHint="This will dismiss the onboarding card"
								accessibilityLabel={`Dismiss the ${title} onboarding card`}
								appearance={ButtonAppearance.skeletonBlue}
							/>
						</View>
					)}
				</View>
				<View>
					{subtitle && (
						<TitlepieceText
							style={[
								getFont(
									'titlepiece',
									size === 'big' ? 1.5 : 1.25,
								),
								appearances[appearance].subtitleText,
							]}
						>
							{subtitle}
						</TitlepieceText>
					)}
				</View>
				<View>
					{bottomContent && (
						<View style={styles.bottomContentContainer}>
							{bottomContent}
						</View>
					)}
				</View>
			</View>
			{(explainerTitle || explainerSubtitle || children) && (
				<View style={styles.explainer}>
					{explainerTitle && (
						<TitlepieceText
							style={[
								styles.explainerTitle,
								appearances[appearance].subtitleText,
							]}
						>
							{explainerTitle}
						</TitlepieceText>
					)}
					{explainerSubtitle && (
						<TitlepieceText
							style={[
								styles.explainerSubtitle,
								appearances[appearance].subtitleText,
							]}
						>
							{explainerSubtitle}
						</TitlepieceText>
					)}
					{children && <UiExplainerCopy>{children}</UiExplainerCopy>}
					{bottomExplainerContent && (
						<View style={styles.bottomContentContainer}>
							{bottomExplainerContent}
						</View>
					)}
				</View>
			)}
		</View>
	);
};

OnboardingCard.defaultProps = {
	appearance: CardAppearance.tomato,
};

export { OnboardingCard };
