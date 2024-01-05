import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const Header = ({
  zones,
  divisions,
  stations,
  handleZoneChange,
  handleDivisionChange,
  handleStationChange,
}) => {
  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
          <Row>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <FormGroup>
                        <Label for="exampleSelect">Select Zone</Label>
                        <Input
                          id="exampleSelect"
                          name="select"
                          type="select"
                          onChange={(e) => handleZoneChange(e)}
                        >
                          {zones?.length > 0 &&
                            zones.map((zone) => (
                              <option key={zone.code} value={zone.code}>
                                {zone.name}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <FormGroup>
                        <Label for="exampleSelect">Select Division</Label>
                        <Input
                          id="exampleSelect"
                          name="select"
                          type="select"
                          onChange={(e) => handleDivisionChange(e)}
                        >
                          {divisions?.length > 0 &&
                            divisions.map((division) => (
                              <option key={division.code} value={division.code}>
                                {division.name}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <FormGroup>
                        <Label for="exampleSelect">Select Station</Label>
                        <Input
                          id="exampleSelect"
                          name="select"
                          type="select"
                          onChange={(e) => handleStationChange(e)}
                        >
                          {stations?.length > 0 &&
                            stations.map((station) => (
                              <option
                                key={station.station_code}
                                value={station.station_code}
                              >
                                {station.station_name}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Header;
