import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NZNQ6JFJfq9k7DY5gQBCxJy7C1febacW6bHZzqCqfBUNODuYDaBjoxIMFjZQY2BrkyKTOt5vrxJc7i4c3Ne6ZrV00Xes1Fj4Z"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const { checkoutId } = useParams();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="App">
      <h1>Stripe Payment Gateway</h1>
      {clientSecret && (
        <Card style={{ width: "32rem" }} className="m-auto p-3">
          <Card.Body>
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm checkoutId={checkoutId} />
            </Elements>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
