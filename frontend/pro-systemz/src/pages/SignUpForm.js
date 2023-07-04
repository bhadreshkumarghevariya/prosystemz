import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Header from "../components/Header";
import { useSignup } from "../hooks/useSignup";

import { useNavigate } from "react-router-dom";
import { emailValidator, passwordValidator } from "../validations";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { signup, loading, error } = useSignup();
  const navigate = useNavigate();

  useEffect(() => {
    setEmailError(emailValidator(email));
    setPasswordError(passwordValidator(password));
  }, [email, password]);

  const handleSignup = async (e) => {
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
      await signup(username, email, password);
      // Redirect the user to the login page
      navigate("/login");
      //   history.push("/login");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-sm-center">
        <Col sm={12}>
          <Card style={{ width: "32rem" }} className="m-auto p-3">
            <Form onSubmit={handleSignup}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  required
                />
                {passwordValidator(password)}
                {passwordError && (
                  <div className="alert alert-danger my-3" role="alert">
                    The password must contain at least 1 lowercase, 1 uppercase,
                    1 numeric character, and be at least 8 characters long.
                  </div>
                )}
              </Form.Group>

              <Button type="submit" className="m-4" disabled={loading}>
                Signup
              </Button>

              {error && (
                <p>
                  Error:{" "}
                  <div className="alert alert-danger my-3" role="alert">
                    {error.message}
                  </div>
                </p>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
