/**
 * Shorthands to get some of the settings when you only need one. Do not call
 * several of these in the same `render()` function. Instead, use `useQuery`
 * directly so that all the fetches are batched.
 */
import { isPreview } from 'src/helpers/settings/defaults'
import { useQuery } from './apollo'
import gql from 'graphql-tag'

const API_URL_QUERY = gql('{ apiUrl @client }')
export const useApiUrl = () => {
    const query = useQuery<{ apiUrl: string }>(API_URL_QUERY)
    if (!query.loading) return query.data.apiUrl
    return null
}

const EDITION_QUERY = gql('{ edition @client }')
export const useEdition = () => {
    const query = useQuery<{ edition: string }>(EDITION_QUERY)
    if (!query.loading) return query.data.edition
    return null
}

export const useIsPreview = () => {
    const apiUrl = useApiUrl()
    // FIXME: upstream code should be handling the loading status
    return apiUrl != null && isPreview(apiUrl)
}

export const useIsProof = () => {
    const apiUrl = useApiUrl()
    return apiUrl && apiUrl.includes('proof')
}
