import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import FormControl from "../components/FormControls/FormControl";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { useCreatePayment } from "../hooks/useCreatePayment";

const Payment = (props) => {
  const { checkoutId } = useParams();
  console.log(checkoutId);
  const userId = props.userId;
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const { createPayment, data, loading, error } = useCreatePayment();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you would typically handle form submission, e.g., send data to server
    console.log({ cardNumber, cardExpiry, cardCVV });
    const input = {
      cardNumber,
      cardExpiry,
      cardCVV,
      userId,
    };

    try {
      const result = await createPayment({ variables: { input } });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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
