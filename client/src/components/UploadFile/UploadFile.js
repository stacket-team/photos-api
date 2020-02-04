import React, { useState, useCallback, useRef } from 'react';
import styled from "styled-components";
import { useDropzone } from 'react-dropzone';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import Button from "../Button/Button";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($title: String, $description: String, $file: Upload!, $author: String!) {
    uploadPhoto(file: $file, photo: { author: $author, title: $title, description: $description }) {
      src
    }
  }
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.color.red};
  width: 320px;
  margin: 0 auto;
  font-size: 22px;
  padding: 5px;
  
  label {
    margin-right: 10px;
  }
`;

const StyledForm = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.white};
  padding: 30px;
  border-radius: 8px;
  -webkit-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  -moz-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  box-shadow: 7px 7px 18px -8px rgba(0,0,0,1); 
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.color.primary};
  position: absolute;
  top: 3px;
  left: 0;
  transition: 0.2s ease-in-out;
  font-size: 24px;
`;

const StyledInput = styled.input` 
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  border: none;
  line-height: 22px;
  height: 100%;
  background: none;
  
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

const StyledFormItem = styled.div`
  width: 100%;
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

const StyledUploadText = styled.p`
  color: ${({ theme }) => theme.color.primary};
`;

const StyledButton = styled(Button)`
  margin: 30px auto 0;
`;

const UploadFile = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState();
  const [fileData, setFileData ] = useState(null);
  const uploadedFile = useRef(null);
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  const onDrop = useCallback(( [ file ] ) => {
    uploadedFile.current = file;
    const reader = new FileReader();
    reader.onload = e => setFileData(e.target.result);
    reader.readAsDataURL(uploadedFile.current);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleTitleChange = e => setTitle(e.target.value);
  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    uploadFileMutation({ variables: { file: uploadedFile.current, author: user._id, title, description } })
      .then(() => {
        toast.success('image uploaded');
        apolloClient.resetStore();
      })
      .catch(error => {
        toast.error("couldn't upload photo");
        console.error(error);
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormItem>
        <StyledInput name="title" id="title" placeholder=" " onChange={handleTitleChange} />
        <StyledLabel htmlFor="title">title</StyledLabel>
        <StyledBar />
      </StyledFormItem>
      <StyledFormItem>
        <StyledInput name="description" id="description" placeholder=" " onChange={handleDescriptionChange} />
        <StyledLabel htmlFor="description">description</StyledLabel>
        <StyledBar />
      </StyledFormItem>
      <StyledInnerWrapper { ...getRootProps() }>
        <input {...getInputProps()} />
        { fileData ? <img src={fileData} alt="your file" /> : <StyledUploadText>drag and drop image here</StyledUploadText> }
      </StyledInnerWrapper>
      <StyledButton type="submit" big>upload photo</StyledButton>
    </StyledForm>
    );
};

export default UploadFile;
