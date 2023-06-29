import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Header from "../components/Header";
import { useSignup } from "../hooks/useSignup";

import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading, error } = useSignup();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log(username);
      console.log(email);
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
      <Header />
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
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" className="m-4" disabled={loading}>
                Signup
              </Button>

              {error && <p>Error: {error.message}</p>}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
