// ContactUs.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import ContactUsImage from '../assets/images/contactUs.jpg';

const ContactUs = () => {
  const { t } = useTranslation();
  const mainContent = React.useRef(null);
  const navigate = useNavigate();
  const email = "autolite.habd@gmail.com";
  const contactNumber = "98248-01378";
  const address = `G-535, Road D-2, Kishan
  Gate, GIDC Metoda, Kalawad Road Lodhika, RAJKOT 360021`;
  const isAuthenticated = !!localStorage.getItem("user");

  useEffect(() => {
    const navigateToScreen = async () => {
      if (!isAuthenticated) {
        await navigate("/login");
      }
    };

    navigateToScreen();
  }, [isAuthenticated]);

  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}`;
  const mailTo = `mailto:${email}`;
  const telLink = `tel:${contactNumber}`;

  return (
    <div className="main-contentview" ref={mainContent}>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-4"></div>
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card sm="12" className="contact-us-card shadow border-0">
              <CardBody>
                <CardTitle tag="h4">{t("letsConnect")}</CardTitle>
                <Row>
                  <Col sm={12} md={6} className="d-flex align-items-center">
                    <ListGroup
                      flush
                      className="w-full h-full"
                    >
                      <ListGroupItem className="border-0 text-sm py-2">
                        <strong className="text-muted ">{t("email")}:</strong>
                        <a href={mailTo} className="ml-3 text-underline">
                          {email}
                        </a>
                      </ListGroupItem>
                      <ListGroupItem className="border-0 text-sm py-2">
                        <strong className="text-muted ">{t("address")}:</strong>
                        <a
                          href={googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 text-underline"
                        >
                          {address}
                        </a>
                      </ListGroupItem>
                      <ListGroupItem className="border-0 text-sm py-2">
                        <strong className="text-muted ">
                          {t("contactNumber")}:
                        </strong>
                        <a href={telLink} className="ml-3 text-underline">
                          {contactNumber}
                        </a>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    sm={12}
                    md={6}
                  >
                    <img
                      src={ContactUsImage}
                      alt="Your Photo"
                      className="img-fluid rounded-pill"
                      height={"100%"}
                      width={"100%"}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
