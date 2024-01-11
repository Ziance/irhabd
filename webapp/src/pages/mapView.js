// MapView.js
import React, { useEffect, useState, useRef } from "react";
import { Card, Container, Row, Col } from "reactstrap";
import LocationDropDown from "../components/common/locationDropDown";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, selectLocation } from "../redux/slices/locationSlice";
import { toast } from "react-toastify";
import MapWrapper from "./mapWrapper";

const MapView = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedStations, setSelectedStations] = useState([]);

  useEffect(() => {
    let paramObj = {};
    if (selectedZones.length > 0)
      paramObj.zone = selectedZones.map((item) => item.value).join(",");

    if (selectedDivisions.length > 0)
      paramObj.division = selectedDivisions.map((item) => item.value).join(",");

    if (selectedStations.length > 0)
      paramObj.station = selectedStations.map((item) => item.value).join(",");

    try {
      paramObj ? dispatch(fetchDevices(paramObj)) : dispatch(fetchDevices());
    } catch (error) {
      toast.error(
        error?.response?.data || error?.message || "Data fetch failed."
      );
    }
  }, [selectedZones, selectedDivisions, selectedStations]);

  return (
    <div className="main-contentview">
      <LocationDropDown
        getSelectedZones={(options) => setSelectedZones(options)}
        getSelectedDivisions={(options) => setSelectedDivisions(options)}
        getSelectedStations={(options) => setSelectedStations(options)}
      />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow border-0">
              {(location?.devices?.length > 0 && (
                <MapWrapper
                  data={location.devices
                    .filter((marker) => marker.latitude && marker.longitude)
                    .map((marker) => {
                      if (marker.latitude && marker.longitude) {
                        return {
                          lat: marker.latitude,
                          lng: marker.longitude,
                          title: marker.station,
                          content: `<div class="info-window-content"><h2>${marker.station}</h2><p>Latitude: ${marker.latitude}</p><p>Longitude: ${marker.longitude}</p></div>`,
                        };
                      } else return;
                    })}
                />
              )) || (
                <div className="text-muted text-center">
                  Map can't be loaded
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MapView;
