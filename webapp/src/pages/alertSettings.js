// AlertSettings.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { useTranslation } from "react-i18next";

const AlertSettings = () => {
  const { t } = useTranslation();
  const mainContent = React.useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("user");

  useEffect(() => {
    const navigateToScreen = async () => {
      if (!isAuthenticated) {
        await navigate("/login");
      }
    };

    navigateToScreen();
  }, [isAuthenticated]);

  return (
    <div className="main-contentview" ref={mainContent}>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-4"></div>
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card sm="12" className="contact-us-card shadow border-0">
              <CardBody>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AlertSettings;
