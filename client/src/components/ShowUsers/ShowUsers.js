import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const FETCH_USERS = gql`
    query {
        users {
            _id
            name
        }
    }
`;

const DELETE_USER = gql`
    mutation deleteUser($id: String!) {
        deleteUser(_id: $id) {
            name
        }
    }
`;

const ShowUsers = () => {
  const { loading, error, data, refetch } = useQuery(FETCH_USERS);
  const [ deleteUser ] = useMutation(DELETE_USER);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error :c {error.message}</p>;

  const handleDelete = (e) => {
    deleteUser({variables: { id: e.target.name }})
      .then(refetch)
      .catch(error => console.error(error));
  };

  return data.users.map(({ _id, name }) => (
    <div key={_id}>
      <p>{name}</p>
      <button name={_id} onClick={handleDelete}>delete button</button>
    </div>
  ));
};

export default ShowUsers;
