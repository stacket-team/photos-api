import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import GlobalStyle from './theme/GlobalStyle';
import LoginView from './views/LoginView';
import AdminTemplate from "./templates/AdminTemplate";
import ClientTemplate from "./templates/ClientTemplate";
import { UserContextProvider } from "./UserContext/UserContext";

const client = new ApolloClient({
  uri: '/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
});

const Root = () => (
  <ApolloProvider client={client}>
    <UserContextProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route path="/admin" component={AdminTemplate} />
          <Route exact path="/" component={ClientTemplate} />
        </Switch>
      </Router>
    </UserContextProvider>
  </ApolloProvider>
);

export default Root;
