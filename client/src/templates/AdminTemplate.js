import React from 'react';
import { useAuthorization } from "../UserContext/UserContext";
import ShowUsers from "../components/ShowUsers/ShowUsers";
import CreateUser from "../components/CreateUser/CreateUser";
import Header from "../components/Header/Header";
import Modal from '../components/Modal/Modal';
import Search, { useSearch } from '../components/Search/Search';
import gql from 'graphql-tag';

const SEARCH_USERS = gql`
  query Search($value: String!) {
    users(name: $value) {
      _id
      name
    }
  }
`;

const AdminTemplate = () => {
  const { user } = useAuthorization((user) => user && user.role === 'admin');
  const { data, searchProps } = useSearch(SEARCH_USERS);

  return user ? (
    <>
      <Header loggedAs={user.name}>
        <Search {...searchProps} placeholder="search user" />
        <Modal component={CreateUser}>create user</Modal>
      </Header>
      {data ? <ShowUsers {...data} /> : null}
    </>
  ) : null;
};

export default AdminTemplate;
