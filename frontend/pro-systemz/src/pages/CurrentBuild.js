import { Container, Table, Card } from "react-bootstrap";
import Header from "../components/Header";
import { useGetBYOCart } from "../hooks/useGetBYOCart";
import Cookies from "js-cookie";
import ProductListItem from "../components/build-your-own/ProductListItem";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CurrentBuild = (props) => {
  const location = useLocation();
  const [cartId, setCartId] = useState(Cookies.get("cartId"));
  console.log(props.userId);

  const { error, data, loading, refetch } = useGetBYOCart(cartId, props.userId);
  useEffect(() => {
    refetch();
  }, [location]);

  if (loading) return <>loading....</>;
  if (error)
    return (
      <>
        something went wrong...
        {error.graphQLErrors.map(({ message }, i) => {
          return <span key={i}>{message}</span>;
        })}
      </>
    );
  if (data) {
    console.log(data);
  }
  let isData;
  if (Object.keys(data.getCart).length === 0) {
    isData = <h1>Sorry.... There is no product Available for this type</h1>;
  }
  return (
    <>
      <Container>
        <Card className="m-3">
          <Card.Header>
            <h3>Current Build</h3>
          </Card.Header>
          <Card.Body className="m-2">
            <Table className="table text-nowrap mb-0 table-centered table-hover">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>View Details</th>
                </tr>
              </thead>
              {isData}
              <tbody>
                {data.getCart.products.map((product) => {
                  return (
                    <ProductListItem
                      key={product.id}
                      productObject={product}
                      selectBtnIsHide="true"
                    />
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default CurrentBuild;
