import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const Component = ({ productType }) => {
  const productTypeName = productType.productTypeName;
  const productTypeId = productType.id;
  const imageURL = productType.imageURL;

  return (
    <Link to={"/product-list/" + productTypeId}>
      <Card
        className="text-center m-auto my-4 text-center"
        style={{ width: "20rem", height: "20rem" }}
      >
        <Card.Body className="custom-card-body">
          <Card.Img
            className="p-4 m-4 rounded-lg"
            variant="top"
            src={imageURL}
          ></Card.Img>
          <Card.Title>{productTypeName}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Component;
