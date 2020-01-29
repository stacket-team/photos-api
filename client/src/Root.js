import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Query from "./components/Query";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

client
  .query({
    query: gql`      
        {
            users {
                _id
            }
        }
    `
  })
  .then(res => console.log(res));

const Root = () => (
  <ApolloProvider client={client}>
    <Query />
  </ApolloProvider>
);

export default Root;
