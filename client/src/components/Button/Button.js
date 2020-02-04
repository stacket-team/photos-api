import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 5px;
  width: ${({ big }) => big ? '170px' : '120px'};
  font-family: inherit;
  background: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
`;

const Button = ({ children, className, big, onClick }) => (
  <StyledButton className={className} big={big} onClick={onClick}>{children}</StyledButton>
);

export default Button;
