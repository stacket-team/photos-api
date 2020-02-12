import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div``;

const StyledForm = styled.form`
  width: ${({ big }) => big ? '400px' : '250px'};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.white};
  padding: 30px;
  border-radius: 8px;
  -webkit-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  -moz-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  box-shadow: 7px 7px 18px -8px rgba(0,0,0,1); 
`;

const Form = ({ children, onSubmit, big }) => (
  <StyledWrapper>
    <StyledForm onSubmit={onSubmit} big={big}>
      { children }
    </StyledForm>
  </StyledWrapper>
);

export default Form;
