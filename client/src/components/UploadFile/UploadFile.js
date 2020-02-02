import React, { useState, useCallback, useRef } from 'react';
import styled from "styled-components";
import { useDropzone } from 'react-dropzone';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
  border: 1px solid black;
  width: 300px;
  
  label {
    margin-right: 10px;
  }
`;

const UploadFile = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState();
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();
  const uploadedFile = useRef([]);

  const onDrop = useCallback(acceptedFiles => {
    uploadedFile.current = acceptedFiles;
    console.log(uploadedFile.current);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleTitleChange = e => setTitle(e.target.value);
  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const [file] = uploadedFile.current;
    uploadFileMutation({ variables: { file, author: user._id, title, description } })
      .then(() => apolloClient.resetStore())
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="tytuł" onChange={handleTitleChange} />
      <input placeholder="opis" onChange={handleDescriptionChange} />
      <StyledInnerWrapper { ...getRootProps() }>
        <input {...getInputProps()} />
        <p>drag and drop files here</p>
      </StyledInnerWrapper>
      <button type="submit">prześlij zdjęcie</button>
    </form>
    );
};

export default UploadFile;
