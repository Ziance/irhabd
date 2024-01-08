// MapView.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  InputGroup,
} from "reactstrap";
import {
  fetchZones,
  fetchDivisions,
  fetchStations,
  selectLocation,
  fetchDevices,
} from "../redux/slices/locationSlice";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapWrapper = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

const MapView = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    dispatch(fetchZones());
    dispatch(fetchDivisions());
    dispatch(fetchStations());
    dispatch(fetchDevices());
  }, []);

  return (
    <div className="main-contentview">
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-lg-6 col-xl-3">
                <div className="card-stats mb-4 mb-xl-0 card">
                  <CardBody className="card-body">
                    <p className="mt-3 mb-0 text-muted text-sm">Zone</p>
                    <InputGroup className="input-group-alternative mb-3">
                      <select
                        id="zoneSelect"
                        onChange={(e) => setSelectedZone(e.target.value)}
                        className="custom-select"
                      >
                        {location?.zones?.length > 0 &&
                          location.zones.map((zone) => (
                            <option key={zone.code} value={zone.code}>
                              {zone.name}
                            </option>
                          ))}
                      </select>
                    </InputGroup>
                  </CardBody>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3">
                <div className="card-stats mb-4 mb-xl-0 card">
                  <div className="card-body">
                    <p className="mt-3 mb-0 text-muted text-sm">Divisions</p>
                    <InputGroup className="input-group-alternative mb-3">
                      <select
                        id="divisionsSelect"
                        onChange={(e) => setSelectedDivision(e.target.value)}
                        className="custom-select"
                      >
                        {location?.divisions?.length > 0 &&
                          location.divisions.map((division) => (
                            <option key={division.code} value={division.code}>
                              {division.name}
                            </option>
                          ))}
                      </select>
                    </InputGroup>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3">
                <div className="card-stats mb-4 mb-xl-0 card">
                  <CardBody className="card-body">
                    <p className="mt-3 mb-0 text-muted text-sm">Stations</p>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <select
                          id="stationSelect"
                          onChange={(e) => setSelectedStation(e.target.value)}
                          className="custom-select"
                        >
                          {location?.stations?.length > 0 &&
                            location.stations.map((station) => (
                              <option
                                key={station.station_code}
                                value={station.station_code}
                              >
                                {station.station_name}
                              </option>
                            ))}
                        </select>
                      </InputGroup>
                    </FormGroup>
                  </CardBody>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow border-0">
              <MapWrapper />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MapView;
