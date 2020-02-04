import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import UserContext from "../UserContext/UserContext";
import { toast } from 'react-toastify';
import Button from '../components/Button/Button';

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
  background: ${({ theme }) => theme.color.white};
  padding: 30px;
  border-radius: 8px;
  -webkit-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  -moz-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  box-shadow: 7px 7px 18px -8px rgba(0,0,0,1); 
`;

const StyledButton = styled(Button)`
  margin: 35px auto 0 auto;
`;

const StyledFormItem = styled.div`
  width: 100%;
  margin: 24px 0;
  position: relative;
  flex-shrink: 0;
`;

const StyledBar = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.color.red};
  transition: all 0.1s;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.color.primary};
  position: absolute;
  top: 3px;
  left: 0;
  transition: 0.2s ease-in-out;
  font-size: 24px;
`;

const StyledInput = styled.input` 
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  border: none;
  line-height: 22px;
  height: 100%;
  background: none;
  
  &:focus {
    outline: none;
  }
  
  &:focus + label {
    top: -22px;
    font-size: 18px;
  }
  
  &:not(:placeholder-shown) + label {
    top: -22px;
    font-size: 18px;
  }
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
      .catch(error => console.error(error));
  };

  const handleNameChange = e => setName(e.target.value);
  const handlePasswordName = e => setPassword(e.target.value);

  useEffect(() => {
    if (error && /Invalid Login/.test(error.message)) toast.error("invalid login credentials");
  }, [error]);

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormItem>
          <StyledInput name="name" id="name" type="text" placeholder=" " required onChange={handleNameChange} />
          <StyledLabel htmlFor="name">username</StyledLabel>
          <StyledBar />
        </StyledFormItem>
        <StyledFormItem>
          <StyledInput name="password" id="password" type="password" placeholder=" " required onChange={handlePasswordName} />
          <StyledLabel htmlFor="password">password</StyledLabel>
          <StyledBar />
        </StyledFormItem>
        <StyledButton>login</StyledButton>
      </StyledForm>
    </StyledWrapper>
  )
};

export default LoginView;
