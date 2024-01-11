// CommonModal.js
import React from "react";
import { Modal } from "reactstrap";

const CommonModal = ({ open, closeModal, children, className }) => {
  return (
    <Modal
    open={open}
      className="modal-dialog-centered"
      closeModal={closeModal}
    >
     {children}
    </Modal>
  );
};

export default CommonModal;
