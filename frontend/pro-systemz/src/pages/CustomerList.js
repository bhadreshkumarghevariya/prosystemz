import React from "react";
import { useUserList } from "../hooks/useUserList";
import { Card, Container, Table } from "react-bootstrap";
import CustomerListItem from "../components/CustomerListItem";

const CustomerList = ({ isLoggedIn }) => {
  const { data, error, loading } = useUserList();

  if (loading) return <>loading....</>;
  if (error)
    return (
      <>
        something went wrong...
        {error.graphQLErrors.map(({ message }, i) => {
          <span key={i}>{message}</span>;
        })}
      </>
    );
  let isData;
  if (Object.keys(data.getAllUsers).length === 0) {
    isData = <h1>Sorry.... There is no product Available for this type</h1>;
  }

  return (
    <React.Fragment>
      <Container>
        <Card className="m-3">
          <Card.Header>
            <h3 className="text-center">User List</h3>
          </Card.Header>

          <Card.Body className="my-1 px-0 py-0 mx-0">
            <Table className="table text-nowrap mb-0 table-centered table-hover m-1">
              <thead className="table-light">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Details</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {isData}
              <tbody>
                {data.getAllUsers.map((user) => {
                  return <CustomerListItem user={user} key={user.id} />;
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default CustomerList;
