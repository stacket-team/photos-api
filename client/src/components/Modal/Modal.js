import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import styled from 'styled-components';

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

const StyledWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

const Modal = ({ children, component: Component, big, props, buttonProps, button: StyledButton }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      { StyledButton ? <StyledButton onClick={handleOpen} {...buttonProps}>{children}</StyledButton> : <Button onClick={handleOpen} big={big}>{children}</Button> }
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

Modal.propTypes = {
  children: PropTypes.string,
  component: PropTypes.func.isRequired,
  big: PropTypes.bool,
  props: PropTypes.object,
  buttonProps: PropTypes.object,
  button: PropTypes.object
};

Modal.defaultProps = {
  children: undefined,
  big: false,
  props: undefined,
  buttonProps: undefined,
  button: undefined
};
