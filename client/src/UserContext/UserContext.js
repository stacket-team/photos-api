import React, {createContext, useContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
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
  const [user, setUser] = useState(null);
  const [updateToken, setUpdateToken] = useState(false);
  const [fetchUser, { data }] = useLazyQuery(CURRENT_USER);

  const doUpdateToken = () => {
    setUser(null);
    setUpdateToken(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if ((!user && token) || updateToken) {
      fetchUser();
      setUpdateToken(false);
    }
    if (!token) {
      setUser(undefined);
    }
  }, [user, fetchUser, updateToken]);

  useEffect(() => {
    if (data !== undefined) {
      if (data && data.currentUser) {
        setUser(data.currentUser);
      } else {
        setUser(undefined);
      }
    }
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
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user !== null) {
      if (!condition(user)) history.push('/login')
    }
  }, [user, condition, history]);
};


// export const withAuthorization = (condition) => Component => {
//   class WithAuthorization extends React.Component {
//
//     componentDidMount() {
//       if (!condition)
//     }
//
//     render() {
//       return (
//         <Component {...this.props} />
//       )
//     }
//   }
// };


export default UserContext;
