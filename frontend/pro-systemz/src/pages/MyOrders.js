const MyOrders = (props) => {
  return (
    <div className="my-orders">
      <h1>My Orders</h1>
      {props.userId}
    </div>
  );
};

export default MyOrders;
