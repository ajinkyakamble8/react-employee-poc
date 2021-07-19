import React from 'react';
import styles from './ConfirmationModal.module.scss';
import {
  Modal,
  Button
} from 'react-bootstrap';

/**
 * Confirmation Modal to confirm before any action.
 * @param props 
 * @returns 
 */
const ConfirmationModal = (props: any) => {
  
  const {
    showModal,
    hideModal,
    onConfirm,
    action,
    id,
    message
  } = props;
  
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{action} Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onConfirm(id)}>
          {action}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
