import React, {createContext, useContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";

const CURRENT_USER = gql`
    query {
        currentUser {
            _id
            name
            role
            photos {
                _id
                title
                description
                src
            }
        }
    }
`;

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const { data, refetch } = useQuery(CURRENT_USER);

  const doUpdateToken = () => setUser(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setUser(null);
    if (user === undefined) refetch();
  }, [user, refetch]);

  useEffect(() => {
    if (data) setUser(data.currentUser);
  }, [data]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      doUpdateToken,
    }}>
      {children}
    </UserContext.Provider>
  )
};

export const useAuthorization = (condition) => {
  const [fetchedUser, setFetchedUser] = useState(undefined);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user !== undefined) {
      if (!condition(user)) {
        history.push('/login');
      } else {
        setFetchedUser(user);
      }
    }
  }, [user, condition, history]);

  return { user: fetchedUser };
};

export default UserContext;
