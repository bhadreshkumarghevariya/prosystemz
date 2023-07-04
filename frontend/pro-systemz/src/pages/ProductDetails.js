import { Container, Row, Col, Image, Table } from "react-bootstrap";
import Header from "../components/Header";
import { useGetProductById } from "../hooks/useGetProductById";
import { useParams } from "react-router-dom";

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
            <span>
              <h3>{data.getProduct.productName}</h3>
            </span>
            <hr />
            <span>
              <h2>${data.getProduct.price}</h2>
            </span>
            <span>
              Short Description: {data.getProduct.productShortDescription}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
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
      </Container>
    </>
  );
};

export default ProductDetails;
