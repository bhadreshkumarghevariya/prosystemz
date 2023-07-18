import { Container, Table, Card } from "react-bootstrap";
import Header from "../components/Header";
import { useGetBYOCart } from "../hooks/useGetBYOCart";
import Cookies from "js-cookie";
import ProductListItem from "../components/build-your-own/ProductListItem";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddBuildToCartButton from "../components/AddBuildToCartButton";
import { useAddBuildToCart } from "../hooks/useAddBuildToCart";
import { useMutation } from "@apollo/client";
import { ADD_BUILD_TO_CART_MUTATION } from "../mutations/ADD_BUILD_TO_CART_MUTATION";

const CurrentBuild = (props) => {
  const location = useLocation();
  const [cartId, setCartId] = useState(Cookies.get("cartId"));
  const [createShoppingCartWithCartId] = useMutation(
    ADD_BUILD_TO_CART_MUTATION
  );

  console.log(props.userId);

  const { error, data, loading, refetch } = useGetBYOCart(cartId, props.userId);
  useEffect(() => {
    refetch();
  }, [location]);

  if (cartId === undefined) {
    return (
      <h1>Sorry.... There is no product Available in your current build</h1>
    );
  }

  const handleAddBuildToCart = () => {
    console.log("add build to cart");
    createShoppingCartWithCartId({
      variables: { cartId, userId: props.userId },
    })
      .then((response) => {
        console.log(response);
        Cookies.set(
          "shoppingCartId",
          response.data.createShoppingCartWithCartId
        );
        console.log("Cart created successfully!");
      })
      .catch((error) => {
        console.error("Error creating cart:", error);
        return;
      });
  };

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
          <Card.Footer>
            <AddBuildToCartButton onClick={handleAddBuildToCart} />
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default CurrentBuild;
