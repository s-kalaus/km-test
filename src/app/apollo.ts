import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () =>
  new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });
