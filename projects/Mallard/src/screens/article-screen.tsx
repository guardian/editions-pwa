import type { ReactNode } from 'react';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import type { Appearance } from 'src/common';
import { FlexErrorMessage } from 'src/components/layout/ui/errors/flex-error-message';
import { LoginOverlay } from 'src/components/login/login-overlay';
import { ERR_404_MISSING_PROPS } from 'src/helpers/words';
import { getAppearancePillar } from 'src/hooks/use-article';
import { useDimensions } from 'src/hooks/use-config-provider';
import type { ArticleNavigationProps } from 'src/navigation/helpers/base';
import { getArticleNavigationProps } from 'src/navigation/helpers/base';
import { routeNames } from 'src/navigation/routes';
import type { PathToArticle } from 'src/paths';
import { sendPageViewEvent } from 'src/services/ophan';
import { color } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';
import { ArticleScreenBody } from './article/body';
import { ArticleSlider } from './article/slider';

export interface ArticleTransitionProps {
	startAtHeightFromFrontsItem: number;
}

export type FrontSpec = {
	frontName: string;
	appearance: Appearance;
	articleSpecs: PathToArticle[];
};

export type ArticleSpec = PathToArticle & {
	frontName: string;
	appearance: Appearance;
};

export type ArticleNavigator = FrontSpec[];

export const getArticleDataFromNavigator = (
	navigator: ArticleNavigator,
	currentArticle: PathToArticle,
): {
	startingPoint: number;
	appearance: Appearance;
	frontName: string;
	flattenedArticles: ArticleSpec[];
} => {
	const flattenedArticles: ArticleSpec[] = [];
	navigator.forEach((frontSpec) =>
		frontSpec.articleSpecs.forEach((as) =>
			flattenedArticles.push({
				...as,
				appearance: frontSpec.appearance,
				frontName: frontSpec.frontName,
			}),
		),
	);

	const startingPoint = flattenedArticles.findIndex(
		({ article, front }) =>
			currentArticle.article === article &&
			currentArticle.front === front,
	);
	if (startingPoint < 0)
		return {
			startingPoint: 0,
			appearance: { type: 'pillar', name: 'neutral' } as const,
			frontName: '',
			flattenedArticles: [
				{
					...currentArticle,
					appearance: { type: 'pillar', name: 'neutral' } as const,
					frontName: '',
				},
				...flattenedArticles,
			],
		};
	return {
		startingPoint,
		appearance: flattenedArticles[startingPoint].appearance,
		frontName: flattenedArticles[startingPoint].frontName,
		flattenedArticles,
	};
};

const ArticleScreenLoginOverlay = ({
	navigation,
	children,
}: {
	navigation: NavigationScreenProp<{}, ArticleNavigationProps>;
	children: ReactNode;
}) => (
	<LoginOverlay
		isFocused={() => navigation.isFocused()}
		onLoginPress={() => navigation.navigate(routeNames.SignIn)}
		onOpenCASLogin={() => navigation.navigate(routeNames.CasSignIn)}
		onDismiss={() => navigation.goBack()}
	>
		{children}
	</LoginOverlay>
);

const styles = StyleSheet.create({
	refView: { flex: 1 },
});

const ArticleScreenWithProps = ({
	path,
	articleNavigator,
	navigation,
	prefersFullScreen,
}: Required<ArticleNavigationProps> & {
	navigation: NavigationScreenProp<{}, ArticleNavigationProps>;
}) => {
	const current = getArticleDataFromNavigator(articleNavigator, path);
	// TODO use `getData` for this
	const pillar = getAppearancePillar(current.appearance);
	const viewRef = useRef<View>();
	const { width } = useDimensions();
	useEffect(() => {
		if (viewRef.current) {
			viewRef.current.setNativeProps({ opacity: 0 });
			setTimeout(() => {
				viewRef.current &&
					viewRef.current.setNativeProps({ opacity: 1 });
			}, 600);
		}
	}, [width]);
	return (
		<ArticleScreenLoginOverlay navigation={navigation}>
			<View
				style={styles.refView}
				ref={(r) => {
					if (r) viewRef.current = r;
				}}
			>
				{prefersFullScreen ? (
					<>
						<ArticleScreenBody
							navigation={navigation}
							path={path}
							width={width}
							pillar={pillar}
							onShouldShowHeaderChange={() => {}}
							shouldShowHeader={true}
							topPadding={0}
						/>
					</>
				) : (
					<ArticleSlider
						navigation={navigation}
						path={path}
						articleNavigator={articleNavigator}
					/>
				)}
			</View>
		</ArticleScreenLoginOverlay>
	);
};

export const ArticleScreen = ({
	navigation,
}: {
	navigation: NavigationScreenProp<{}, ArticleNavigationProps>;
}) =>
	getArticleNavigationProps(navigation, {
		error: () => (
			<FlexErrorMessage
				title={ERR_404_MISSING_PROPS}
				style={{ backgroundColor: color.background }}
			/>
		),
		success: (props) => {
			if (props.path && props.path.article) {
				sendPageViewEvent({ path: props.path.article });
			}
			return <ArticleScreenWithProps {...{ navigation }} {...props} />;
		},
	});

ArticleScreen.navigationOptions = ({
	navigation,
}: {
	navigation: NavigationScreenProp<{}>;
}) => ({
	title: navigation.getParam('title', 'Loading'),
	gesturesEnabled: true,
	gestureResponseDistance: {
		vertical: metrics.headerHeight + metrics.slideCardSpacing,
	},
});
