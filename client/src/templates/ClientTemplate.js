import React from 'react';
import {useAuthorization} from "../UserContext/UserContext";
import Header from "../components/Header/Header";
import UploadFile from '../components/UploadFile/UploadFile';
import ShowPhotos from "../components/ShowPhotos/ShowPhotos";
import Modal from '../components/Modal/Modal';

const ClientTemplate = () => {
  const { user } = useAuthorization((user) => user);

  return user ? (
    <>
      <Header loggedAs={ user.name }>
        <Modal component={ UploadFile } props={{ user }}>upload photo</Modal>
      </Header>
      <ShowPhotos />
    </>
  ) : null;
};

export default ClientTemplate;
