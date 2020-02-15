import React, { useState, useCallback, useRef } from 'react';
import styled from "styled-components";
import { useDropzone } from 'react-dropzone';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import Button from "../Button/Button";
import Form from '../Form/Form';
import FormItem from "../Form/FormItem";
import FormItemTags from '../Form/FormItemTags';

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($title: String, $description: String, $file: Upload!, $author: String!, $tags: [String]!) {
    uploadPhoto(file: $file, photo: { author: $author, title: $title, description: $description, tags: $tags }) {
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

const StyledUploadText = styled.p`
  color: ${({ theme }) => theme.color.primary};
`;

const StyledUploadedPhoto = styled.img``;

const StyledButton = styled(Button)`
  margin: 30px auto 0;
`;

const UploadFile = ({ user, closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
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
  const handleTagsChange = value => setTags(value);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await uploadFileMutation({ variables: { file: uploadedFile.current, author: user._id, title, description, tags } });
      toast.success('image uploaded');
      closeModal();
      await apolloClient.resetStore();
    } catch (error) {
      toast.error("couldn't upload photo");
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} big>
      <FormItem id="title" onChange={handleTitleChange} />
      <FormItem id="description" onChange={handleDescriptionChange} />
      <FormItemTags id="tags" onChange={handleTagsChange} />
      <StyledInnerWrapper { ...getRootProps() }>
        <input {...getInputProps()} />
        {/*{ fileData ? <StyledUploadedPhoto src={fileData} alt="uploaded file" /> : <StyledUploadText>drag and drop image here</StyledUploadText> }*/}
        { fileData ? <StyledUploadText>image uploaded</StyledUploadText> : <StyledUploadText>drag and drop image here</StyledUploadText> }
        </StyledInnerWrapper>
      <StyledButton type="submit" big>upload photo</StyledButton>
    </Form>
    );
};

export default UploadFile;
