import React from 'react';
import styled from "styled-components";
import DeleteUser from '../DeleteUser/DeleteUser';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  margin: 50px;
`;

const StyledCard = styled.div`
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: ${({ theme }) => theme.color.white};
  align-self: center;
  justify-self: center;
  -webkit-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  -moz-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  box-shadow: 7px 7px 18px -8px rgba(0,0,0,1); 
`;

const StyledName = styled.p`
  color: ${({ theme }) => theme.color.primary}; 
  font-size: 24px;
  margin-right: 25px;
`;

const StyledEmpty = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ShowUsers = ({ users }) => users.length > 0 ?
  <StyledWrapper>
    {users.map(({ _id, name }) => (
      <StyledCard key={_id}>
        <StyledName>{name}</StyledName>
        <DeleteUser id={_id} name={name} />
      </StyledCard>
    ))}
  </StyledWrapper> : <StyledEmpty>couldn't find any users</StyledEmpty>;

export default ShowUsers;
