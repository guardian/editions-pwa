import React from 'react';
import type {
	NavigationContainer,
	NavigationInjectedProps,
	NavigationParams,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import { Button } from 'src/components/Button/Button';
import { CloseButton } from 'src/components/Button/CloseButton';
import { IssueTitle } from 'src/components/issue/issue-title';
import { Header } from 'src/components/layout/header/header';
import { addStaticRouter } from '../helpers/base';

interface NavigationOptions {
	title?: string;
	showHeaderRight?: boolean;
	showHeaderLeft?: boolean;
}

type NavOrFn =
	| (({ navigation }: { navigation: NavigationParams }) => NavigationOptions)
	| NavigationOptions;

const getNavigationOptions = (
	navigation: NavigationParams,
	options: NavOrFn,
): NavigationOptions => {
	if (typeof options === 'function') {
		return options({ navigation });
	}
	return options;
};
const addStaticRouterWithHeader = (
	Navigator: NavigationContainer,
): NavigationContainer => {
	const { router } = Navigator;

	const WithHeader = ({ navigation }: NavigationInjectedProps) => {
		const component = router.getComponentForState(navigation.state);
		const options = getNavigationOptions(
			navigation,
			component.navigationOptions,
		);

		const showHeaderLeft =
			options.showHeaderLeft !== undefined
				? options.showHeaderLeft
				: true;
		const showHeaderRight =
			options.showHeaderRight !== undefined
				? options.showHeaderRight
				: false;
		const title = options.title ?? navigation.state.routeName;

		return (
			<>
				<Header
					leftAction={
						showHeaderLeft ? (
							<Button
								icon={'\uE00A'}
								alt="Back"
								onPress={() => navigation.goBack(null)}
							></Button>
						) : null
					}
					action={
						showHeaderRight ? (
							<CloseButton
								accessibilityLabel={`Close the ${title} screen`}
								accessibilityHint="Closes the current screen"
								onPress={() => navigation.goBack(null)}
							/>
						) : null
					}
					layout={'center'}
				>
					<IssueTitle title={title} />
				</Header>
				<Navigator navigation={navigation} />
			</>
		);
	};

	return addStaticRouter(Navigator, WithHeader);
};

const createHeaderStackNavigator = (
	routes: Parameters<typeof createStackNavigator>[0],
	options?: Parameters<typeof createStackNavigator>[1],
) =>
	addStaticRouterWithHeader(
		createStackNavigator(routes, { ...options, headerMode: 'none' }),
	);

export { createHeaderStackNavigator, addStaticRouterWithHeader };
