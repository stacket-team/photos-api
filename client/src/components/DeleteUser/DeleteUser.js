import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import Button from "../Button/Button";

const DELETE_USER = gql`
    mutation deleteUser($id: String!) {
        deleteUser(_id: $id) {
            name
        }
    }
`;

const DeleteUser = ({ id, name }) => {
  const [ deleteUser ] = useMutation(DELETE_USER);
  const apolloClient = useApolloClient();

  const handleDelete = async () => {
    try {
      await deleteUser({ variables: { id } });
      toast.success(`removed ${name}`);
      await apolloClient.resetStore();
    } catch (error) {
      toast.error(`couldn't remove ${name}`);
      console.error(error);
    }
  };

  return <Button onClick={handleDelete} big>delete user</Button>;
};

export default DeleteUser;
