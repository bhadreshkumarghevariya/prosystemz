import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";
import Header from "../components/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(null);
  const { login, loading, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token } = await login(email, password);
      // Login successful, perform any necessary actions (e.g., redirect to dashboard)
      console.log(token);
      localStorage.setItem("token", token);
      setError("Login Successfull");
    } catch (error) {
      // Login failed, display error message
      setError(error.message);
    }

    // Clear form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Container>
        <Header />
        <h2>Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {error && <Alert variant="danger">{err}</Alert>}

        <Form onSubmit={handleLogin}>
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

          <Button
            variant="primary"
            className="m-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
