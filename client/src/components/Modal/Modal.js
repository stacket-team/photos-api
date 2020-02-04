import React, { useState } from 'react';
import Button from '../Button/Button';
import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Modal = ({ children, component: Component, props }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={ handleOpen }>{ children }</Button>
      { isOpen ? (
      <>
        <Background onClick={ handleClose } />
        <Wrapper>
          <Component closeModal={ handleClose } { ...props } />
        </Wrapper>
      </>
      ) : null}
    </>
  );
}

export default Modal;