import React from 'react';
import { useAuthorization } from "../UserContext/UserContext";
import ShowUsers from "../components/ShowUsers/ShowUsers";
import CreateUser from "../components/CreateUser/CreateUser";
import Header from "../components/Header/Header";

const AdminTemplate = () => {
  const { user } = useAuthorization((user) => user && user.role === 'admin');

  return user ? (
    <>
      <Header />
      <ShowUsers />
      <CreateUser />
    </>
  ) : null;
};

export default AdminTemplate;
