// Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/userSlice";
import { login } from "../services/userService";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardHeader
} from "reactstrap";

const Login = () => {
  const mainContent = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const credentials = { username, password };
      const user = await login(credentials);
      dispatch(loginUser(user));
      navigate("/admin/mapView");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <Form role="form">
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Username"
                  type="text"
                  autoComplete="new-username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="my-4" color="primary" type="button" onClick={handleLogin}>
                Sign in
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Row className="mt-3">
        <Col xs="6">
          <a
            className="text-light"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <small>Forgot password?</small>
          </a>
        </Col>
      </Row>
    </Col>
  </>
  );
};

export default Login;
