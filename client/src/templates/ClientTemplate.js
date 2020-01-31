import React from 'react';
import {useAuthorization} from "../UserContext/UserContext";
import Header from "../components/Header/Header";

const ClientTemplate = () => {
  useAuthorization((user) => user);

  return (
    <>
      <Header />
      <h1>client template</h1>
    </>
  )
};

export default ClientTemplate;
