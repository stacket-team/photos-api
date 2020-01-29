import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";

const CREATE_USER = gql`
    mutation User($name: String!, $pass: String!) {
        createUser(user: {
            name: $name,
            password: $pass
        }) {_id}
    }
`;

const CreateUser = () => {
  const [createUser] = useMutation(CREATE_USER);

  return (
    <div>
      <form onSubmit={e => {
        createUser({ variables: {name: 'test', pass: 'test'} });
      }}>
        <button type="submit">create user</button>
      </form>
    </div>
  );
};

export default CreateUser;
