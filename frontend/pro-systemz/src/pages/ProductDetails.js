import { Container, Row, Col, Image } from "react-bootstrap";
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
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Image src={data.getProduct.imageURL} alt="ImageTest" fluid />
          </Col>
          <Col>
            <span>
              <h3>{data.getProduct.productName}</h3>
            </span>
            <span>
              <h6>Price :{data.getProduct.price}</h6>
            </span>
            <span>
              Short Description: {data.getProduct.productShortDescription}
            </span>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default ProductDetails;
