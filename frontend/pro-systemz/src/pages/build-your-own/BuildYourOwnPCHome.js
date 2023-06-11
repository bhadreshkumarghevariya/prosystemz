import { Col, Row, Container } from "react-bootstrap";
import Header from "../../components/Header";
import { useProductType } from "../../hooks/useProductType";
import Component from "../../components/build-your-own/Component";

const BuildYourOwnPCHome = () => {
  const { error, data, loading } = useProductType();
  if (loading) return <>loading....</>;
  if (error)
    return (
      <>
        <Header></Header>
        something went wrong...
        {error.graphQLErrors.map(({ message }, i) => {
          <span key={i}>{message}</span>;
        })}
      </>
    );

  return (
    <>
      <Header></Header>
      <Container className="text-center mt-5">
        BUILD YOUR OWN PC
        <Row>
          {data.getProductType.map((productType) => {
            return (
              <>
                <Col className="text-center" sm={4}>
                  <Component
                    key={productType.id}
                    id={productType.id}
                    productType={productType}
                  />
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default BuildYourOwnPCHome;
