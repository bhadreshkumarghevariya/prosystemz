import Cookies from "js-cookie";

const CheckOut = (props) => {
  const shoppingCartId = Cookies.get("shoppingCartId");
  const userId = props.userId;
  console.log("shopping cart" + shoppingCartId);
  console.log("user" + userId);

  // console.log(props);
  return (
    <div>
      <h1>CheckOut</h1>
    </div>
  );
};

export default CheckOut;
