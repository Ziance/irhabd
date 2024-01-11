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
import DeviceReadings from "./deviceReadings";

const CompatibilityScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const compatibility = useSelector(selectCompatibility);
  const [remainingTime, setRemainingTime] = useState(10);
  const [userInput, setUserInput] = useState(null);
  const [urlInput, setUrlInput] = useState(null);
  const [currentIframeIndex, setCurrentIframeIndex] = useState(0);
  const [selectedCompatibilityList, setSelectedCompatibilityList] = useState(
    []
  );
  const [frameList, setFrameList] = useState([
    { value: 0, label: "Device Reading", isShowDeviceReading: true },
  ]);
  const [errors, setErrors] = useState({});
  const [isIqnetSelected, setIsIqnetSelected] = useState(false);
  const [isOkayClicked, setIsOkayClicked] = useState(false);
  const [compatibilityList, setCompatibilityList] = useState([]);

  useEffect(() => {
    try {
      dispatch(fetchCompatibilityDetails());
    } catch (error) {
      toast.error(error?.response?.data || error?.message || "");
    }
  }, []);

  useEffect(() => {
    if (compatibility?.compatibility) {
      let list = [];
      list = Object.entries(compatibility.compatibility).map(([key, url]) => ({
        value: key,
        label: key,
        url: url,
      }));
      setCompatibilityList(list);
    }
  }, [compatibility?.compatibility]);

  useEffect(() => {
    if (selectedCompatibilityList.length > 0 && userInput >= 10) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            const nextIndex = (currentIframeIndex + 1) % frameList.length;
            setCurrentIframeIndex(nextIndex);
            return remainingTime;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedCompatibilityList, userInput, remainingTime]);

  const handleOkayClick = () => {
    setRemainingTime(userInput);
    if (isIqnetSelected) {
      if (urlInput === null || urlInput === "") {
        const validationErrors = {};
        validationErrors.url = t("pleaseEnterUrl");
        setErrors(validationErrors);
        return;
      } else {
        setErrors({});
        let newList = selectedCompatibilityList;
        newList = newList.map((option) =>
          option?.value.toString().toLowerCase() === "iqnet"
            ? { ...option, url: option.url.replace("$", urlInput) }
            : option
        );
        setFrameList([
          { value: 0, label: "Device Reading", isShowDeviceReading: true },
          ...newList,
        ]);
      }
    } else {
      setFrameList([
        { value: 0, label: "Device Reading", isShowDeviceReading: true },
        ...selectedCompatibilityList,
      ]);
    }
    setIsOkayClicked(true);
  };

  const handleInputChange = (e, isForURL = false) => {
    if (!isForURL) {
      const inputValue = parseInt(e.target.value, 10);
      if (!isNaN(inputValue) && inputValue >= 10) setUserInput(inputValue);
      else setUserInput(0);
    } else {
      setUrlInput(e.target.value);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedCompatibilityList(selectedOptions);
    const isIqnet = selectedOptions.some(
      (option) => option?.value.toLowerCase() === "iqnet"
    );
    setIsIqnetSelected(isIqnet);
  };

  console.log("===============", frameList);
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
                      defaultValue={10}
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
                        invalid={errors["url"] && errors["url"].length > 0}
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
                <div style={{ marginTop: "10px" }}>
                  Remaining Time: {remainingTime} seconds
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container className="mt--7 " fluid>
        <Row>
          {frameList.map((item, index) => {
            console.log("currentIframeIndex", currentIframeIndex);
            return (
              <Col sm="12" key={item.id}>
                <Card
                  style={{
                    display: index === currentIframeIndex ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h5">{item.label}</CardTitle>
                    {(item?.url && (
                      <iframe
                        title={`iframe-${item.id}`}
                        src={item.url}
                        width="100%"
                        height="500px"
                      ></iframe>
                    )) || (
                      <div
                        className="container-fluid overflow-auto"
                        style={{
                          height: "500px",
                        }}
                      >
                        <DeviceReadings showFromLeft={true} />
                      </div>
                    )}
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
