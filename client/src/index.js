import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from '@apollo/react-hooks';

class Authorization {
  get headers() {
    const token = localStorage.getItem('token');
    return { authorization: token ? `Bearer ${token}` : '' }
  }
}

const authorization = new Authorization();

const client = new ApolloClient({
  link: createUploadLink({
    uri: `${ process.env.REACT_APP_BACKEND_BASE }/graphql`,
    headers: authorization.headers
  }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root')
);
