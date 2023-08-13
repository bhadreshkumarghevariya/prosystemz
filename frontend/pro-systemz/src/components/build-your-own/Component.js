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
        style={{ width: "10rem", height: "10rem" }}
      >
        <Card.Body className="byo-component-card-body">
          <Card.Img
            className="rounded-lg card-img"
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
