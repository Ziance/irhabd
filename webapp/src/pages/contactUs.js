// ContactUs.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Label, Row } from "reactstrap";

const ContactUs = () => {
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
      <Container className="mt--7" fluid style={{height: '88vh', width: '100%'}}>
        <Row>
          <Col>
            <Card className="shadow border-0">
              <Label className="text-black">Contact Us details</Label>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
  );
};

export default ContactUs;
