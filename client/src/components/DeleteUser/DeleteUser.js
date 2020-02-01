import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';

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

  const handleDelete = () => {
    deleteUser({variables: { id }})
      .then(() => {
        toast.success(`Removed ${name}`);
        apolloClient.resetStore();
      })
      .catch(error => {
        toast.error(`Couldn't remove ${name}`);
        console.error(error);
      });
  };

  return <button onClick={handleDelete}>delete button</button>;
}

export default DeleteUser;