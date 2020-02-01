import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from './theme/GlobalStyle';
import LoginView from './views/LoginView';
import AdminTemplate from "./templates/AdminTemplate";
import ClientTemplate from "./templates/ClientTemplate";
import { UserContextProvider } from "./UserContext/UserContext";

const Root = () => (
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
);

export default Root;
