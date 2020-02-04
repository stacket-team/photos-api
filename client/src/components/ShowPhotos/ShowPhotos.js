import React from 'react';
import styled from 'styled-components';
import {useAuthorization} from "../../UserContext/UserContext";
import DeletePhoto from "../DeletePhoto/DeletePhoto";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShowPhotos = () => {
  const { user } = useAuthorization(user => user);

  return user ? (
    <>
      {user.photos.map(({ _id, title, description, src }) => (
        <StyledWrapper key={_id}>
          <p>{title}</p>
          <p>{description}</p>
          <img src={src} width="250px" height="250px" alt={title} />
          <DeletePhoto id={_id} />
        </StyledWrapper>
      ))}
    </>
  ) : null
};

export default ShowPhotos;
