// DeviceReadings.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeviceReadings,
  selectDeviceReadings,
} from "../redux/slices/deviceReadingsSlice";
import { toast } from "react-toastify";
import DeviceReadingTable from "./deviceReadingTable";
import PaginationComponent from "./paginationComponent";

const DeviceReadings = () => {
  const dispatch = useDispatch();
  const selectorData = useSelector(selectDeviceReadings);
  const { t } = useTranslation();
  const mainContent = React.useRef(null);
  const navigate = useNavigate();
  const [paginatedDataSetting, setPaginatedDataSettings] = useState(null);
  const isAuthenticated = !!localStorage.getItem("user");

  useEffect(() => {
    try {
      dispatch(fetchDeviceReadings({
        is_test: false,
        hot_axle: false
      }));
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

  const handlePageChange = (newPage, stationName) => {
    if (paginatedDataSetting && paginatedDataSetting[stationName]) {
      setPaginatedDataSettings((prevSettings) => ({
        ...prevSettings,
        [stationName]: {
          ...prevSettings[stationName],
          currentPage: newPage,
        },
      }));
    } else {
      setPaginatedDataSettings((prevSettings) => ({
        ...prevSettings,
        [stationName]: {
          currentPage: newPage,
          rowsPerPage: 5,
        },
      }));
    }
  };

  const handleRowsPerPageChange = (e, stationName) => {
    if (e.target.value) {
      setPaginatedDataSettings((prevState) => ({
        ...prevState,
        [stationName]: {
          rowsPerPage: e.target.value,
          currentPage: 1,
        },
      }));
    }
  };

  const groupedByStation = selectorData?.deviceReadings.reduce(
    (grouped, response) => {
      const station = response?.station;
      grouped[station] = grouped[station] || [];
      grouped[station].push(response);
      return grouped;
    },
    {}
  );

  const getPaginationDetails = (stationName) => {
    const paginationSettingsForStation =
      (paginatedDataSetting && paginatedDataSetting[stationName]) || {};
    const currentPage = paginationSettingsForStation?.currentPage || 1;
    const rowsPerPage = paginationSettingsForStation?.rowsPerPage || 5;
    return {
      currentPage,
      rowsPerPage,
    };
  };

  const paginatedData = Object.keys(groupedByStation).map((stationName) => {
    const { rowsPerPage, currentPage } = getPaginationDetails(stationName);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return groupedByStation[stationName].slice(startIndex, endIndex);
  });

  return (
    <div className="main-contentview" ref={mainContent}>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-lg-4 col-xl-2">
                <div className="card">
                  <Button color="secondary" type="button" size="lg">
                    {t("filter")}
                  </Button>
                </div>
              </div>

              <div className="col-lg-4 col-xl-2">
                <div className="card">
                  <Button color="secondary" type="button" size="lg">
                    {t("download")}
                  </Button>
                </div>
              </div>

              <div className="col-lg-4 col-xl-2">
                <div className="card">
                  <Button color="secondary" type="button" size="lg">
                    {t("upload")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow border-0 ">
              <CardBody>
                {Object.keys(groupedByStation)?.length > 0 &&
                  paginatedData &&
                  paginatedData.map((station) => {
                    const { rowsPerPage, currentPage } = getPaginationDetails(
                      station[0]?.station
                    );
                    return (
                      <>
                        <div
                          key={station?.id}
                          className="device-reading-table-container"
                          style={{
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            overflow: "auto",
                          }}
                        >
                          <DeviceReadingTable station={station} />
                        </div>
                        <PaginationComponent
                          station={station}
                          groupedByStation={groupedByStation}
                          currentPage={currentPage}
                          rowsPerPage={rowsPerPage}
                          handlePageChange={handlePageChange}
                          handleRowsPerPageChange={handleRowsPerPageChange}
                        />
                      </>
                    );
                  })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DeviceReadings;
