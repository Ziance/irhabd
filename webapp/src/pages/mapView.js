// MapView.js
import React, { useEffect, useState, useRef } from "react";
import { Card, Container, Row, Col } from "reactstrap";
import GoogleMapReact from "google-map-react";
import LocationDropDown from "../components/common/locationDropDown";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, selectLocation } from "../redux/slices/locationSlice";
import { toast } from "react-toastify";
import InfoWindow from "./InfoWindow";
import Marker from "./marker";

const MapWrapper = ({ data }) => {
  const [infoWindow, setInfoWindow] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom] = useState(3);

  useEffect(() => {
    if (window.google && window.google.maps) {
      if (data.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        data.forEach((marker) => {
          bounds.extend(
            new window.google.maps.LatLng(marker.latitude, marker.longitude)
          );
        });
        const newCenter = {
          lat: (bounds.getNorthEast().lat() + bounds.getSouthWest().lat()) / 2,
          lng: (bounds.getNorthEast().lng() + bounds.getSouthWest().lng()) / 2,
        };
        setCenter(newCenter);
      }
    }
  }, [data]);

  const handleMarkerClick = (marker) => {
    setInfoWindow(marker);
  };

  const handleMapClick = (event) => {
    if (event.target && !event.target.classList.contains("marker")) {
      setInfoWindow(null);
    }
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDnrrB6Nu2FFFrM6eO-oQXFu_Y9yHp2cL4" }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={handleMapClick}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        {data.map((marker) => (
          <Marker
            key={marker.id}
            lat={marker.latitude}
            lng={marker.longitude}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
      </GoogleMapReact>
      {infoWindow && (
        <InfoWindow onClose={() => setInfoWindow(null)}>
          <div>
            <h2>{"infoWindow.title"}</h2>
            <p>{"infoWindow.description"}</p>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};

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
              <MapWrapper
                data={location?.devices.filter(
                  (marker) => marker.latitude && marker.longitude
                )}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MapView;
