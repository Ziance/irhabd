// LocationDropDown.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardBody } from "reactstrap";
import {
  fetchZones,
  fetchDivisions,
  fetchStations,
  selectLocation,
} from "../../redux/slices/locationSlice";
import { toast } from "react-toastify";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const LOCATION_TYPES = [
  {
    value: "zones",
    label: "Zone",
  },
  {
    value: "divisions",
    label: "Division",
  },
  {
    value: "stations",
    label: "Station",
  },
];

const LocationDropDown = (props) => {
  const { getSelectedData, isShowHeaderBackground = true } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const [selectedType, setSelectedType] = useState({});
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    if (selectedType) {
      try {
        switch (selectedType.value) {
          case "zones":
            dispatch(fetchZones());
            break;
          case "divisions":
            dispatch(fetchDivisions());
            break;
          case "stations":
            dispatch(fetchStations());
            break;
          default:
            console.log("Api call");
            break;
        }
      } catch (error) {
        toast.error(
          error?.response?.data || error?.message || "Data fetch failed."
        );
      }
    }
  }, [selectedType]);

  useEffect(() => {
    let data = [];
    if (selectedType.value === "zones" && location?.zones?.length > 0) {
      data = location.zones.map((s) => ({
        value: s.code,
        label: s.name,
      }));
    }
    if (selectedType.value === "divisions" && location?.divisions?.length > 0) {
      data = location.divisions.map((s) => ({
        value: s.id,
        label: s.name,
      }));
    }
    if (selectedType.value === "stations" && location?.stations?.length > 0) {
      data = location.stations.map((s) => ({
        value: s.station_code,
        label: s.station_name,
      }));
    }

    setOptionList(data);
  }, [location, selectedType]);

  const handleSelectChange = (options) => {
    setSelectedTypeData(options);
    getSelectedData && getSelectedData(selectedType.value, options);
  };

  return (
    <div className={`${isShowHeaderBackground && "header bg-gradient-info pb-8 pt-5 pt-md-4"}`}>
      <div className="container-fluid">
        <div className="header-body">
          <div className="row">
            <div className="col-lg-6 col-xl-6">
              <div className={`card-stats card ${!isShowHeaderBackground ? "border-0" : ''}`}>
                <CardBody>
                  <p className="text-muted text-sm">
                    {t("locationType")}
                  </p>
                  <Select
                    isMulti={false}
                    options={LOCATION_TYPES}
                    value={selectedType}
                    onChange={(option) => {
                      setSelectedType(option);
                      setSelectedTypeData([]);
                    }}
                  />
                </CardBody>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className={`card-stats card ${!isShowHeaderBackground ? "border-0" : ""}`}>
                <CardBody className="card-body">
                  <p className="text-muted text-sm">
                    {t("location")}
                  </p>
                  <Select
                    isMulti
                    options={optionList}
                    value={selectedTypeData}
                    onChange={(options) => handleSelectChange(options)}
                  />
                </CardBody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDropDown;
