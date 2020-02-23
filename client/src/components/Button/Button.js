import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  big: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  className: null,
  big: false
};
