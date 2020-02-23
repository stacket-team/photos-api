import React from 'react';
import styled from 'styled-components';
import LogoutButton from "../LogutButton/LogutButton";
import settings from '../../assets/images/settings.svg';
import Modal from "../Modal/Modal";
import ChangePassword from "../ChangePassword/ChangePassword";

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
  width: 700px;
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-around;
  align-items: center;
`;

const StyledSettings = styled.img`
  width: 30px;
  height: 30px;
`;

const Header = ({ user: { name, _id }, children }) => (
  <StyledWrapper>
    <StyledFlexWrapper>
      <Modal component={ChangePassword} props={{ _id }} button={StyledSettings} buttonProps={{ src: settings }} />
      <p>logged as: {name}</p>
    </StyledFlexWrapper>
    <StyledInnerWrapper>
      { children }
      <LogoutButton />
    </StyledInnerWrapper>
  </StyledWrapper>
);

export default Header;
