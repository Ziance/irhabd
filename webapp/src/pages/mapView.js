// MapView.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Container,
  Row,
  Input,
  Col,
  FormGroup,
  InputGroup,
} from "reactstrap";
import {
  fetchZones,
  fetchDivisions,
  fetchStations,
  selectLocation,
} from "../redux/slices/locationSlice";
import GoogleMapReact from "google-map-react";
import Select from "react-select";

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
  const [zones, setZones] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    dispatch(fetchZones());
    dispatch(fetchDivisions());
    dispatch(fetchStations());
  }, []);

  useEffect(() => {
    if (location?.zones?.length > 0) {
      setZones(
        location.zones.map((z) => {
          return {
            value: z.code,
            label: z.name,
          };
        })
      );
    }
  }, [location.zones]);

  useEffect(() => {
    if (location?.divisions?.length > 0) {
      setDivisions(
        location.divisions.map((d) => {
          return {
            value: d.code,
            label: d.name,
          };
        })
      );
    }
  }, [location.divisions]);

  useEffect(() => {
    if (location?.stations?.length > 0) {
      const stationOptions = location.stations.map((s) => {
        return {
          value: s.station_code,
          label: s.station_name,
        };
      });
      console.log("=======stations==============", stationOptions);
      // setStations(stationOptions);
    }
  }, [location.stations]);

  console.log("======================", stations);

  return (
    <div className="main-contentview">
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row">
              <div className="col-lg-6 col-xl-3">
                <div className="card-stats mb-4 mb-xl-0 card">
                  <CardBody className="card-body">
                    <p className="mt-3 mb-0 text-muted text-sm">Zone</p>
                    {/* <Input
                      type="select"
                      id="zoneSelect"
                      // onChange={(e) => setSelectedZone(e.target.value)}
                    >
                      {location?.zones?.length > 0 &&
                        location.zones.map((zone) => (
                          <option key={zone.code} value={zone.code}>
                            {zone.name}
                          </option>
                        ))}
                    </Input> */}
                  </CardBody>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3">
                <div className="card-stats mb-4 mb-xl-0 card">
                  <div className="card-body">
                    <p className="mt-3 mb-0 text-muted text-sm">Divisions</p>
                    {/* <Input
                      type="select"
                      id="divisionSelect"
                      // onChange={(e) => setSelectedDivision(e.target.value)}
                    >
                      {location?.divisions?.length > 0 &&
                        location.divisions.map((division) => (
                          <option key={division.code} value={division.code}>
                            {division.name}
                          </option>
                        ))}
                    </Input> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3">
                <div className="card-stats mb-4 mb-xl-0 card">
                  <CardBody className="card-body">
                    <p className="mt-3 mb-0 text-muted text-sm">Stations</p>
                    <FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          {stations.length > 0 && (
                            <Select
                              // onChange={setSelectedStation}
                              options={stations}
                            />
                          )}
                        </InputGroup>
                      </FormGroup>
                      {/* <InputGroup className="input-group-alternative mb-3">
                        <Input
                          type="select"
                          id="stationSelect"
                          onChange={(e) => handleStationChange(e.target.value)}
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
                        </Input>
                      </InputGroup> */}
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
