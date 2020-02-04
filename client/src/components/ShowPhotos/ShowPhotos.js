import React from 'react';
import styled from 'styled-components';
import DeletePhoto from "../DeletePhoto/DeletePhoto";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  margin: 50px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  align-self: center;
  justify-self: center;
  background-color: white;
  color: ${ ({ theme: { color: { primary } } }) => primary };
  padding: 18px;
  border-radius: 8px;

  button {
    margin: 24px 0 0 0;
  }
`;

const Title = styled.div`
  font-weight: 600;
`;

const Photo = styled.img`
  max-width: 350px;
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShowPhotos = ({ photos }) => photos.length > 0 ? 
<Wrapper>
  {photos.map(({ _id, title, description, src }) => (
  <Card key={_id}>
    <Title>{title}</Title>
    <p>{description}</p>
    <Photo src={src} alt={title} />
    <DeletePhoto id={_id} />
  </Card>
  ))}
</Wrapper> : <Empty>couldn't find any photos</Empty>

export default ShowPhotos;
