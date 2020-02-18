import React, {useContext} from 'react';
import UserContext from "../../UserContext/UserContext";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import Button from "../Button/Button";

const DELETE_PHOTO = gql`
  mutation DeletePhoto($id: String!) {
      deletePhoto(_id: $id) {
          _id
      }
  }
`;

const DeletePhoto = ({ id }) => {
  const { user } = useContext(UserContext);
  const [deletePhoto] = useMutation(DELETE_PHOTO);
  const apolloClient = useApolloClient();

  const handleDelete = async () => {
    try {
      await deletePhoto({ variables: { id } });
      toast.success('deleted user');
      await apolloClient.resetStore();
    } catch (error) {
      toast.error(`couldn't remove photo`);
      console.error(error);
    }
  };

  return user ? (
    <Button onClick={handleDelete} big>delete photo</Button>
  ) : null
};

export default DeletePhoto;
