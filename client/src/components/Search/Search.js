import React, { useState } from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { StyledBar, StyledInput as Input } from "../Form/FormItem";

const StyledFormItem = styled.div`
  width: 250px;
  margin: 24px 0;
  position: relative;
  flex-shrink: 0;
`;

const StyledInput = styled(Input)`
  color: ${({ theme }) => theme.color.white};
  
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

Search.propTypes = {
  props: PropTypes.object.isRequired
};

export const useSearch = (query, additionalVariables) => {
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

useSearch.propTypes = {
  query: PropTypes.object.isRequired,
  additionalData: PropTypes.object.isRequired
};
