import React from 'react';
import styled from 'styled-components';
import LogoutButton from "../LogutButton/LogutButton";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Header = () => (
  <StyledWrapper>
    <LogoutButton />
  </StyledWrapper>
);

export default Header;
