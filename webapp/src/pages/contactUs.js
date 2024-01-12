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
import ContactUsImage from "../assets/images/contactUs.jpg";

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
        <Card sm="12" className="contact-us-card shadow border-0">
          <CardBody>
            <CardTitle tag="h4">{t("letsConnect")}</CardTitle>
            <Row className="justify-content-center align-items-center">
              <Col sm={12} className="text-center mb-5">
                <img
                  src={ContactUsImage}
                  alt="Logo"
                  className="img-fluid rounded-circle"
                  style={{ height: "11%", width: "11%" }}
                />
              </Col>
              <Col
                sm={12}
                className="d-flex align-items-center justify-content-center text-center"
              >
                <ListGroup flush className="col-7 w-full h-full border rounded py-3">
                  <ListGroupItem className="border-0 text-sm py-2 d-flex">
                    <div className="col-3 text-left">
                      <strong className="text-muted">
                        {t("email")}:
                      </strong>
                    </div>
                    <div className="col-9 text-left">
                      <a href={mailTo} className="ml-3 text-underline">
                        {email}
                      </a>
                    </div>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 text-sm py-2 d-flex">
                    <div className="col-3 text-left">
                      <strong className="text-muted">
                        {t("address")}:
                      </strong>
                    </div>
                    <div className="col-9 text-left d-flex">
                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 text-underline"
                      >
                        {address}
                      </a>
                    </div>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 text-sm py-2 d-flex">
                    <div className="col-3 text-left">
                      <strong className="text-muted">
                        {t("contactNumber")}
                      </strong>
                    </div>
                    <div className="col-9 text-left">
                      <a href={telLink} className="ml-3 text-underline">
                        {contactNumber}
                      </a>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ContactUs;
