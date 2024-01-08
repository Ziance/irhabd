// MapView.js
import React from "react";
import { Card, Container, Row, Col } from "reactstrap";
import GoogleMapReact from "google-map-react";
import LocationDropDown from "../components/common/locationDropDown";

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
        bootstrapURLKeys={{ key: "AIzaSyDnrrB6Nu2FFFrM6eO-oQXFu_Y9yHp2cL4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

const MapView = () => {
  return (
    <div className="main-contentview">
      <LocationDropDown />
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
