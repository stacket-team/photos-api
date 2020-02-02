import React from 'react';
import styled from 'styled-components';
import {useAuthorization} from "../UserContext/UserContext";

const ShowPhotos = () => {
  const { user } = useAuthorization(user => user);

  return user ? (
    <>
      {user.photos.map(({ _id, title, description, src }) => (
        <div key={_id}>
          <p>{title}</p>
          <p>{description}</p>
          <img src={src} width="250px" height="250px" alt={title} />
        </div>
      ))}
    </>
  ) : null
};

export default ShowPhotos;
