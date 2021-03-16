import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Breakpoints } from 'src/theme/breakpoints';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { families } from 'src/theme/typography';
import type { SpecialEditionHeaderStyles } from '../../../../Apps/common/src';
import { WithBreakpoints } from '../layout/ui/sizing/with-breakpoints';
import { IssueTitleText } from '../styled-text';

const splitStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		alignSelf: 'flex-end',
	},
	inner: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'flex-start',
	},
});

const GridRowSplit = ({
	children,
	proxy,
	style,
	restrictWidth,
}: {
	children: ReactNode;
	proxy?: ReactNode;
	style?: StyleProp<
		Pick<
			ViewStyle,
			| 'paddingTop'
			| 'paddingVertical'
			| 'paddingBottom'
			| 'marginTop'
			| 'marginVertical'
			| 'marginBottom'
			| 'height'
		>
	>;
	restrictWidth?: boolean;
}) => {
	const Inner = ({
		width,
		innerStyle,
	}: {
		width: number;
		innerStyle?: ViewStyle;
	}) => (
		<View style={[splitStyles.container, style, innerStyle]}>
			{proxy && <View>{proxy}</View>}
			<View style={[splitStyles.inner, { width }]}>{children}</View>
		</View>
	);

	return (
		<WithBreakpoints>
			{{
				0: ({ width }) => (
					<Inner width={metrics.gridRowSplit.narrow(width)} />
				),
				[Breakpoints.tabletVertical]: () => (
					<Inner
						width={metrics.gridRowSplit.wide}
						// -iOS12 and Android style to make the menu look palatable
						innerStyle={restrictWidth ? { maxWidth: 360 } : {}}
					/>
				),
			}}
		</WithBreakpoints>
	);
};

const styles = StyleSheet.create({
	text: {
		marginTop: -2,
		color: color.textOverPrimary,
	},
});

export enum IssueTitleAppearance {
	default,
	ocean,
	tertiary,
}

export interface IssueTitleProps {
	title: string;
	subtitle?: string;
	style?: StyleProp<ViewStyle>;
	overwriteStyles?: SpecialEditionHeaderStyles;
	titleStyle?: StyleProp<ViewStyle>;
	subtitleStyle?: StyleProp<ViewStyle>;
}

const appearances: {
	[key in IssueTitleAppearance]: {
		title?: StyleProp<TextStyle>;
		subtitle: StyleProp<TextStyle>;
	};
} = {
	[IssueTitleAppearance.default]: StyleSheet.create({
		subtitle: { color: color.palette.highlight.main },
	}),
	[IssueTitleAppearance.ocean]: StyleSheet.create({
		subtitle: { color: color.palette.sport.bright },
	}),
	[IssueTitleAppearance.tertiary]: StyleSheet.create({
		title: { color: color.palette.brand.main },
		subtitle: {
			color: color.palette.brand.main,
			fontFamily: families.headline.regular,
		},
	}),
};

const IssueTitle = React.memo(
	({
		title,
		subtitle,
		appearance = IssueTitleAppearance.default,
		overwriteStyles,
		style,
		titleStyle,
		subtitleStyle,
	}: IssueTitleProps & { appearance?: IssueTitleAppearance }) => (
		<View style={style}>
			<IssueTitleText
				style={[
					styles.text,
					appearances[appearance].title,
					titleStyle,
					overwriteStyles && overwriteStyles.textColorPrimary
						? {
								color: overwriteStyles.textColorPrimary,
						  }
						: {},
				]}
			>
				{title}
			</IssueTitleText>
			{!!subtitle && (
				<IssueTitleText
					style={[
						styles.text,
						appearances[appearance].subtitle,
						subtitleStyle,
						overwriteStyles && overwriteStyles.textColorSecondary
							? {
									color: overwriteStyles.textColorSecondary,
							  }
							: {},
					]}
				>
					{subtitle}
				</IssueTitleText>
			)}
		</View>
	),
);

export { IssueTitle, GridRowSplit };
