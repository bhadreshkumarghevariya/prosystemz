import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";
import { emailValidator, passwordValidator } from "../validations";
import { useEffect } from "react";

const { useNavigate } = require("react-router-dom");

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    setEmailError(emailValidator(email));
    setPasswordError(passwordValidator(password));
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      (await passwordValidator(password))
        ? setPasswordError(true)
        : setPasswordError(false);
      (await emailValidator(email))
        ? setEmailError(true)
        : setEmailError(false);
      if (emailError || passwordError) {
        return;
      }
      const { token, errorMessage } = await login(email, password);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        // Login successful, perform any necessary actions (e.g., redirect to dashboard)
        console.log(token);
        localStorage.setItem("token", token);
        setError("Login Successfull");
        // Clear form fields
        setEmail("");
        setPassword("");
        navigate("/", { replace: true });

        // Reload the entire application after a delay of 10 milliseconds
        setTimeout(() => {
          window.location.reload();
        }, 2);
      }
    } catch (error) {
      // Login failed, display error message
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <Container>
        <h2>Login</h2>
        <Alert variant="danger" show={err !== null}>
          {err}
        </Alert>

        <Row className="justify-content-sm-center">
          <Col sm={12}>
            <Card style={{ width: "32rem" }} className="m-auto p-3">
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailValidator(email)}
                  {emailError && (
                    <div className="alert alert-danger my-3" role="alert">
                      The email address is not valid.
                    </div>
                  )}
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordValidator(password)}
                  {passwordError && (
                    <div className="alert alert-danger my-3" role="alert">
                      The password must contain at least 1 lowercase, 1
                      uppercase, 1 numeric character, and be at least 8
                      characters long.
                    </div>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  className="m-4"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
