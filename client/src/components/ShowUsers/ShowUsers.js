import React from 'react';
import styled from "styled-components";
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

const StyledWrapper = styled.div`
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: ${({ theme }) => theme.color.white};
`;

const StyledName = styled.p`
  color: ${({ theme }) => theme.color.primary}; 
  font-size: 24px;
  margin-right: 25px;
`;

const ShowUsers = () => {
  const { loading, error, data } = useQuery(FETCH_USERS);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error :c {error.message}</p>;

  return data.users.map(({ _id, name }) => (
    <StyledWrapper key={_id}>
      <StyledName>{name}</StyledName>
      <DeleteUser id={_id} name={name} />
    </StyledWrapper>
  ));
};

export default ShowUsers;
