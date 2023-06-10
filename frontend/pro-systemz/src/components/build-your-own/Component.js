import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const Component = ({ productType }) => {
  const productTypeName = productType.productTypeName;
  const productTypeId = productType.id;

  return (
    <Link to={"/product-list/" + productTypeId}>
      <Card
        className="text-center m-auto my-4 text-center"
        style={{ width: "15rem", height: "15rem" }}
      >
        <Card.Body>
          <Card.Img variant="top"></Card.Img>
          <Card.Title>{productTypeName}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Component;
