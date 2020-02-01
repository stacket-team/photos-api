import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!, $author: String!) {
    uploadPhoto(file: $file, photo: { author: $author }) {
      src
    }
  }
`

export const UploadFile = ({ user }) => {
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION)
  const apolloClient = useApolloClient()

  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }) =>
    validity.valid &&
    uploadFileMutation({ variables: { file, author: user._id } }).then(({ data }) => {
      console.log(data.uploadPhoto.src);
      apolloClient.resetStore()
    });

  return <input type="file" required onChange={onChange} />
}