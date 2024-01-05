// MapView.js
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Container, Row, Col, Input, Label } from "reactstrap";
import {
  fetchZones,
  fetchDivisions,
  fetchStations,
  selectLocation,
} from "../redux/slices/locationSlice";

const MapWrapper = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      let map = mapRef.current;
      let lat = "40.748817";
      let lng = "-73.985428";
      const myLatlng = new window.google.maps.LatLng(lat, lng);
      const mapOptions = {
        zoom: 12,
        center: myLatlng,
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{ color: "#444444" }],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
          },
        ],
      };

      map = new window.google.maps.Map(map, mapOptions);

      const marker = new window.google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: "Light Bootstrap Dashboard PRO React!",
      });

      const contentString =
        '<div class="info-window-content"><h2>Light Bootstrap Dashboard PRO React</h2>' +
        "<p>A premium Admin for React-Bootstrap, Bootstrap, React, and React Hooks.</p></div>";

      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });

      window.google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });
    } else {
      console.error("Google Maps API not available.");
    }
  }, [window.google, mapRef.current]);

  return (
    <>
      <div
        style={{ height: `600px` }}
        className="map-canvas"
        id="map-canvas"
        ref={mapRef}
      ></div>
    </>
  );
};

const MapView = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);

  useEffect(() => {
    dispatch(fetchZones());
    dispatch(fetchDivisions());
    dispatch(fetchStations());
  }, []);

  const handleZoneChange = (selectedZone) => {
    // handle change
  };

  const handleDivisionChange = (selectedZone) => {
    // handle change
  };

  const handleStationChange = (selectedZone) => {
    // handle change
  };

  return (
    <div>
      <h2>Map View Screen</h2>
      <br />

      {/* Select Zone */}
      <Label for="zoneSelect">Select Zone:</Label>
      <Input
        type="select"
        id="zoneSelect"
        onChange={(e) => handleZoneChange(e.target.value)}
      >
        {location?.zones?.length > 0 &&
          location.zones.map((zone) => (
            <option key={zone.code} value={zone.code}>
              {zone.name}
            </option>
          ))}
      </Input>

      {/* Select Divisions */}
      <Label for="divisionSelect">Select Divisions:</Label>
      <Input
        type="select"
        id="divisionSelect"
        onChange={(e) => handleDivisionChange(e.target.value)}
      >
        {location?.divisions?.length > 0 &&
          location.divisions.map((division) => (
            <option key={division.code} value={division.code}>
              {division.name}
            </option>
          ))}
      </Input>

      {/* Select Stations */}
      <Label for="stationSelect">Select Stations:</Label>
      <Input
        type="select"
        id="stationSelect"
        onChange={(e) => handleStationChange(e.target.value)}
      >
        {location?.stations?.length > 0 &&
          location.stations.map((station) => (
            <option key={station.station_code} value={station.station_code}>
              {station.station_name}
            </option>
          ))}
      </Input>

      {/* Map Section */}
      <Container className="mt-4">
        <Row>
          <Col>
            <Card className="shadow border-0">
              <CardBody>
                <Container className="mt--7" fluid>
                  <Row>
                    <div className="col">
                      <Card className="shadow border-0">
                        <MapWrapper />
                      </Card>
                    </div>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MapView;
