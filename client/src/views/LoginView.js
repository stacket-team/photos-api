import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import UserContext from "../UserContext/UserContext";

const LOGIN = gql`
    mutation Login($name: String!, $password: String! ) {
        login(name: $name, password: $password) {
            token
            user {
                role
            }
        }
    }
`;

const LoginView = () => {
  const history = useHistory();

  const [login, { data }] = useMutation(LOGIN);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { doUpdateToken } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.login.token);
      doUpdateToken();
      const role = data.login.user.role;
      if (role === "admin") {
        history.push('/admin');
      } else {
        history.push('/');
      }
    }
  }, [data, history, doUpdateToken]);

  const handleSubmit = e => {
    e.preventDefault();
    login({ variables: { name, password }});
  };

  const handleNameChange = e => setName(e.target.value);
  const handlePassChange = e => setPassword(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleNameChange} value={name} />
      <input type="password" onChange={handlePassChange} value={password} />
      <button type="submit">submit</button>
    </form>
  )
};

export default LoginView;
