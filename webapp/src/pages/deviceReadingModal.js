// DeviceReadingModal.js
import React from "react";
import { Col, Container, Row } from "reactstrap";
import CommonModal from "../components/common/modal";

const DeviceReadingModal = ({ open, closeModal }) => {
  return (
    <CommonModal
      className="modal-dialog-centered"
      open={open}
      closeModal={closeModal}
    >
      <Container fluid>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </CommonModal>
  );
};

export default DeviceReadingModal;
