import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_DETAILS } from "../mutations/GET_USER_DETAILS";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";

const UserProfile = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_USER_DETAILS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data && data.getUserDetails;
  console.log(user);
  const handleEdit = (props) => {
    // Handle edit button click with user details
    console.log("Edit clicked", user);
    navigate(`/edit-user/${user.id}`);
  };

  return (
    <Row className="m-4">
      <Container className="col-xl-6 col-lg-12 col-md-12 col-12 mb-5">
        {user && (
          <Card className="mb-5">
            <Card.Header>
              <h4 className="mb-0">About Me</h4>
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
                    <h5 className="text-uppercase">Username</h5>
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
                <Col xs={6}>
                  <PrimaryButton
                    variant="primary"
                    className="mt-4"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </PrimaryButton>

                  {/* <Button
                    variant="primary"
                    className="mt-4"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </Button> */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Container>
    </Row>
  );
};

export default UserProfile;
