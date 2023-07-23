import { Button } from "react-bootstrap";
import { primaryButtonStyle } from "../../theme/styles";
const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button
      variant="primary"
      className="my-3 py-2 pr-5 pl-5"
      style={primaryButtonStyle}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
