import { Container, Table } from "react-bootstrap";
import Header from "../components/Header";
import { useGetBYOCart } from "../hooks/useGetBYOCart";
import Cookies from "js-cookie";
import ProductListItem from "../components/build-your-own/ProductListItem";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CurrentBuild = (props) => {
  const location = useLocation();
  const [cartId, setCartId] = useState(Cookies.get("cartId"));

  const { error, data, loading, refetch } = useGetBYOCart(cartId);
  useEffect(() => {
    refetch();
  }, [location]);

  if (loading) return <>loading....</>;
  if (error)
    return (
      <>
        <Header></Header>
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
      <Header></Header>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          {isData}
          <tbody>
            {data.getCart.map((product) => {
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
      </Container>
    </>
  );
};

export default CurrentBuild;
