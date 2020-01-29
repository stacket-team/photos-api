import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const USERS = gql`
    query {
        users {
            _id
            name
        }
    }
`;

const Query = () => {
  const { loading, error ,data } = useQuery(USERS);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error :c</p>;

  return data.users.map(({ _id, name }) => (
    <div key={_id}>
      <p>{name}</p>
    </div>
  ));
};

export default Query;
