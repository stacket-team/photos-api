import React from 'react';
import {useAuthorization} from "../UserContext/UserContext";
import Header from "../components/Header/Header";
import UploadFile from '../components/UploadFile/UploadFile';
import ShowPhotos from "../components/ShowPhotos/ShowPhotos";
import Modal from '../components/Modal/Modal';
import SearchWithTags, { useSearchWithTags } from '../components/SearchWithTags/SearchWithTags';
import gql from 'graphql-tag';

const SEARCH_PHOTOS = gql`
  query Search($value: String!, $tag: String!, $author: ID) {
    photos(author: $author, tag: $tag, title: $value) {
      _id
      title
      description
      src
    }
  }
`;

const ClientTemplate = () => {
  const { user } = useAuthorization((user) => user);
  const { loading, data, searchProps } = useSearchWithTags(SEARCH_PHOTOS, { author: user ? user._id : undefined } );

  return user ? (
    <>
      <Header user={user}>
        <SearchWithTags {...searchProps} placeholder="search photo" />
        <Modal component={UploadFile} props={{user}} big>upload photo</Modal>
      </Header>
      {!loading && data ? <ShowPhotos {...data} /> : null}
    </>
  ) : null;
};

export default ClientTemplate;
