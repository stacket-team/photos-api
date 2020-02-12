import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { toast } from 'react-toastify';
import Button from "../Button/Button";
import styled from "styled-components";
import Form from "../Form/Form";
import FormItem from "../Form/FormItem";

const CREATE_USER = gql`
    mutation User($name: String!, $password: String!, $domain: String!) {
        createUser(name: $name, password: $password, domain: $domain) {
            _id
        }
    }
`;

const StyledButton = styled(Button)`
  margin: 30px auto 0;
`;

const CreateUser = ({ closeModal }) => {
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
        closeModal();
        apolloClient.resetStore();
      })
      .catch(e => {
        toast.error(`Couldn't create ${name}`);
        console.log(e)
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem id="name" name="name" type="text" onChange={handleNameChange} content="username" htmlFor="name" />
      <FormItem id="password" name="password" type="password" onChange={handlePasswordChange} content="password" htmlFor="password" />
      <FormItem id="domain" name="domain" type="domain" onChange={handleDomainChange} content="domain" htmlFor="domain" />
      <StyledButton type="submit" big>create user</StyledButton>
    </Form>
  );
};

export default CreateUser;
