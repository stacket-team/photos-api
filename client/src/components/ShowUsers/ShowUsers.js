import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import DeleteUser from '../DeleteUser/DeleteUser';

const FETCH_USERS = gql`
    query {
        users {
            _id
            name
        }
    }
`;

const ShowUsers = () => {
  const { loading, error, data } = useQuery(FETCH_USERS);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error :c {error.message}</p>;

  return data.users.map(({ _id, name }) => (
    <div key={_id}>
      <p>{name}</p>
      <DeleteUser id={_id} name={name} />
    </div>
  ));
};

export default ShowUsers;
