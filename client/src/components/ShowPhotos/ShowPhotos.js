import React from 'react';
import styled from 'styled-components';
import DeletePhoto from "../DeletePhoto/DeletePhoto";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  margin: 50px;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  align-self: center;
  justify-self: center;
  background-color: white;
  color: ${({ theme }) => theme.color.primary};
  padding: 18px;
  border-radius: 8px;
  -webkit-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  -moz-box-shadow: 7px 7px 18px -8px rgba(0,0,0,1);
  box-shadow: 7px 7px 18px -8px rgba(0,0,0,1); 

  button {
    margin: 24px 0 0 0;
  }
`;

const StyledTitle = styled.div`
  font-weight: 600;
`;

const StyledPhoto = styled.img`
  max-width: 350px;
`;

const StyledEmpty = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ShowPhotos = ({ photos }) => photos.length > 0 ?
  <Wrapper>
    {photos.map(({ _id, title, description, src }) => (
      <StyledCard key={_id}>
        <StyledTitle>{title}</StyledTitle>
        <p>{description}</p>
        <StyledPhoto src={src} alt={title} />
        <DeletePhoto id={_id} />
      </StyledCard>
    ))}
  </Wrapper> : <StyledEmpty>couldn't find any photos</StyledEmpty>;

export default ShowPhotos;
