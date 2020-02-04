import React from 'react';
import {useAuthorization} from "../UserContext/UserContext";
import Header from "../components/Header/Header";
import UploadFile from '../components/UploadFile/UploadFile';
import ShowPhotos from "../components/ShowPhotos/ShowPhotos";

const ClientTemplate = () => {
  const { user } = useAuthorization((user) => user);

  return user ? (
    <>
      <Header loggedAs={user.name} />
      <UploadFile user={user} />
      <ShowPhotos />
    </>
  ) : null;
};

export default ClientTemplate;
