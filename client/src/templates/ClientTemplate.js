import React from 'react';
import {useAuthorization} from "../UserContext/UserContext";
import Header from "../components/Header/Header";
import { UploadFile } from '../components/UploadFile/UploadFile';

const ClientTemplate = () => {
  const { user } = useAuthorization((user) => user);

  return user ? (
    <>
      <Header loggedAs={user.name} />
      <h1>client template</h1>
      <UploadFile user={user} />
    </>
  ) : null;
};

export default ClientTemplate;
