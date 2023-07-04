import { Col, Row, Container } from "react-bootstrap";
import Header from "../../components/Header";
import { useProductType } from "../../hooks/useProductType";
import Component from "../../components/build-your-own/Component";

const BuildYourOwnPCHome = () => {
  const { error, data, loading } = useProductType();
  console.log(data);
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

  return (
    <>
      <Container className="text-center mt-5">
        BUILD YOUR OWN PC
        <Row>
          {data.getProductType.map((productType) => {
            return (
              <Col className="text-center" sm={4} key={productType.id}>
                <Component
                  key={productType.id}
                  id={productType.id}
                  productType={productType}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default BuildYourOwnPCHome;
