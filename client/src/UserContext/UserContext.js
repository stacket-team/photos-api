import React, {createContext, useEffect, useState} from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from "@apollo/react-hooks";

const CURRENT_USER = gql`
    query {
        currentUser {
            _id
            name
            role
        }
    }
`;

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [updateToken, setUpdateToken] = useState(false);
  const [fetchUser, { data }] = useLazyQuery(CURRENT_USER);

  const doUpdateToken = () => setUpdateToken(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if ((!user && token) || updateToken) {
      fetchUser();
      setUpdateToken(false);
    }
  }, [user, fetchUser, updateToken]);

  useEffect(() => {
    if (data) {
      setUser(data.currentUser);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      doUpdateToken
    }}>
      {children}
    </UserContext.Provider>
  )
};

export default UserContext;
