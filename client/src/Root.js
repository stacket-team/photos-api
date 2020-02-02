import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from './theme/GlobalStyle';
import LoginView from './views/LoginView';
import AdminTemplate from "./templates/AdminTemplate";
import ClientTemplate from "./templates/ClientTemplate";
import { UserContextProvider } from "./UserContext/UserContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

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
    <ToastContainer />
  </UserContextProvider>
);

export default Root;
