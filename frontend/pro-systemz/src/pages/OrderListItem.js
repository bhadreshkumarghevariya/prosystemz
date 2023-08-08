import { Badge } from "react-bootstrap";
import { useState } from "react";
import useUpdateOrderStatus from "../hooks/useUpdateOrderStatus";
import DetailsButton from "../components/DetailsButton";
import { Link } from "react-router-dom";

const OrderListItem = ({ order }) => {
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const { updateOrderStatus } = useUpdateOrderStatus();

  const handleUpdateOrderStatus = (status) => {
    console.log(status);
    // updateOrderStatus(orderId, status);
    const result = updateOrderStatus({
      variables: {
        orderId: order.id,
        status: status,
      },
    });
    result.then((resolvedData) => {
      console.log(resolvedData.data.updateOrderStatus.orderStatus);
      setOrderStatus(status);
    });
  };
  return (
    <tr>
      <td>{order.orderDate}</td>
      <td>
        <Badge bg="success"> {orderStatus}</Badge>
      </td>
      <td>{order.payment}</td>
      <td>{order.checkout.id}</td>
      <td>{order.user?.email ? order.user.email : ""}</td>
      {/* dropdown to update order status. status are paid, packed, shipped, delivered. */}
      <td>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            handleUpdateOrderStatus(e.target.value);
          }}
          value={orderStatus}
        >
          <option value="Paid">paid</option>
          <option value="Packed">packed</option>
          <option value="Shipped">shipped</option>
          <option value="Delivered">delivered</option>
        </select>
      </td>
      <td>
        <Link to={`/order-details/${order.id}`}>
          <DetailsButton />
        </Link>
      </td>
    </tr>
  );
};

export default OrderListItem;
