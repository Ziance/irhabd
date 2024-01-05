// CompatibilityScreen.js
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  Container,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const CompatibilityScreen = () => {
  const [remainingTime, setRemainingTime] = useState(10);
  const [userInput, setUserInput] = useState(null);
  const [currentIframeIndex, setCurrentIframeIndex] = useState(0);
  const [checkList, setCheckList] = useState([
    { id: 0, label: "Device Reading", url: "https://www.wikipedia.org/" },
    { id: 1, label: "IRNET 1", url: "https://en.wikipedia.org/wiki/India" },
    { id: 2, label: "IRNET 2", url: "https://en.wikipedia.org/wiki/Dholera" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          const nextIndex = (currentIframeIndex + 1) % checkList.length;
          setCurrentIframeIndex(nextIndex);
          return remainingTime;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIframeIndex]);

  const handleInputChange = (e) => {
    setUserInput(parseInt(e.target.value, 10));
  };

  const handleOkayClick = () => {
    setRemainingTime(userInput);
  };

  return (
    <div>
      <h2>Compatibility Screen</h2>
      <br />
      <>
        <FormGroup>
          <Label for="durationInput">Set Duration (seconds):</Label>
          <Input
            type="number"
            id="durationInput"
            value={userInput}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button color="primary" onClick={handleOkayClick}>
          Okay
        </Button>
        <div style={{ marginTop: "10px" }}>
          Remaining Time: {remainingTime} seconds
        </div>
      </>

      <Container>
        <Row>
          {checkList.map((item, index) => {
            return (
              <Col sm="12" md={{ size: 6, offset: 3 }} key={item.id}>
                <Card
                  style={{
                    display: index === currentIframeIndex ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h5">{item.label}</CardTitle>
                    <iframe
                      title={`iframe-${item.id}`}
                      src={item.url}
                      width="100%"
                      height="400px"
                    ></iframe>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default CompatibilityScreen;
