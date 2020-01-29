import React from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider } from '@apollo/react-hooks';
import ShowUsers from "./components/ShowUsers/ShowUsers";
import CreateUser from "./components/CreateUser/CreateUser";
import DeleteUser from "./components/DeleteUser/DeleteUser";

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
    <ShowUsers />
    <CreateUser />
    <DeleteUser />
  </ApolloProvider>
);

export default Root;
