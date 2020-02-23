import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DeletePhoto from "../DeletePhoto/DeletePhoto";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  margin: 50px;
`;

const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 430px;
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

const StyledPhoto = styled.div`
  min-width: 400px;
  min-height: 250px;
  background: url(${(props) => process.env.REACT_APP_BACKEND_BASE + props.src}) center/contain no-repeat;
`;

const StyledEmpty = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledDescription = styled.p`
  margin-top: 5px;
`;

const StyledTags = styled.p`
  margin-top: 5px;
`;

const ShowPhotos = ({ photos }) => photos.length > 0 ?
  <StyledWrapper>
    {photos.map(({ _id, title, description, src, tags }) => (
      <StyledCard key={_id}>
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
        { tags.length > 0 ? <StyledTags>{tags.join(' ')}</StyledTags> : <StyledTags>photo doesn't have any tags</StyledTags> }
        <StyledPhoto src={src} />
        <DeletePhoto id={_id} />
      </StyledCard>
    ))}
  </StyledWrapper> : <StyledEmpty>couldn't find any photos</StyledEmpty>;

export default ShowPhotos;

ShowPhotos.propTypes = {
  photos: PropTypes.array.isRequired
};
