import { Button } from "react-bootstrap";
import { primaryButtonStyle } from "../theme/styles";

const AddToBuildButton = ({ onClick }) => {
  return (
    <div className="d-grid mb-2 mb-md-0">
      <Button style={primaryButtonStyle} onClick={onClick}>
        {/* <i className="fe fe-shopping-cart me-2"></i> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-plus icon-xs mx-2"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add To Build
      </Button>
    </div>
  );
};

export default AddToBuildButton;
