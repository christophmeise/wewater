
import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { AppProvider } from "../components/context/AppContext";
import { client } from './client';

export const wrapRootElement = ({ element }) => (
	<AppProvider>
		<ApolloProvider client={client}>{element}</ApolloProvider>
	</AppProvider>
);
