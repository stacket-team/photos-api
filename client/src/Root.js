import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';

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

const Root = () => <h1>hello world</h1>;

export default Root;
