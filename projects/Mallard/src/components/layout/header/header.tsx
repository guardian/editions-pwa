import type { ReactNode } from 'react';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Highlight } from 'src/components/highlight';
import { GridRowSplit } from 'src/components/issue/issue-title';
import { useInsets, useMediaQuery } from 'src/hooks/use-screen';
import { WithAppAppearance } from 'src/theme/appearance';
import { Breakpoints } from 'src/theme/breakpoints';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { getFont } from 'src/theme/typography';
import type { SpecialEditionHeaderStyles } from '../../../../../Apps/common/src';

const styles = StyleSheet.create({
	background: {
		backgroundColor: color.primary,
		paddingVertical: metrics.vertical,
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	backgroundWhite: {
		backgroundColor: color.background,
		borderBottomColor: color.line,
		borderBottomWidth: StyleSheet.hairlineWidth,
		paddingVertical: metrics.vertical,
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	height: {
		height: metrics.vertical + getFont('titlepiece', 1.25).lineHeight * 1.5,
	},
	flex: {
		flexDirection: 'row',
	},
	headerSplit: {
		flexDirection: 'row',
		flex: 1,
	},
	headerTitle: {
		marginRight: metrics.horizontal,
	},

	centerWrapper: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	centerTitle: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1,
	},
	leftAction: {
		width: 90,
		zIndex: 2,
		paddingLeft: metrics.horizontal,
	},
	centerAction: {
		zIndex: 2,
		paddingRight: metrics.horizontal,
	},
});

type TouchableHeaderProps =
	| { onPress: () => void; accessibilityHint: string }
	| {};

type HeaderProps = {
	theme?: 'light' | 'default';
	headerStyles?: SpecialEditionHeaderStyles;
	action?: ReactNode;
	leftAction?: ReactNode;
	layout?: 'issue' | 'center';
	alignment?: 'drawer' | null;
	children: ReactNode;
} & TouchableHeaderProps;

const Header = ({
	action,
	theme,
	headerStyles,
	leftAction,
	layout = 'issue',
	alignment = null,
	children,
	...otherProps
}: HeaderProps) => {
	const { top: marginTop } = useInsets();
	const bg = theme === 'light' ? styles.backgroundWhite : styles.background;
	const isTablet = useMediaQuery(
		(width) => width >= Breakpoints.tabletVertical,
	);
	const headerSplitFlex =
		isTablet && alignment !== 'drawer' ? 'flex-end' : 'space-between';

	return (
		<WithAppAppearance value={theme === 'light' ? 'default' : 'primary'}>
			{theme === 'light' && (
				<StatusBar barStyle="dark-content" backgroundColor="#fff" />
			)}
			<View
				style={[
					bg,
					headerStyles && {
						backgroundColor: headerStyles.backgroundColor,
					},
				]}
			>
				{layout === 'issue' ? (
					<GridRowSplit
						proxy={
							<View style={styles.leftAction}>{leftAction}</View>
						}
						style={[{ marginTop }, styles.height]}
					>
						<View
							style={[
								styles.headerSplit,
								{ justifyContent: headerSplitFlex },
							]}
						>
							<View style={styles.headerTitle}>
								{'onPress' in otherProps ? (
									<Highlight
										onPress={otherProps.onPress}
										accessibilityHint={
											otherProps.accessibilityHint
										}
										hitSlop={{
											top: 10,
											bottom: 10,
											left: 10,
											right: 10,
										}}
									>
										{children}
									</Highlight>
								) : (
									children
								)}
							</View>
							<View style={{ paddingRight: metrics.horizontal }}>
								{action}
							</View>
						</View>
					</GridRowSplit>
				) : (
					<View style={{ marginTop, width: '100%' }}>
						<View style={[styles.height, styles.centerWrapper]}>
							<View style={styles.leftAction}>{leftAction}</View>
							<View style={styles.centerAction}>{action}</View>
							<View style={styles.centerTitle}>{children}</View>
						</View>
					</View>
				)}
			</View>
		</WithAppAppearance>
	);
};

export { Header };
