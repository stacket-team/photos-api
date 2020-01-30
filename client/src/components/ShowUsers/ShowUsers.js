import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const USERS = gql`
    query {
        users {
            _id
            name
        }
    }
`;

const ShowUsers = () => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error :c {error.message}</p>;

  return data.users.map(({ _id, name }) => (
    <div key={_id}>
      <p>{_id}</p>
      <p>{name}</p>
    </div>
  ));
};

export default ShowUsers;
