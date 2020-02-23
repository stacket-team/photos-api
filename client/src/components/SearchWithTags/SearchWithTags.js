import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {StyledBar, StyledInput as Input} from "../Form/FormItem";

const SEARCH_TAGS = gql`
  query Search($author: ID) {
    photos(author: $author) {
      tags
    }
  }
`;

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

const StyledSelect = styled.select`
  background: none;
  color: ${({ theme }) => theme.color.white};
  font-size: 20px;
  padding: 0 10px;
  border: none;
`;

const StyledOption = styled.option`
  background: none;
`;

const SearchWithTags = ({ search, tag, tags, placeholder }) => (
  <>
    <StyledFormItem>
      <StyledInput { ...search } placeholder={placeholder} />
      <StyledBar />
    </StyledFormItem>
    <StyledSelect { ...tag }>
      <StyledOption value='' >no tags</StyledOption>
      {tags.map((tag, i) => (
        <StyledOption key={i}>
          {tag}
        </StyledOption>
      ))}
    </StyledSelect>
  </>
);

SearchWithTags.propTypes = {
  search: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired
};

export const useSearchWithTags = (query, additionalVariables) => {
  const [value, setValue] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const { loading: tagsLoading, error: tagsError, data: tagsData } = useQuery(SEARCH_TAGS, { variables: { ...additionalVariables } });
  const { loading: photosLoading, error: photosError, data } = useQuery(query, { variables: { value, tag, ...additionalVariables } });

  const handleValue = ({ target: { value } }) => setValue(value);
  const handleTag = ({ target: { value } }) => setTag(value);

  useEffect(() => {
    if (tagsData) {
      const values = [];
      for (let photo of tagsData.photos) {
        for (let tag of photo.tags) {
          if (!values.includes(tag)) values.push(tag);
        }
      }
      setTags(values);
    }
  }, [tagsData, setTags]);

  return {
    searchProps: {
      search: { value, onChange: handleValue },
      tag: { value: tag, onChange: handleTag },
      tags
    },
    loading: tagsLoading || photosLoading,
    error: tagsError || photosError,
    data,
  }
};

export default SearchWithTags;

SearchWithTags.propTypes = {
  query: PropTypes.object,
  additionalVariables: PropTypes.object
};

SearchWithTags.defaultProps = {
  query: undefined,
  additionalVariables: undefined
};
