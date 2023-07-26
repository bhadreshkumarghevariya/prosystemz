import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_DETAILS } from "../mutations/GET_USER_DETAILS";
import { Container, Card, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  // const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_USER_DETAILS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data && data.getUserDetails;

  return (
    <Row>
      <Col>
        <Container>
          {user && (
            <Card className="m-1">
              <Card.Header>
                <h4 className="mb-0">User Details</h4>
              </Card.Header>
              <Card.Body>
                {user.bio && (
                  <>
                    <h5 className="text-uppercase">Bio</h5>
                    <p className="mt-2 mb-6">{user.bio}</p>
                  </>
                )}
                <Row className="p-4">
                  {user.username && (
                    <Col xs={6} className="mb-5">
                      <h5 className="text-uppercase">Name</h5>
                      <p className="mb-0">{user.username}</p>
                    </Col>
                  )}
                  {user.position && (
                    <Col xs={6} className="mb-5">
                      <h5 className="text-uppercase">Position</h5>
                      <p className="mb-0">{user.position}</p>
                    </Col>
                  )}
                  {user.phone && (
                    <Col xs={6} className="mb-5">
                      <h5 className="text-uppercase">Phone</h5>
                      <p className="mb-0">{user.phone}</p>
                    </Col>
                  )}
                  {user.dateOfBirth && (
                    <Col xs={6} className="mb-5">
                      <h5 className="text-uppercase">Date of Birth</h5>
                      <p className="mb-0">{user.dateOfBirth}</p>
                    </Col>
                  )}
                  {user.email && (
                    <Col xs={6}>
                      <h5 className="text-uppercase">Email</h5>
                      <p className="mb-0">{user.email}</p>
                    </Col>
                  )}
                  {user.location && (
                    <Col xs={6}>
                      <h5 className="text-uppercase">Location</h5>
                      <p className="mb-0">{user.location}</p>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          )}
        </Container>
      </Col>
    </Row>
  );
};

export default UserDetails;
