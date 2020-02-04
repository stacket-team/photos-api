import React from 'react';
import styled from "styled-components";
import DeleteUser from '../DeleteUser/DeleteUser';

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

const ShowUsers = ({ users }) => users.map(({ _id, name }) => (
  <StyledWrapper key={_id}>
    <StyledName>{name}</StyledName>
    <DeleteUser id={_id} name={name} />
  </StyledWrapper>
));

export default ShowUsers;
