import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('tokenxjwt_id')

  // console.log('token: ', token)
  
  return {
    headers: {
      ...headers,
      authorization: token || null
    }
  }
})
  
// const httpLink = createHttpLink({ uri: 'https://darling-glider-87.hasura.app/v1/graphql' })
// const httpLink = createHttpLink({ uri: 'https://rapid-reptile-58.hasura.app/v1/graphql' })
const httpLink = createHttpLink({ uri: 'https://above-stag-34.hasura.app/v1/graphql' })
const wsLink = new WebSocketLink(
  { 
    // uri: 'wss://darling-glider-87.hasura.app/v1/graphql',
    // uri: 'wss://above-stag-34.hasura.app/v1/graphql',
    uri: 'wss://above-stag-34.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: localStorage.getItem('tokenxjwt_id') ? localStorage.getItem('tokenxjwt_id') : null
        }
      }
    }
  }
)
  
const cache = new InMemoryCache()
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
  
    return definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)
  
// Create the apollo client
export const apolloClient = new ApolloClient({
  // link: httpLink,
  // link: authLink.concat(httpLink),
  link: authLink.concat(link),
  cache
})
  
// const apolloProvider = new VueApollo({ defaultClient: apolloClient })