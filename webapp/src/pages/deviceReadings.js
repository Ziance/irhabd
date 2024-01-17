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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeviceReadings,
  selectDeviceReadings,
} from "../redux/slices/deviceReadingsSlice";
import { toast } from "react-toastify";
import DeviceReadingTable from "./deviceReadingTable";
import PaginationComponent from "./paginationComponent";
import DeviceReadingFilterModal from "./deviceReadingFilterModal";

const DeviceReadings = ({ showFromLeft }) => {
  const dispatch = useDispatch();
  const selectorData = useSelector(selectDeviceReadings);
  const { t } = useTranslation();
  const mainContent = React.useRef(null);
  const navigate = useNavigate();
  const [paginatedDataSetting, setPaginatedDataSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const isAuthenticated = !!localStorage.getItem("user");

  useEffect(() => {
    setLoading(true);
    try {
      dispatch(fetchDeviceReadings());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data || error?.message || "Data fetch failed."
      );
    }
  }, []);

  useEffect(() => {
    if (showFromLeft) {
      setLoading(true);
      try {
        dispatch(
          fetchDeviceReadings({
            is_test: false,
            hot_axle: false,
          })
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(
          error?.response?.data || error?.message || "Data fetch failed."
        );
      }
    }
  }, [showFromLeft]);

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
          rowsPerPage: parseInt(e.target.value, 10),
          currentPage: 1,
        },
      }));
    } else {
      setPaginatedDataSettings((prevState) => ({
        ...prevState,
        [stationName]: {
          rowsPerPage: 5,
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

  const downloadAllData = () => {
    const allData = [];

    // Iterate through each station's data
    Object.values(groupedByStation).forEach((station) => {
      const stationData = station || [];
      allData.push(...stationData);
    });

    // Check if there's any data to download
    if (allData.length === 0) {
      toast.error("No data available to download.");
      return;
    }

    // Include a title in the CSV file
    const titleRow = Object.keys(allData[0]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      titleRow.join(",") +
      "\n" +
      allData
        .map((row) =>
          Object.values(row)
            .map((value) => `"${value}"`)
            .join(",")
        )
        .join("\n");

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "allData.csv");

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSelectedData = () => {
    const selectedData = [];

    // Iterate through each station's data
    Object.values(groupedByStation).forEach((station) => {
      const stationData = station || [];

      // Filter station data based on selected rows
      const selectedStationData = stationData.filter((row) =>
        selectedRows.includes(row.id)
      );

      // Add selected station data to the result
      selectedData.push(...selectedStationData);
    });

    // Check if there's any data to download
    if (selectedData.length === 0) {
      toast.error("No selected data available to download.");
      return;
    }

    // Include a title in the CSV file
    const titleRow = Object.keys(selectedData[0]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      titleRow.join(",") +
      "\n" +
      selectedData
        .map((row) =>
          Object.values(row)
            .map((value) => `"${value}"`)
            .join(",")
        )
        .join("\n");

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "selectedData.csv");

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const handleSelectedRowsChange = (rows) => setSelectedRows(rows);

  const handleSelectAllChange = (selectAll, allRowIds) => {
    if (selectAll) setSelectedRows(allRowIds);
    else setSelectedRows([]);
  };

  const handleFilterApply = (paramObj) => {
    if (paramObj) {
      setLoading(true);
      try {
        dispatch(fetchDeviceReadings(paramObj));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(
          error?.response?.data || error?.message || "Data fetch failed."
        );
      } finally {
        setFilterModalOpen(false)
      }
    }
  };

  return (
    <div
      className={`${(showFromLeft && "main-content") || "main-contentview"}`}
      ref={mainContent}
    >
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-xl-2">
                <div className="card">
                  <Button color="secondary" type="button" size="lg" onClick={() => setFilterModalOpen(true)}>
                    {t("filter")}
                  </Button>
                </div>
              </div>

              <div className="col-lg-4 col-xl-2">
                <div className="card">
                  <Button
                    color="secondary"
                    type="button"
                    size="lg"
                    onClick={downloadAllData}
                  >
                    {t("downloadAll")}
                  </Button>
                </div>
              </div>

              <div className="col-lg-4 col-xl-2">
                <div className="card">
                  <Button
                    color="secondary"
                    type="button"
                    size="lg"
                    onClick={downloadSelectedData}
                  >
                    {t("downloadSelected")}
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
                {loading ? (
                  <div className="text-center text-muted">Loading...</div>
                ) : (
                  <>
                    {Object.keys(groupedByStation)?.length > 0 &&
                      paginatedData &&
                      paginatedData.map((station) => {
                        const { rowsPerPage, currentPage } =
                          getPaginationDetails(station[0]?.station);
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
                              <DeviceReadingTable
                                station={station}
                                selectedRows={selectedRows}
                                onSelectedRowsChange={handleSelectedRowsChange}
                                onSelectAllChange={handleSelectAllChange}
                              />
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
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <DeviceReadingFilterModal
        isModalOpen={filterModalOpen}
        toggleHandler={() => setFilterModalOpen(!filterModalOpen)}
        handleFilterApply={(obj) => handleFilterApply(obj)}
      />
    </div>
  );
};

export default DeviceReadings;
