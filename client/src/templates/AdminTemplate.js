import React from 'react';
import { useAuthorization } from "../UserContext/UserContext";
import ShowUsers from "../components/ShowUsers/ShowUsers";
import LogoutButton from "../components/LogutButton/LogutButton";
import CreateUser from "../components/CreateUser/CreateUser";

const AdminTemplate = () => {
  useAuthorization((user) => user && user.role === 'admin');

  return (
    <>
      <ShowUsers />
      <CreateUser />
      <LogoutButton />
    </>
  )
};

export default AdminTemplate;
