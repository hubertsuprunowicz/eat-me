import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { ApolloLink, split, GraphQLRequest } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

require('dotenv').config();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL || 'http://localhost:4000/graphql',
});

const authLink = setContext((_: GraphQLRequest, { headers }: any) => {
  const token = sessionStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const prelink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL || 'http://localhost:4000/graphql',
});

const isFile = (value: any) =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob);

const isUpload = ({ variables }: any) => Object.values(variables).some(isFile);

const terminalLink = split(isUpload, uploadLink, prelink);

const link = ApolloLink.from([
  new RetryLink(),
  errorLink,
  authLink,
  terminalLink,
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({ addTypename: false }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
