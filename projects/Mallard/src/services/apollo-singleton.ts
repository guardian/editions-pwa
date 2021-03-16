/**
 * Only one global Apollo client. As such, any update done from any component
 * will cause dependent views to refresh and keep up-to-date.
 */
import { createApolloClient } from 'src/apollo';

export const apolloClient = createApolloClient();
