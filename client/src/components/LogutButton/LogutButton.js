import React, {useContext} from 'react';
import { ApolloConsumer } from "@apollo/react-hooks";
import styled from 'styled-components';
import UserContext from "../../UserContext/UserContext";

const StyledButton = styled.button`
  padding: 12px 7px;
  width: 100px;
  height: 40px;
  font-family: inherit;
  background: #ff8e3c;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  text-transform: uppercase;
`;

const LogoutButton = () => {
  const { doUpdateToken } = useContext(UserContext);

  return (
    <ApolloConsumer>
      {client => (
        <StyledButton onClick={() => {
          client.resetStore();
          localStorage.removeItem('token');
          doUpdateToken();
        }}>logout</StyledButton>
      )}
    </ApolloConsumer>
  )
};

export default LogoutButton;
