import React, {useContext} from 'react';
import { ApolloConsumer } from "@apollo/react-hooks";
import styled from 'styled-components';
import UserContext from "../../UserContext/UserContext";

const StyledButton = styled.button`

`;

const LogoutButton = () => {
  const { doUpdateToken } = useContext(UserContext);

  return (
    <ApolloConsumer>
      {client => (
        <StyledButton onClick={() => {
          client.clearStore();
          localStorage.removeItem('token');
          doUpdateToken();
        }}>logout</StyledButton>
      )}
    </ApolloConsumer>
  )
};

export default LogoutButton;
