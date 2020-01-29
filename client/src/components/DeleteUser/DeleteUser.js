import React from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from "@apollo/react-hooks";

const FETCH_USERS = gql`
    query {
        users {
            name
            _id
        }
    }
`;

const DELETE_USER = gql`
    mutation DeleteUser($_id: String!) {
        deleteUser(_id: $_id) {
            _id
        }
    }
`;

const DeleteUser = () => {
  const { loading, error, data } = useQuery(FETCH_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error :c {error.message}</p>;

  return data.users.map(({ _id, name }) => (
    <div key={_id}>
      <p>{_id}</p>
      <p>{name}</p>
      <button onClick={() => deleteUser({ variables: {_id: _id} })}>delete user</button>
    </div>
  ));
};

export default DeleteUser;
