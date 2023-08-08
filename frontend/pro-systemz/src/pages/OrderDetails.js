import { useParams } from "react-router-dom";
import useGetOrderDetails from "../hooks/useGetOrderDetails";
import { Container, Row, Card, Col } from "react-bootstrap";
import OrderItems from "./OrderItems";
const OrderDetails = () => {
  const { orderId } = useParams();
  const { data, loading, error } = useGetOrderDetails(orderId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const order = data && data.getOrderDetails;
  console.log(order);

  return (
    <Row className="m-4">
      <Container className="col-xl-10 col-lg-12 col-md-12 col-12 mb-2 px-5">
        {order && (
          <>
            <Row>
              <Col xs={6}>
                <Row>
                  <Card className="mb-5 p-0">
                    <Card.Header>
                      <h4 className="mb-0">Order Details</h4>
                    </Card.Header>
                    <Card.Body className="m-2">
                      <Row>
                        {/* <Row> */}
                        {order.user && (
                          <Col xs={6}>
                            <h5 className="text-uppercase">User Name</h5>
                            <p className="mt-2 mb-6">{order.user.username}</p>
                          </Col>
                        )}

                        {order.user && (
                          <Col xs={6}>
                            <h5 className="text-uppercase">Email</h5>
                            <p className="mt-2 mb-6">{order.user.email}</p>
                          </Col>
                        )}
                        {/* </Row> */}
                        {order.orderDate && (
                          <Col xs={6}>
                            <h5 className="text-uppercase">Order Date</h5>
                            <p className="mt-2 mb-6">{order.orderDate}</p>
                          </Col>
                        )}
                        {order.orderStatus && (
                          <Col xs={6}>
                            <h5 className="text-uppercase">Order Status</h5>
                            <p className="mt-2 mb-6">{order.orderStatus}</p>
                          </Col>
                        )}
                        {order.payment && (
                          <Col xs={6}>
                            <h5 className="text-uppercase">Payment</h5>
                            <p className="mt-2 mb-6">{order.payment}</p>
                          </Col>
                        )}
                      </Row>
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
              <Col xs={6}>
                <Card className="mb-5 ">
                  <Card.Header>
                    <h4 className="mb-0">Address Details</h4>
                  </Card.Header>
                  <Card.Body className="m-2">
                    <Row>
                      {order.checkout.address.addressLine1 && (
                        <Col xs={6}>
                          <h5 className="text-uppercase">Address Line 1</h5>
                          <p className="mt-2 mb-6">
                            {order.checkout.address.addressLine1}
                          </p>
                        </Col>
                      )}
                      {order.checkout.address.addressLine2 && (
                        <Col xs={6}>
                          <h5 className="text-uppercase">Address Line 2</h5>
                          <p className="mt-2 mb-6">
                            {order.checkout.address.addressLine2}
                          </p>
                        </Col>
                      )}
                      {order.checkout.address.city && (
                        <Col xs={6}>
                          <h5 className="text-uppercase">City</h5>
                          <p className="mt-2 mb-6">
                            {order.checkout.address.city}
                          </p>
                        </Col>
                      )}
                      {order.checkout.address.state && (
                        <Col xs={6}>
                          <h5 className="text-uppercase">State</h5>
                          <p className="mt-2 mb-6">
                            {order.checkout.address.state}
                          </p>
                        </Col>
                      )}
                      {order.checkout.address.zipCode && (
                        <Col xs={6}>
                          <h5 className="text-uppercase">Zip Code</h5>
                          <p className="mt-2 mb-6">
                            {order.checkout.address.zipCode}
                          </p>
                        </Col>
                      )}
                      {order.checkout.address.country && (
                        <Col xs={6}>
                          <h5 className="text-uppercase">Country</h5>
                          <p className="mt-2 mb-6">
                            {order.checkout.address.country}
                          </p>
                        </Col>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-3">
              <OrderItems
                shoppingCartId={order.checkout.shoppingCart}
                userId={order.user.id}
              />
            </Row>
          </>
        )}
      </Container>
    </Row>
  );
};

export default OrderDetails;
