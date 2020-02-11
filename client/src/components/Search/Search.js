import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

const StyledFormItem = styled.div`
  width: 250px;
  margin: 24px 0;
  position: relative;
  flex-shrink: 0;
`;

const StyledBar = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.color.red};
  transition: all 0.1s;
`;

const StyledInput = styled.input` 
  color: white;
  font-size: 24px;
  border: none;
  line-height: 22px;
  height: 100%;
  background: none;
  width: 100%;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.color.white};
  }
`;

const Search = props => (
  <StyledFormItem>
    <StyledInput { ...props } />
    <StyledBar />
  </StyledFormItem>
);

export const useSearch = ( query, additionalVariables ) => {
  const [value, setValue] = useState('');
  const { loading, error, data } = useQuery(query, { variables: { value, ...additionalVariables } });
  const handleValue = ({ target: { value } }) => setValue(value);

  return {
    searchProps: { value, onChange: handleValue },
    loading,
    error,
    data,
  }
};

export default Search;
