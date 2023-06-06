import { Card } from "react-bootstrap";

const Component = ({ productType }) => {
  const productTypeName = productType;
  return (
    <Card
      className="text-center m-auto my-4 text-center"
      style={{ width: "15rem", height: "15rem" }}
    >
      <Card.Body>
        <Card.Img variant="top"></Card.Img>
        <Card.Title>{productTypeName}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Component;
