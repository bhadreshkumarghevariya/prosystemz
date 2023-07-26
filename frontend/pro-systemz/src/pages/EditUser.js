import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
} from "react-bootstrap";
import { useGetUser } from "../hooks/useGetUser";
import UserTypeSelect from "../components/UserTypeSelect";
import PrimaryButton from "../components/Buttons/PrimaryButton";

const EditUser = () => {
  const { userId } = useParams(); // Retrieve the userId from the URL params
  const navigate = useNavigate();
  const { error, data, loading } = useGetUser(userId);

  // Define state variables for the form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (!loading && !error && data) {
      setUsername(data.getUser.username);
      setEmail(data.getUser.email);
      data.getUser.userType && setUserType(data.getUser.userType.id);
    }
  }, [data, error, loading]);

  // If the data is loading, display a loading message
  if (loading) return <>loading....</>;

  // If there is an error fetching the data, display an error message
  if (error)
    return (
      <>
        something went wrong...
        {error.graphQLErrors.map(({ message }, i) => {
          <span key={i}>{message}</span>;
        })}
      </>
    );

  // Handle form submission for updating user details
  const handleFormSubmit = (e) => {};

  return (
    <Container className="mt-5">
      <Row className="justify-content-sm-center">
        <Col sm={12}>
          <Card style={{ width: "32rem" }} className="m-auto p-3">
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="m-2" controlId="username">
                <FloatingLabel label="Username">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter username"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="m-2" controlId="email">
                <FloatingLabel label="Email">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </FloatingLabel>
              </Form.Group>
              {/* <Form.Group controlId="username">
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
              </Form.Group> */}

              <UserTypeSelect userType={userType} setUserType={setUserType} />

              <PrimaryButton
                type="submit"
                className="m-4"
                disabled={loading}
                loading={loading}
              >
                Update User
              </PrimaryButton>

              {/* <Button type="submit" className="m-4">
                Update User
              </Button> */}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUser;
