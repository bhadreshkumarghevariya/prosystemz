import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_DETAILS } from "../mutations/GET_USER_DETAILS";
import { Container } from "react-bootstrap";
import Header from "../components/Header";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { data, loading, error } = useQuery(GET_USER_DETAILS);
  useEffect(() => {
    console.log("Use effect from user profile");
    if (data) {
      setUser(data.getUserDetails);
    }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Container>
        Hello from User Profile
        {user && (
          <div>
            <h2>User Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default UserProfile;
