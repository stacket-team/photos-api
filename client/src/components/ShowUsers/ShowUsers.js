import React from 'react';
import styled from "styled-components";
import DeleteUser from '../DeleteUser/DeleteUser';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  margin: 50px;
`;

const Card = styled.div`
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
`;

const Name = styled.p`
  color: ${({ theme }) => theme.color.primary}; 
  font-size: 24px;
  margin-right: 25px;
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShowUsers = ({ users }) => users.length > 0 ? 
<Wrapper>
  {users.map(({ _id, name }) => (
  <Card key={_id}>
    <Name>{name}</Name>
    <DeleteUser id={_id} name={name} />
  </Card>
  ))}
</Wrapper> : <Empty>couldn't find any users</Empty>;

export default ShowUsers;
