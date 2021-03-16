import { useQuery as useApolloQuery } from '@apollo/react-hooks';
import type ApolloClient from 'apollo-client';
import type { DocumentNode } from 'graphql';

export type QueryResult<Data> = (
	| { loading: true }
	| { loading: false; data: Data }
) & {
	client: ApolloClient<object>;
};

/**
 * Light wrapper around Apollo own `useQuery` to directly throw errors (to be
 * caught by the closest exception handler). This allows callsites to have
 * less boilerplate code and is more idiomatic modern React.
 *
 * This also returns a strongly typed object indicating if we're still loading.
 * Once all the data is available, the component re-renders and
 * `useQuery` will return the final data.
 */
export const useQuery = <Data, Variables = undefined>(
	query: DocumentNode,
	variables?: Variables,
): QueryResult<Data> => {
	const { loading, error, data, client } = useApolloQuery(query, {
		variables,
	});
	if (error != null) {
		throw error;
	}
	if (loading) {
		return { loading: true, client };
	}
	if (data == null) {
		throw new Error(
			'Data returned by Apollo is empty, but it has finished loading. ' +
				'This happens when trying to fetch a @client field that ' +
				'has no resolver: https://github.com/apollographql/react-apollo/issues/1314',
		);
	}
	return { loading: false, client, data };
};
