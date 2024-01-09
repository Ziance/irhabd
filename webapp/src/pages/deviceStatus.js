// DeviceStatus.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, selectLocation } from "../redux/slices/locationSlice";
import { toast } from "react-toastify";
import Select from "react-select";

const DeviceStatus = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const { t } = useTranslation();
  const mainContent = React.useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("user");
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [records, setRecords] = useState(10);

  useEffect(() => {
    try {
      dispatch(fetchDevices());
    } catch (error) {
      toast.error(
        error?.response?.data || error?.message || "Data fetch failed."
      );
    }
  }, []);

  useEffect(() => {
    const navigateToScreen = async () => {
      if (!isAuthenticated) {
        await navigate("/login");
      }
    };

    navigateToScreen();
  }, [isAuthenticated]);

  const handleSelectChange = (options) => {
    setSelectedDevices(options);
  };

  return (
    <div className="main-contentview" ref={mainContent}>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-4"></div>
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="contact-us-card shadow border-0 ">
              <CardBody>
               <Row>
               <Col className="col-lg-6 col-xl-3">
                  <p className="mt-3 mb-0 text-muted text-sm">{t("devices")}</p>
                  <Select
                    isMulti
                    options={(location?.devices ?? [])
                      .map((s) => ({ value: s.id, label: s.station }))
                      .sort((a, b) => a.label.localeCompare(b.label))}
                    value={selectedDevices}
                    onChange={handleSelectChange}
                  />
                </Col>

                <Col className="col-lg-6 col-xl-3">
                  <p className="mt-3 mb-0 text-muted text-sm">{t("records")}</p>
                  <Input
                        type="number"
                        id="recordInput"
                        value={records}
                        onChange={(e) => setRecords(e.target.value)}
                        min={10}
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

export default DeviceStatus;
