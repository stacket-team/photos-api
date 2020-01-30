import React from 'react';
import { useAuthorization } from "../UserContext/UserContext";

const AdminTemplate = () => {
  const condition = user => user && user.role === 'admin';
  useAuthorization(condition);

  return (
    <h1>admin template</h1>
  )
};

export default AdminTemplate;
