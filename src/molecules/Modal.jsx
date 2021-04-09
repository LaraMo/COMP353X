import React from "react";
import { Modal as ModalContainer, Button } from "react-bootstrap";

function Modal(props) {
  let {show, title, children, closeAction, addAction} = props;
  return (
    <ModalContainer show={show} onHide={closeAction}>
    <ModalContainer.Header closeButton>
      <ModalContainer.Title>{title}</ModalContainer.Title>
    </ModalContainer.Header>
    <ModalContainer.Body>
        {children}
    </ModalContainer.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeAction}>
        Close
      </Button>
      <Button variant="primary" onClick={addAction}>
        Add           
      </Button>
    </Modal.Footer>
    </ModalContainer>
  );
}

export default Modal;
