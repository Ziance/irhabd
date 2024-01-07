// CompatibilityScreen.js
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  Container,
  Input,
  Button,
} from "reactstrap";
import Select from "react-select";

const CompatibilityScreen = () => {
  const [remainingTime, setRemainingTime] = useState(10);
  const [userInput, setUserInput] = useState(null);
  const [currentIframeIndex, setCurrentIframeIndex] = useState(0);
  const [checkList] = useState([
    { value: 1, label: "IRNET 1", url: "https://en.wikipedia.org/wiki/India" },
    {
      value: 2,
      label: "IRNET 2",
      url: "https://en.wikipedia.org/wiki/Dholera",
    },
  ]);
  const [selectedCheckList, setSelectedCheckList] = useState([]);
  const [frameList, setFrameList] = useState([
    { value: 0, label: "Device Reading", url: "https://www.wikipedia.org/" },
  ]);

  useEffect(() => {
    if (selectedCheckList.length > 0 && userInput >= 10) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            const nextIndex =
              (currentIframeIndex + 1) % selectedCheckList.length;
            setCurrentIframeIndex(nextIndex);
            return remainingTime;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentIframeIndex, selectedCheckList, userInput]);

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);

    if (!isNaN(inputValue) && inputValue >= 1) setUserInput(inputValue);
    else setUserInput(0);
  };

  const handleOkayClick = () => {
    const existingValuesSet = new Set(frameList.map(item => item.value));
    const uniqueSelectedCheckList = selectedCheckList.filter(item => !existingValuesSet.has(item.value));
    setFrameList(prevList => [...prevList, ...uniqueSelectedCheckList]);
    setRemainingTime(userInput);
  };

  const handleSelectChange = (selectedOptions) =>
    setSelectedCheckList(selectedOptions);

  return (
    <div className="main-contentview">
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-lg-6 col-xl-3">
                <div className="card-stats mb-4 mb-xl-0 card">
                  <CardBody>
                    <p className="mb-0 text-muted text-sm">
                      Set Duration (seconds)
                    </p>
                    <Input
                      type="number"
                      id="durationInput"
                      value={userInput}
                      onChange={handleInputChange}
                      min={1}
                    />
                  </CardBody>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3">
                <div className="card-stats mb-4 mb-xl-0 card">
                  <CardBody>
                    <p className="mb-0 text-muted text-sm">Select Frame</p>
                    <Select
                      isMulti
                      options={checkList}
                      value={selectedCheckList}
                      onChange={handleSelectChange}
                    />
                  </CardBody>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3">
                <Button color="primary" onClick={handleOkayClick}>
                  Okay
                </Button>
                {/* <div style={{ marginTop: "10px" }}>
                  Remaining Time: {remainingTime} seconds / {frameList.length}
                </div>

                <div style={{ marginTop: "10px" }}>
                  {selectedCheckList.length}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container className="mt--7 " fluid>
        <Row>
          {frameList.map((item, index) => {
            return (
              <Col sm="12" key={item.id}>
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
