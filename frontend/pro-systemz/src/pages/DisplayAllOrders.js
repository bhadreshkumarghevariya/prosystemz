import React from "react";
import { useGetAllOrders } from "../hooks/useGetAllOrders";
import { Card, Container, Table } from "react-bootstrap";
import OrderListItem from "./OrderListItem";

const DisplayAllOrders = () => {
  const { data, loading, error } = useGetAllOrders();
  if (loading) return <>loading....</>;
  if (error) return <>error....</>;
  let isData;
  if (Object.keys(data.getAllOrders).length === 0) {
    isData = <h1>Sorry.... There is no orders Available.</h1>;
  }
  console.log(data.getAllOrders);
  return (
    <React.Fragment>
      <Container>
        <Card className="m-3">
          <Card.Header>
            <h3 className="text-center">Orders List</h3>
          </Card.Header>
          <Card.Body className="m-1 p-1">
            <Table className="table text-nowrap mb-0 table-centered table-hover m-1 custom-table">
              <thead className="table-light">
                <tr>
                  <th>Order Date</th>
                  <th>Order Status</th>
                  <th>Payment Id</th>
                  <th>Checkout Id</th>
                  <th>User Id</th>
                  <th>Update Order Status</th>
                  <th>View Order Details</th>
                </tr>
              </thead>
              {isData}
              <tbody>
                {data.getAllOrders.map((order) => {
                  return <OrderListItem order={order} key={order.id} />;
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default DisplayAllOrders;
