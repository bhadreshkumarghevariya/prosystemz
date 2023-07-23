import { Container, Row, Col, Image, Table, Card } from "react-bootstrap";
import Header from "../components/Header";
import { useGetProductById } from "../hooks/useGetProductById";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import AddToBuildButton from "../components/AddToCartButton";
import PrimaryButton from "../components/Buttons/PrimaryButton";

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

                  <div className="mb-5">
                    <h4 className="mb-1">
                      {/* $49.00{" "} */}
                      <span>$ 69.00</span>
                      {/* <span className="text-warning">(45% OFF)</span> */}
                    </h4>
                    <span>inclusive of all taxes</span>
                  </div>
                  <Row>
                    <Col md={6}>
                      <PrimaryButton>
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
                          className="feather feather-plus icon-xs mx-1"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add To Build
                      </PrimaryButton>
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
