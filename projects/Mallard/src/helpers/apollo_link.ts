/**
 * The `Link` is the interface Apollo uses to reach GraphQL servers. Since we
 * don't fetch anything from GraphQL endpoints at the moment, we use a no-op
 * `Link` object. We *must* throw to prevent bad queries from carrying through.
 *
 * Apollo would try to use the `Link` if you have a query such as `{ foo }`
 * without the `@client` annotation. In our current use case, `@client` always
 * needs to be specified.
 */
export const NON_IMPLEMENTED_LINK = {
	split: () => {
		throw new Error('Not implemented. Did you forget to use `@client`?');
	},
	concat: () => {
		throw new Error('not implemented Did you forget to use `@client`?');
	},
	request: () => {
		throw new Error('not implemented Did you forget to use `@client`?');
	},
};
