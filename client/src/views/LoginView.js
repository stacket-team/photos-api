import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import UserContext from "../UserContext/UserContext";
import { toast } from 'react-toastify';
import Button from '../components/Button/Button';
import Form from "../components/Form/Form";
import FormItem from "../components/Form/FormItem";

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

const StyledButton = styled(Button)`
  margin: 35px auto 0 auto;
`;

const LoginView = () => {
  const history = useHistory();

  const [login, { error }] = useMutation(LOGIN);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { doUpdateToken } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    login({ variables: { name, password }})
      .then(({ data: { login } }) => {
        localStorage.setItem('token', login.token);
        doUpdateToken();
        const role = login.user.role;
        if (role === "admin") {
          history.push('/admin');
        } else {
          history.push('/');
        }
      })
      .catch(error => console.error(error));
  };

  const handleNameChange = e => setName(e.target.value);
  const handlePasswordName = e => setPassword(e.target.value);

  useEffect(() => {
    if (error && /Invalid Login/.test(error.message)) toast.error("invalid login credentials");
  }, [error]);

  return (
    <StyledWrapper>
      <Form onSubmit={handleSubmit}>
        <FormItem name="name" id="name" type="text" required onChange={handleNameChange} content="username" htmlFor="name" />
        <FormItem name="password" id="password" type="password" required onChange={handlePasswordName} content="password" htmlFor="password" />
        <StyledButton>login</StyledButton>
      </Form>
    </StyledWrapper>
  )
};

export default LoginView;
