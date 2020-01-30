import React from 'react';
import {useAuthorization} from "../UserContext/UserContext";
import LogoutButton from "../components/LogutButton/LogutButton";

const ClientTemplate = () => {
  useAuthorization((user) => user);

  return (
    <>
      <h1>client template</h1>
      <LogoutButton />
    </>
  )
};

export default ClientTemplate;
