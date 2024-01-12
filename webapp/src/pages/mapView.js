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
  const [selectedType, setSelectedType] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDnrrB6Nu2FFFrM6eO-oQXFu_Y9yHp2cL4&libraries=places";
    script.async = true;
    script.onload = () => {
      console.log("Google Maps API loaded");
      setIsMapLoaded(true);
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    let paramObj = {};
    if (selectedData.length > 0)
      paramObj[selectedType] = selectedData.map((item) => item.value).join(",");

    try {
      paramObj ? dispatch(fetchDevices(paramObj)) : dispatch(fetchDevices());
    } catch (error) {
      toast.error(
        error?.response?.data || error?.message || "Data fetch failed."
      );
    }
  }, [selectedData]);

  return (
    <div className="main-contentview">
      <LocationDropDown
        getSelectedData={(options) => setSelectedData(options)}
        getSelectedKey={(key) => setSelectedType(key)}
      />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow border-0">
              {(isMapLoaded && location?.devices?.length > 0 && (
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
