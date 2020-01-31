import React from 'react';
import {useAuthorization} from "../UserContext/UserContext";
import Header from "../components/Header/Header";

const ClientTemplate = () => {
  const { user } = useAuthorization((user) => user);

  return user ? (
    <>
      <Header />
      <h1>client template</h1>
    </>
  ) : null;
};

export default ClientTemplate;
