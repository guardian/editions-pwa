import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { resolveWeatherVisibility } from 'src/helpers/weather-visibility'

const RESOLVERS = {
    /** `Query` is the root object for any Apollo query(). */
    Query: {
        weatherVisibility: resolveWeatherVisibility,
    },
}

export const createApolloClient = () => {
    const link = new HttpLink({
        /** We never fetch from a server at this point in time */
        uri: '',
    })
    return new ApolloClient({
        cache: new InMemoryCache(),
        link,
        resolvers: RESOLVERS,
    })
}
