/**
 * Setup Apollo framework. At the moment we use Apollo Local State management
 * mechanism and don't fetch data from GraphQL endpoints.
 */
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { NON_IMPLEMENTED_LINK } from './helpers/apollo_link';
import { resolveLocationPermissionStatus } from './helpers/location-permission';
import { createImageSizeResolver } from './helpers/screen';
import { SETTINGS_RESOLVERS } from './helpers/settings/resolvers';
import { resolveWeather } from './helpers/weather';
import { createIssueSummaryResolver } from './hooks/use-issue-summary';
import { createNetInfoResolver } from './hooks/use-net-info';

export const createApolloClient = () => {
	/**
	 * Resolvers is what Apollo uses to get the value of field that has never been
	 * cached before. For example if you have a query `{ foo @client }`, Apollo
	 * looks for the field `foo` at the root of the cache. If not available, it'll
	 * look for the resolver `Query.foo` (`Query` is just the "namespace" where
	 * all queries start).
	 *  *
	 * Resolvers are functions, which can be asynchonous. They can gather data from
	 * local storage (ex. settings), from local APIs (ex. permissions, geolocation),
	 * from remote APIs (ex. REST API).
	 *
	 * Once a resolver returns a value, Apollo will refresh automatically
	 * any component that was requiring this in a query via the `useQuery` function.
	 */
	const resolvers = {
		Query: {
			...SETTINGS_RESOLVERS,
			weather: resolveWeather,
			locationPermissionStatus: resolveLocationPermissionStatus,
			netInfo: createNetInfoResolver(),
			issueSummary: createIssueSummaryResolver(),
			imageSize: createImageSizeResolver(),
		},
	};

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: NON_IMPLEMENTED_LINK,
		resolvers,
	});

	return client;
};
