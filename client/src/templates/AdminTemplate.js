import React from 'react';
import { useAuthorization } from "../UserContext/UserContext";
import ShowUsers from "../components/ShowUsers/ShowUsers";
import LogoutButton from "../components/LogutButton/LogutButton";

const AdminTemplate = () => {
  useAuthorization((user) => user && user.role === 'admin');

  return (
    <>
      <ShowUsers />
      <LogoutButton />
    </>
  )
};

export default AdminTemplate;
