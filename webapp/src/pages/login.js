// Login.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../redux/slices/userSlice";
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
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const mainContent = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!localStorage.getItem("user");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleLogin = async () => {
    setLoading(true);
    const validationErrors = {};
    if (!username.trim()) validationErrors.username = t("usernameIsRequired");
    if (!password.trim()) validationErrors.password = t("passwordIsRequired");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    } else {
      setErrors({});
      try {
        const credentials = { username, password };
        await dispatch(userLogin(credentials));
        toast.success("Logged in successfully.");
        window.location.href = "/";
      } catch (error) {
        toast.error(
          error?.response?.data || error?.message || t("loginFailed")
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (key, value) => {
    setErrors({});
    if (key === "username") {
      setUsername(value);
    }

    if (key === "password") {
      setPassword(value);
    }
  };

  const isInvalid = (field) => errors[field] && errors[field].length > 0;

  return (
    <>
      <div className="main-content login" ref={mainContent}>
        <div className="header bg-gradient-info py-7 py-lg-6">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center row">
                <Col lg="5" md="6">
                  <h1 className="text-white">{t("welcome!")}</h1>
                  <p className="text-lead text-light">{t("signInHere")}</p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup className="mb-3 form-group">
                      <InputGroup className="input-group-alternative login-height">
                        <div className="input-group-prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </div>
                        <Input
                          placeholder="Username"
                          type="text"
                          autoComplete="username"
                          onChange={(e) =>
                            handleInputChange("username", e.target.value)
                          }
                          invalid={isInvalid("username")}
                        />
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          invalid={isInvalid("password")}
                        />
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={handleLogin}
                      >
                        {t("signIn")}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
