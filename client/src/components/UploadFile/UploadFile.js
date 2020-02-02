import React, { useState, useCallback, useRef } from 'react';
import styled from "styled-components";
import { useDropzone } from 'react-dropzone';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';

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
  width: 320px;
  
  label {
    margin-right: 10px;
  }
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
    <form onSubmit={handleSubmit}>
      <input placeholder="tytuł" onChange={handleTitleChange} />
      <input placeholder="opis" onChange={handleDescriptionChange} />
      <StyledInnerWrapper { ...getRootProps() }>
        <input {...getInputProps()} />
        { fileData ? <img src={fileData} alt="your file" /> : <p>drag and drop image here</p> }
      </StyledInnerWrapper>
      <button type="submit">upload photo</button>
    </form>
    );
};

export default UploadFile;
