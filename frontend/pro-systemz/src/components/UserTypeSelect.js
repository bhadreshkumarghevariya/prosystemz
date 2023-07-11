import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { useGetAllUserTypes } from "../hooks/useGetAllUserTypes";

const UserTypeSelect = ({ userType, setUserType }) => {
  const { data, error, loading } = useGetAllUserTypes();

  // If the data is loading, display a loading message
  if (loading) return <>Loading...</>;

  // If there is an error fetching the data, display an error message
  if (error) {
    return (
      <>
        Something went wrong...
        {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </>
    );
  }

  return (
    <Form.Group className="m-2" controlId="userType">
      <FloatingLabel label="User Type">
        <Form.Control
          as="select"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="">Select user type</option>
          {data.getAllUserTypes.map((userType) => (
            <option key={userType.id} value={userType.id}>
              {userType.userTypeName}
            </option>
          ))}
        </Form.Control>
      </FloatingLabel>
    </Form.Group>
  );
};

export default UserTypeSelect;
