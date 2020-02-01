import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import UserContext from "../UserContext/UserContext";
import { toast } from 'react-toastify';

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

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  margin: 10px auto 0 auto;
  padding: 12px 7px;
  width: 200px;
  font-family: inherit;
  background: #ff8e3c;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  text-transform: uppercase;
`;

const StyledInput = styled.input` 
  background: none;
  font-family: inherit;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ff8e3c;
  line-height: 2.2rem;
  padding: 12px;
`;

const LoginView = () => {
  const history = useHistory();

  const [login, { error, data }] = useMutation(LOGIN);
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
    login({ variables: { name, password }})
      .catch(e => console.log(e));
  };

  const handleNameChange = e => setName(e.target.value);
  const handlePassChange = e => setPassword(e.target.value);

  useEffect(() => {
    if (error && /Invalid Login/.test(error.message)) toast.error("Invalid login credentials");
  }, [error]);

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput name="name" onChange={handleNameChange} value={name} placeholder="name" />
        <StyledInput name="password" type="password" onChange={handlePassChange} value={password} placeholder="password" />
        <StyledButton type="submit">login</StyledButton>
      </StyledForm>
    </StyledWrapper>
  )
};

export default LoginView;
