import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Form, Container, Card } from "react-bootstrap";
import FormControl from "../components/FormControls/FormControl";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { useCreatePayment } from "../hooks/useCreatePayment";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";

const Payment = (props) => {
  const navigate = useNavigate();
  const { checkoutId } = useParams();

  const userId = props.userId;
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const { createPayment, loading } = useCreatePayment();
  const { createOrder } = useCreateOrder();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you would typically handle form submission, e.g., send data to server

    const input = {
      cardNumber,
      cardExpiry,
      cardCVV,
      userId,
    };

    try {
      const result = await createPayment({ variables: { input } });

      const paymentId = result.data.createPayment.id;
      const orderInput = {
        userId,
        checkoutId,
        orderStatus: "PAID",
        orderDate: new Date().toISOString(),
        paymentId,
      };
      const orderResult = await createOrder({
        variables: { input: orderInput },
      });

      const orderId = orderResult.data.createOrder.id;

      orderId && navigate(`/my-orders`);
    } catch (error) {}
  };

  return (
    <Container>
      <Card style={{ width: "32rem" }} className="m-auto my-3 p-3">
        <Card.Header>Payment</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cardNumber">
              <FormControl
                type="text"
                placeholder="Card Number"
                label="Card Number"
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="cardExpiry">
              <FormControl
                type="text"
                placeholder="Card Expiry"
                label="Card Expiry"
                onChange={(e) => setCardExpiry(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="cardCVV">
              <FormControl
                type="text"
                placeholder="Card CVV"
                label="Card CVV"
                onChange={(e) => setCardCVV(e.target.value)}
                required
              />
            </Form.Group>
            <PrimaryButton type="submit" disabled={loading}>
              Pay
            </PrimaryButton>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Payment;
