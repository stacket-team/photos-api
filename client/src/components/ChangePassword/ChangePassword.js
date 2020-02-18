import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { toast } from 'react-toastify';
import Button from "../Button/Button";
import styled from "styled-components";
import Form from "../Form/Form";
import FormItem from "../Form/FormItem";

const UPDATE_USER = gql`
    mutation UpdateUser($_id: String!, $password: String!) {
        updateUser(_id: $_id, password: $password) {
            _id
        }
    }
`;

const StyledButton = styled(Button)`
  margin: 30px auto 0;
`;

const ChangePassword = ({ closeModal, _id }) => {
  const [password, setPassword] = useState('');
  const [updateUser] = useMutation(UPDATE_USER);
  const apolloClient = useApolloClient();

  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateUser({ variables: { _id, password } });
      toast.success('updated password');
      closeModal();
      await apolloClient.resetStore();
    } catch (error) {
      toast.error('error occured');
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem id="password" name="password" type="password" onChange={handlePasswordChange} content="password" htmlFor="password" />
      <StyledButton type="submit" big>update</StyledButton>
    </Form>
  );
};

export default ChangePassword;
