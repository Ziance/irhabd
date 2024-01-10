// DeviceReadings.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Label,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeviceReadings,
  selectDeviceReadings,
} from "../redux/slices/deviceReadingsSlice";
import { toast } from "react-toastify";
import moment from "moment";

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
      dispatch(fetchDeviceReadings());
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
    if(paginatedDataSetting && paginatedDataSetting[stationName]) {
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
                        <Table striped>
                          <thead>
                            <tr>
                              <th
                                colspan="12"
                                className="bg-primary full-width"
                              >
                                {" "}
                                <p className="m-0 text-md text-white font-weight-bold">{`${t(
                                  "station"
                                )}: ${
                                  (station?.length > 0 && station[0].station) ||
                                  ""
                                }`}</p>
                              </th>
                            </tr>
                            <tr>
                              <th>{t("deviceId")}</th>
                              <th>{t("time")}</th>
                              <th>{t("trainDir")}</th>
                              <th>{t("rakeType")}</th>
                              <th>{t("coachCnt")}</th>
                              <th>{t("axleCnt")}</th>
                              <th>{t("maxRightTemo")}</th>
                              <th>{t("maxLeftTemp")}</th>
                              <th>{t("maxDiffTemp")}</th>
                              <th>{t("avgSpeed")}</th>
                              <th>{t("remark")}</th>
                              <th>{t("trainNo")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {station &&
                              station.map((rowData) => (
                                <tr key={rowData.id}>
                                  <td>{rowData.device_id ?? ""}</td>
                                  <td>
                                    {moment(rowData.timestamp).format(
                                      "DD-MM-YYYY HH:mm:ss"
                                    ) ?? ""}
                                  </td>
                                  <td>{rowData.train_dir ?? ""}</td>
                                  <td>{rowData.rake_type ?? ""}</td>
                                  <td>{rowData.coach_count ?? ""}</td>
                                  <td>{rowData.device_id ?? ""}</td>
                                  <td>{rowData.axle_count ?? ""}</td>
                                  <td>{rowData.max_right_temp ?? ""}</td>
                                  <td>{rowData.max_left_temp ?? ""}</td>
                                  <td>{rowData.max_diff_temp ?? ""}</td>
                                  <td>{rowData.avg_speed ?? ""}</td>
                                  <td>{rowData.remarks ?? ""}</td>
                                  <td>{rowData.train_no ?? ""}</td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                        <Row className="justify-content-center mb-3">
                          <Col xs="auto" className="d-flex align-items-center">
                            <Pagination>
                              <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink
                                  onClick={() => {
                                    handlePageChange(
                                      currentPage - 1,
                                      station && station[0]?.station
                                    );
                                  }}
                                  className="border-0 bg-transparent mt-2 text-primary"
                                >
                                  {t("prev")}
                                </PaginationLink>
                              </PaginationItem>
                            </Pagination>
                          </Col>
                          <Col
                            xs="auto"
                            className="d-flex align-items-center justify-content-center w-auto"
                          >
                            <Label
                              for="rowsPerPage"
                              className="mr-2 text-muted text-sm"
                            >
                              Rows
                            </Label>
                            <Input
                              type="number"
                              id="rowsPerPage"
                              defaultValue={5}
                              onChange={(e) => {
                                handleRowsPerPageChange(
                                  e,
                                  station && station[0]?.station
                                );
                              }}
                              min={5}
                              size="small"
                              className="w-25 max-w-50 p-0"
                            />
                          </Col>
                          <Col xs="auto" className="d-flex align-items-center">
                            <Pagination>
                              <PaginationItem
                                disabled={
                                  currentPage ===
                                  Math.ceil(
                                    Object.keys(groupedByStation)?.length /
                                      rowsPerPage
                                  )
                                }
                              >
                                <PaginationLink
                                  onClick={() =>
                                    handlePageChange(
                                      currentPage + 1,
                                      station && station[0]?.station
                                    )
                                  }
                                  className="border-0 bg-transparent mt-2 text-primary"
                                >
                                  {t("next")}
                                </PaginationLink>
                              </PaginationItem>
                            </Pagination>
                          </Col>
                        </Row>
                      </div>
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
