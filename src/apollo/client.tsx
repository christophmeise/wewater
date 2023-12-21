import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "isomorphic-fetch";

// Apollo GraphQL client.
export const client = new ApolloClient({
  link: createHttpLink({
    uri: `https://www.wewaterbackend.org/graphql`,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});
