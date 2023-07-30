import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCreateOrder } from "../hooks/useCreateOrder";
import Cookies from "js-cookie";
import { Container } from "react-bootstrap";

const PaymentConfirmed = (props) => {
  //   const { payment_intent } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const payment_intent = searchParams.get("payment_intent");
  console.log("payment_intent", payment_intent);
  const paymentId = payment_intent;
  const userId = props.userId;
  console.log("userId", userId);
  const checkoutId = Cookies.get("checkoutId");
  const { createOrder } = useCreateOrder();
  const [orderId, setOrderId] = useState("");

  const handleOrderCreation = async () => {
    const orderInput = {
      userId,
      checkoutId,
      orderStatus: "PAID",
      orderDate: new Date().toISOString(),
      paymentId,
    };
    console.log("orderInput", orderInput);
    const orderResult = await createOrder({
      variables: { input: orderInput },
    });

    setOrderId(orderResult.data.createOrder.id);
    // orderId = orderResult.data.createOrder.id;
    console.log("orderId", orderId);
  };
  useEffect(() => {
    userId && handleOrderCreation();
  }, [userId]);
  return (
    <Container>
      <div className="m-4">
        <h1>Payment Confirmed</h1>
        <h3>Your Order Id is :- {orderId}</h3>
      </div>
    </Container>
  );
};

export default PaymentConfirmed;
