import React from 'react';
import styled from 'styled-components';

const StyledFormItem = styled.div`
  width: 100%;
  margin: 24px 0;
  position: relative;
  flex-shrink: 0;
`;

const StyledInput = styled.input`
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  border: none;
  line-height: 22px;
  height: 100%;
  background: none;
  width: 100%;
  
  &:focus {
    outline: none;
  }
  
  &:focus + label {
    top: -22px;
    font-size: 18px;
  }
  
  &:not(:placeholder-shown) + label {
    top: -22px;
    font-size: 18px;
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.color.primary};
  position: absolute;
  top: 3px;
  left: 0;
  transition: 0.2s ease-in-out;
  font-size: 24px;
  pointer-events: none;
`;

const StyledBar = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.color.red};
  transition: all 0.1s;
`;

const FormItem = ({ id, name, type, onChange, htmlFor, content }) => (
  <StyledFormItem>
    <StyledInput id={id} name={name} type={type} placeholder=" " onChange={onChange} />
    <StyledLabel htmlFor={htmlFor}>{content}</StyledLabel>
    <StyledBar />
  </StyledFormItem>
);

export default FormItem;
