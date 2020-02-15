import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { StyledFormItem, StyledInput, StyledLabel, StyledBar } from "./FormItem";

const CustomStyledLabel = styled(StyledLabel)`
  &.retracted {
    top: -22px;
    font-size: 18px;
  }
  &.extended {
    top: 0!important;
    font-size: 24px!important;
  }
`;

const HiddenInput = styled.input`
  border: none;
  outline: none;
  font-size: 24px;
  width: 100%;
`;

const StyledTag = styled.div`
  display: inline-flex;
  margin: 1px;
  padding: 2px;
  border: 1px solid #dadce0;
  border-radius: 10px;
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  margin: 2px 0;
  margin-right: 3px;
  padding: 0 8px;
  align-items: center;
  color: #5f6368;
`;

const StyledRemove = styled.span`
  margin-left: 4px;
  font-weight: 700;
  cursor: pointer;
`;

const Tag = ({ tag, i, setTags }) => {
  const [ value, setValue ] = useState(tag);

  const handleValue = ({ target: { innerText } }) => setValue(innerText.trim());
  const updateTag = () => {
    setTags(prevTags => {
      if (value) {
        prevTags[i] = value;
      } else {
        prevTags.splice(i, 1);
      }
      return [...prevTags];
    });
  }
  const handleRemove = () => {
    setTags(prevTags => {
      prevTags.splice(i, 1);
      return [...prevTags];
    });
  }

  return (
    <StyledTag>
      <span contentEditable={true} suppressContentEditableWarning={true} onInput={handleValue} onBlur={updateTag}>{tag}</span>
      <StyledRemove onClick={handleRemove}>x</StyledRemove>
    </StyledTag>
  );
}

const FormItemTags = ({ id, onChange }) => {
  const [ tags, setTags ] = useState([]);
  const [ input, setInput ] = useState('');
  const [ active, setActive ] = useState(false);
  
  const handleInput = ({ target: { value } }) => {
    const tags = value.split(',').filter(tag => tag.trim());
    if (tags.length > 1) {
      setInput(tags.pop());
      setTags(prevTags => {
        prevTags.push(...tags.map(tag => tag.trim()));
        return [...prevTags];
      });
    } else {
      setInput(value);
    }
  }
  const handleBlur = ({ target: { value } }) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setInput('');
    setTags(prevTags => {
      prevTags.push(...tags);
      return [...prevTags];
    });
    setActive(false);
  }
  const handleFocus = () => setActive(true);

  useEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  return (
    <StyledFormItem>
      <StyledInput as="div">
        {tags.map((tag, i) => <Tag key={i} i={i} tag={tag} setTags={setTags} />)}
        <HiddenInput value={input} onChange={handleInput} onClick={handleFocus} onBlur={handleBlur} />
      </StyledInput>
      <CustomStyledLabel className={tags.length > 0 || input.length > 0 || active ? 'retracted' : 'extended'}>{id}</CustomStyledLabel>
      <StyledBar />
    </StyledFormItem>
  )
};

export default FormItemTags;
