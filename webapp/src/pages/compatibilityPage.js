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

const compatibilityViewStyle = [
  { label: "Iframe", value: "frame" },
  { label: "Horizontal", value: "horizontal" },
];

const CompatibilityScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const compatibility = useSelector(selectCompatibility);
  const [userInput, setUserInput] = useState(30);
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
  const [showForm, setShowForm] = useState(false);
  const [compatibilityList, setCompatibilityList] = useState([]);
  const [viewStyle, setViewStyle] = useState(compatibilityViewStyle[0]);
  const [applyStyle, setApplyStyle] = useState("frame");
  const [remainingTime, setRemainingTime] = useState(userInput);

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
    if (frameList.length > 1 && applyStyle === "frame") {
      const interval = setInterval(() => {
        if (remainingTime === 0) {
          setRemainingTime(userInput);
          if (currentIframeIndex + 1 === frameList.length) {
            setCurrentIframeIndex(0);
          } else {
            const nextIndex = (currentIframeIndex + 1) % frameList.length;
            setCurrentIframeIndex(nextIndex);
          }
        } else {
          setRemainingTime((prevTime) => prevTime - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [frameList, currentIframeIndex, userInput, remainingTime]);

  const handleOkayClick = () => {
    if (viewStyle.value !== applyStyle) setApplyStyle(viewStyle.value);
    if (remainingTime !== userInput) setRemainingTime(userInput);

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
  };

  const handleInputChange = (e, isForURL = false) => {
    if (!isForURL) {
      const inputValue = parseInt(e.target.value, 10);
      if (!isNaN(inputValue) && inputValue >= 10) setUserInput(inputValue);
      else setUserInput(10);
    } else {
      setUrlInput(e.target.value);
    }
  };

  const handleSelectChange = (key, selectedOptions) => {
    switch (key) {
      case "frame":
        setSelectedCompatibilityList(selectedOptions);
        const isIqnet = selectedOptions.some(
          (option) => option?.value.toLowerCase() === "iqnet"
        );
        setIsIqnetSelected(isIqnet);
        break;
      case "viewStyle":
        setViewStyle(selectedOptions);
        break;
      default:
        console.log(key);
        break;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="main-contentview">
      <div className="header bg-gradient-info pb-7 pt-0">
        <div className="container-fluid">
          <div className="header-body">
            <p
              onClick={() => setShowForm(!showForm)}
              className="text-white text-sm font-weight-bold text-underline cursor-pointer"
            >
              {showForm ? "Hide Form" : "Show Form"}
            </p>
            {showForm && (
              <div className="row">
                <div className="col-sm-2">
                  <div className="card card-stats p-1 w-full">
                    <p className="mb-0 text-muted text-sm">{t("viewStyle")}</p>
                    <Select
                      isMulti={false}
                      options={compatibilityViewStyle}
                      value={viewStyle}
                      onChange={(options) =>
                        handleSelectChange("viewStyle", options)
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="card-stats card p-2 w-full">
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
                      size="sm"
                    />
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="card card-stats p-1 w-full">
                    <p className="mb-0 text-muted text-sm">
                      {t("selectFrame")}
                    </p>
                    <Select
                      isMulti
                      options={compatibilityList}
                      value={selectedCompatibilityList}
                      onChange={(options) =>
                        handleSelectChange("frame", options)
                      }
                    />
                  </div>
                </div>
                {isIqnetSelected && (
                  <div className="col-sm-2">
                    <div className="card-stats card p-2 w-full">
                      <p className="mb-0 text-muted text-sm">{t("url")}</p>
                      <Input
                        type="text"
                        id="urlInput"
                        value={urlInput}
                        onChange={(e) => handleInputChange(e, true)}
                        invalid={errors["url"] && errors["url"].length > 0}
                        size="sm"
                      />
                      <div className="invalid-feedback">{errors.url}</div>
                    </div>
                  </div>
                )}
                <div className="col-sm-2">
                  <Button color="primary" onClick={handleOkayClick}>
                    {t("okay")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Container className="mt--7" fluid>
        <Row className="bg-white">
          {frameList.map((item, index) => {
            return (
              <Col
                className="p-0 m-0"
                sm={applyStyle === "horizontal" ? "6" : "12"}
                key={item.id}
              >
                <Card
                  style={{
                    display:
                      applyStyle === "frame"
                        ? index === currentIframeIndex
                          ? "block"
                          : "none"
                        : "block",
                  }}
                >
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                      <CardTitle tag="h5" className="text-primary">
                        {item.label}
                      </CardTitle>
                      {frameList.length > 1 && (
                        <p className="text-right text-primary text-sm font-weight-bold">
                          Remaining Time: {formatTime(remainingTime)} sec
                        </p>
                      )}
                    </div>
                    <div
                      className="container-fluid overflow-auto w-full p-0"
                      style={{
                        height: "500px",
                      }}
                    >
                      {(item?.url && (
                        <iframe
                          title={`iframe-${item.id}`}
                          src={item.url}
                          width="100%"
                          height="100%"
                        ></iframe>
                      )) || <DeviceReadings showFromLeft={true} />}
                    </div>
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
