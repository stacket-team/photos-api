import React, { useState } from 'react';
import Button from '../Button/Button';
import styled from 'styled-components';

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const StyledWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Modal = ({ children, component: Component, big, props }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} big={big}>{children}</Button>
      {isOpen ? (
      <>
        <StyledBackground onClick={handleClose} />
        <StyledWrapper>
          <Component closeModal={handleClose} {...props} />
        </StyledWrapper>
      </>
      ) : null}
    </>
  );
};

export default Modal;
