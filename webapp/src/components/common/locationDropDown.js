// LocationDropDown.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardBody } from "reactstrap";
import {
  fetchZones,
  fetchDivisions,
  fetchStations,
  selectLocation,
  fetchDevices,
} from "../../redux/slices/locationSlice";
import { toast } from "react-toastify";
import Select from "react-select";

const LocationDropDown = (props) => {
  const { getSelectedZones, getSelectedDivisions, getSelectedStations } = props;
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const [selectedZone, setSelectedZone] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedStation, setSelectedStation] = useState([]);

  useEffect(() => {
    try {
      dispatch(fetchZones());
      dispatch(fetchDivisions());
      dispatch(fetchStations());
      dispatch(fetchDevices());
    } catch (error) {
      toast.error(
        error?.response?.data || error?.message || "Data fetch failed."
      );
    }
  }, []);

  const handleSelectChange = (key, options) => {
    if (key === "zones") {
      setSelectedZone(options);
      getSelectedZones && getSelectedZones(options);
    }
    if (key === "division") {
      setSelectedDivision(options);
      getSelectedDivisions && getSelectedDivisions(options)
    }
    if (key === "station") {
      setSelectedStation(options);
      getSelectedStations && getSelectedStations(options)
    }
  };

  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row">
            <div className="col-lg-6 col-xl-3">
              <div className="card-stats mb-4 mb-xl-0 card">
                <CardBody className="card-body">
                  <p className="mt-3 mb-0 text-muted text-sm">Zone</p>
                  <Select
                    isMulti
                    options={(location?.zones ?? []).map((s) => ({
                      value: s.code,
                      label: s.name,
                    }))}
                    value={selectedZone}
                    onChange={(options) => handleSelectChange("zones", options)}
                  />
                </CardBody>
              </div>
            </div>
            <div className="col-lg-6 col-xl-3">
              <div className="card-stats mb-4 mb-xl-0 card">
                <div className="card-body">
                  <p className="mt-3 mb-0 text-muted text-sm">Divisions</p>
                  <Select
                    isMulti
                    options={(location?.divisions ?? []).map((s) => ({
                      value: s.code,
                      label: s.name,
                    }))}
                    value={selectedDivision}
                    onChange={(options) =>
                      handleSelectChange("division", options)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-3">
              <div className="card-stats mb-4 mb-xl-0 card">
                <div className="card-body">
                  <p className="mt-3 mb-0 text-muted text-sm">Stations</p>
                  <Select
                    isMulti
                    options={(location?.stations ?? []).map((s) => ({
                      value: s.station_code,
                      label: s.station_name,
                    }))}
                    value={selectedStation}
                    onChange={(options) =>
                      handleSelectChange("station", options)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDropDown;
