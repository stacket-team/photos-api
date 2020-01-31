import React from 'react';
import { useAuthorization } from "../UserContext/UserContext";
import ShowUsers from "../components/ShowUsers/ShowUsers";
import CreateUser from "../components/CreateUser/CreateUser";
import Header from "../components/Header/Header";

const AdminTemplate = () => {
  useAuthorization((user) => user && user.role === 'admin');

  return (
    <>
      <Header />
      <ShowUsers />
      <CreateUser />
    </>
  )
};

export default AdminTemplate;
