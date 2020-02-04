import React from 'react';
import { useAuthorization } from "../UserContext/UserContext";
import ShowUsers from "../components/ShowUsers/ShowUsers";
import CreateUser from "../components/CreateUser/CreateUser";
import Header from "../components/Header/Header";
import Modal from '../components/Modal/Modal';

const AdminTemplate = () => {
  const { user } = useAuthorization((user) => user && user.role === 'admin');
  return user ? (
    <>
      <Header loggedAs={ user.name }>
        <Modal component={ CreateUser }>add user</Modal>
      </Header>
      <ShowUsers />
    </>
  ) : null;
};

export default AdminTemplate;
