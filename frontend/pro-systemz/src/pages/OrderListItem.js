import { Badge } from "react-bootstrap";

const OrderListItem = ({ order }) => {
  return (
    <tr>
      <td>{order.orderDate}</td>
      <td>
        <Badge bg="success"> {order.orderStatus}</Badge>
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
            console.log(e.target.value);
            // updateOrderStatus(order.id, e.target.value);
          }}
        >
          <option value="paid">paid</option>
          <option value="packed">packed</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
        </select>
      </td>
    </tr>
  );
};

export default OrderListItem;
