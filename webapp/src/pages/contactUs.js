// ContactUs.js
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

const ContactUs = () => {
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
                <CardTitle tag="h5">{t("letsConnect")}</CardTitle>
                <CardText>
                  <ListGroup flush>
                    <ListGroupItem className="border-0">
                      <strong>{t('contactNumber')}:</strong> +1 (123) 456-7890
                    </ListGroupItem>
                    <ListGroupItem className="border-0">
                      <strong>{t('email')}:</strong>{" "}
                      <a href="mailto:info@example.com">info@example.com</a>
                    </ListGroupItem>
                    <ListGroupItem className="border-0">
                      <strong>{t('address')}:</strong> 123 Main St, Cityville, State,
                      Country
                    </ListGroupItem>
                    <ListGroupItem className="border-0">
                      <strong>{t('websites')}:</strong>{" "}
                      <a
                        href="https://www.example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.example.com
                      </a>
                    </ListGroupItem>
                  </ListGroup>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
