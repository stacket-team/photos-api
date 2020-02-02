import React from 'react';
import {useAuthorization} from "../UserContext/UserContext";
import Header from "../components/Header/Header";
import UploadFile from '../components/UploadFile/UploadFile';
import ShowPhotos from "../ShowPhotos/ShowPhotos";

const ClientTemplate = () => {
  const { user } = useAuthorization((user) => user);

  return user ? (
    <>
      <Header loggedAs={user.name} />
      <ShowPhotos />
      <UploadFile user={user} />
    </>
  ) : null;
};

export default ClientTemplate;
