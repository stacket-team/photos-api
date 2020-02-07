import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { toast } from 'react-toastify';
import Button from "../Button/Button";
import styled from "styled-components";

const CREATE_USER = gql`
    mutation User($name: String!, $password: String!, $domain: String!) {
        createUser(name: $name, password: $password, domain: $domain) {
            _id
        }
    }
`;

const StyledForm = styled.form`
  width: 250px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.white};
  padding: 30px;
  border-radius: 8px;
  -webkit-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  -moz-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  box-shadow: 7px 7px 18px -8px rgba(0,0,0,1); 
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
  pointer-events: none;
`;

const StyledInput = styled.input` 
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  border: none;
  line-height: 22px;
  height: 100%;
  background: none;
  width: 100%;
  
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

const StyledButton = styled(Button)`
  margin: 30px auto 0;
`;

const CreateUser = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [createUser] = useMutation(CREATE_USER);
  const apolloClient = useApolloClient();

  const handleNameChange = e => setName(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleDomainChange = e => setDomain(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    createUser({ variables: {name, password, domain} })
      .then(() => {
        toast.success(`Created ${name}`);
        apolloClient.resetStore();
      })
      .catch(e => {
        toast.error(`Couldn't create ${name}`);
        console.log(e)
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormItem>
        <StyledInput id="name" name="name" placeholder=" " type="text" onChange={handleNameChange} />
        <StyledLabel htmlFor="name">username</StyledLabel>
        <StyledBar />
      </StyledFormItem>
      <StyledFormItem>
        <StyledInput id="password" name="password" placeholder=" " type="password" onChange={handlePasswordChange} />
        <StyledLabel htmlFor="password">password</StyledLabel>
        <StyledBar />
      </StyledFormItem>
      <StyledFormItem>
        <StyledInput id="domain" name="domain" placeholder=" " type="text" onChange={handleDomainChange} />
        <StyledLabel htmlFor="domain">domain</StyledLabel>
        <StyledBar />
      </StyledFormItem>
      <StyledButton type="submit" big>create user</StyledButton>
    </StyledForm>
  );
};

export default CreateUser;
