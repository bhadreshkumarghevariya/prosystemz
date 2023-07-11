import { Container, Row, Col, Image, Table, Card } from "react-bootstrap";
import Header from "../components/Header";
import { useGetProductById } from "../hooks/useGetProductById";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import AddToBuildButton from "../components/AddToCartButton";

const ProductDetails = (props) => {
  const { productId } = useParams();
  const { error, data, loading } = useGetProductById(productId);
  if (loading) return <>loading....</>;
  if (error)
    return (
      <>
        something went wrong...
        {error.graphQLErrors.map(({ message }, i) => {
          <span key={i}>{message}</span>;
        })}
      </>
    );

  let isData;
  if (Object.keys(data.getProduct)) {
    console.log(data.getProduct);
    isData = <h1>Sorry.... There is no product Available for this type</h1>;
  }

  const renderProductDetails = () => {
    return Object.entries(data.getProduct.productDetails).map(
      ([key, value]) => (
        <tbody>
          <tr>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      )
    );
  };
  return (
    <>
      <Container>
        <Card className="m-3">
          <Card.Body>
            <Row>
              <Col>
                <Image
                  src={data.getProduct.imageURL}
                  className="m-4 p-3"
                  alt="ImageTest"
                  fluid
                />
              </Col>
              <Col className="p-5 mt-3">
                <div className="my-5 mx-xl-10">
                  <h1>{data.getProduct.productName}</h1>

                  <hr className="my-3" />

                  <div class="mb-5">
                    <h4 class="mb-1">
                      {/* $49.00{" "} */}
                      <span>$ 69.00</span>
                      {/* <span class="text-warning">(45% OFF)</span> */}
                    </h4>
                    <span>inclusive of all taxes</span>
                  </div>
                  <Row>
                    <Col md={6}>
                      <AddToBuildButton />
                    </Col>
                  </Row>
                  <div className="my-3">
                    <h4 className="mb-0">Product Description</h4>
                    <p className="my-3">
                      {data.getProduct.productShortDescription}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="p-4 m-2">
                <h3>Product Specifications</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Socket Type</th>
                      <th>Socket Name</th>
                    </tr>
                  </thead>
                  {renderProductDetails()}
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ProductDetails;
