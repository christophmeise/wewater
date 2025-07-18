import { ApolloProvider } from "@apollo/client";
import React from "react";
import { client } from "./client";

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
