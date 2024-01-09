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
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCompatibility,
  fetchCompatibilityDetails,
} from "../redux/slices/compatibilitySlice";

const CompatibilityScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const compatibility = useSelector(selectCompatibility);
  const [remainingTime, setRemainingTime] = useState(30);
  const [userInput, setUserInput] = useState(null);
  const [urlInput, setUrlInput] = useState(null);
  const [currentIframeIndex, setCurrentIframeIndex] = useState(0);
  const [selectedCompatibilityList, setSelectedCompatibilityList] = useState(
    []
  );
  const [frameList, setFrameList] = useState([
    { value: 0, label: "Device Reading", url: "https://www.wikipedia.org/" },
  ]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      dispatch(fetchCompatibilityDetails());
    } catch (error) {
      toast.error(error?.response?.data || error?.message || "");
    }
  }, []);

  useEffect(() => {
    if (selectedCompatibilityList.length > 0 && userInput >= 10) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            const nextIndex =
              (currentIframeIndex + 1) % selectedCompatibilityList.length;
            setCurrentIframeIndex(nextIndex);
            return remainingTime;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentIframeIndex, selectedCompatibilityList, userInput]);

  const handleInputChange = (e, isForURL = false) => {
    if (!isForURL) {
      const inputValue = parseInt(e.target.value, 10);
      if (!isNaN(inputValue) && inputValue >= 10) setUserInput(inputValue);
      else setUserInput(0);
    } else {
      setUrlInput(e.target.value);
    }
  };

  const handleOkayClick = () => {
    const existingValuesSet = new Set(frameList.map((item) => item.value));
    const uniqueSelectedCheckList = selectedCompatibilityList.filter(
      (item) => !existingValuesSet.has(item.value)
    );
    setFrameList((prevList) => [...prevList, ...uniqueSelectedCheckList]);
    setRemainingTime(userInput);
    if (isIqnetSelected) {
      if (urlInput === null || urlInput === "") {
        const validationErrors = {};
        validationErrors.url = t("pleaseEnterUrl");
        setErrors(validationErrors);
        return;
      } else {
        setErrors({});
        let newList = frameList;
        newList = newList.map((option) =>
          option?.value.toString().toLowerCase() === "iqnet"
            ? { ...option, url: option.url.replace("$", urlInput) }
            : option
        );
        setFrameList(newList);
      }
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedCompatibilityList(selectedOptions);
  };

  let compatibilityList = [];
  if (compatibility?.compatibility) {
    compatibilityList = Object.entries(compatibility.compatibility).map(
      ([key, url]) => ({
        value: key,
        label: key,
        url: url,
      })
    );
  }
  const isIqnetSelected = selectedCompatibilityList.some(
    (option) => option?.value.toLowerCase() === "iqnet"
  );

  console.log("=====================", frameList);
  console.log("==========errors===========", errors);
  const isInvalid = (field) => errors[field] && errors[field].length > 0;

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
                      {t("setDurationSeconds")}
                    </p>
                    <Input
                      type="number"
                      id="durationInput"
                      value={userInput}
                      onChange={handleInputChange}
                      min={10}
                      max={600}
                    />
                  </CardBody>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3">
                <div className="card-stats mb-4 mb-xl-0 card">
                  <CardBody>
                    <p className="mb-0 text-muted text-sm">
                      {t("selectFrame")}
                    </p>
                    <Select
                      isMulti
                      options={compatibilityList}
                      value={selectedCompatibilityList}
                      onChange={handleSelectChange}
                    />
                  </CardBody>
                </div>
              </div>
              {isIqnetSelected && (
                <div className="col-lg-6 col-xl-3">
                  <div className="card-stats mb-4 mb-xl-0 card">
                    <CardBody>
                      <p className="mb-0 text-muted text-sm">{t("url")}</p>
                      <Input
                        type="text"
                        id="urlInput"
                        value={urlInput}
                        onChange={(e) => handleInputChange(e, true)}
                        invalid={isInvalid("url")}
                      />
                      <div className="invalid-feedback">{errors.url}</div>
                    </CardBody>
                  </div>
                </div>
              )}
              <div className="col-lg-6 col-xl-3">
                <Button color="primary" onClick={handleOkayClick}>
                  {t("okay")}
                </Button>
                {/* <div style={{ marginTop: "10px" }}>
                  Remaining Time: {remainingTime} seconds / {frameList.length}
                </div>

                <div style={{ marginTop: "10px" }}>
                  {selectedCompatibilityList.length}
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
