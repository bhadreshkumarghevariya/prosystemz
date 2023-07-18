import { Button } from "react-bootstrap";
import { buttonStyle } from "../theme/styles";

const CheckoutButton = ({ onClick }) => {
  return (
    <div className="d-grid mb-2 mb-md-0">
      <Button style={buttonStyle} onClick={onClick}>
        {/* <i className="fe fe-shopping-cart me-2"></i> */}
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CheckoutButton;
