import React from 'react';
import styled from 'styled-components';
import LogoutButton from "../LogutButton/LogutButton";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
  justify-content: space-around;
  width: 600px;
`;

const Header = ({ loggedAs, children }) => (
  <StyledWrapper>
    <p>logged as: {loggedAs}</p>
    <StyledInnerWrapper>
      { children }
      <LogoutButton />
    </StyledInnerWrapper>
  </StyledWrapper>
);

export default Header;
