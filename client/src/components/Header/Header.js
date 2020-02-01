import React from 'react';
import styled from 'styled-components';
import LogoutButton from "../LogutButton/LogutButton";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = ({ loggedAs }) => (
  <StyledWrapper>
    <p>logged as: {loggedAs}</p>
    <LogoutButton />
  </StyledWrapper>
);

export default Header;
