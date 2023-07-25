import React from "react";
import { Container, Card } from "react-bootstrap";
import { useGetOrderList } from "../hooks/useGetOrderList";
import { Table } from "react-bootstrap";
const MyOrders = (props) => {
  const userId = props.userId;
  console.log(userId);
  const { loading, error, data } = useGetOrderList(userId);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Container>
      <Card className="m-4 p-1">
        <Card.Header>My Orders</Card.Header>
        <Card.Body>
          <Table className="table text-nowrap m-3 table-centered table-hover">
            <thead>
              <tr className="m-3">
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Order Status</th>
              </tr>
            </thead>

            {data.getAllOrdersForUser.map((order) => (
              <tr className="m-3">
                <td>{order.id}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyOrders;
