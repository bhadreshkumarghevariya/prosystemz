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
import { useGetShoppingCart } from "../hooks/useGetShoppingCart";
import CheckoutButton from "../components/CheckoutButton";

const ShoppingCart = (props) => {
  const location = useLocation();
  const [shoppingCartId, setShoppingCartId] = useState(
    Cookies.get("shoppingCartId")
  );
  //   const [cartSubTotal, setCartSubTotal] = useState(0);
  let cartSubTotal = 0;
  const [productList, setProductList] = useState([]);
  const [createShoppingCartWithCartId] = useMutation(
    ADD_BUILD_TO_CART_MUTATION
  );

  console.log(props.userId);

  const { error, data, loading, refetch } = useGetShoppingCart(
    shoppingCartId,
    props.userId
  );
  useEffect(() => {
    refetch();
  }, [location]);

  if (shoppingCartId === undefined) {
    return (
      <h1>Sorry.... There is no product Available in your current build</h1>
    );
  }

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
    console.log(data.getShoppingCart);
    console.log(
      data.getShoppingCart.carts.map((cart) =>
        cart.products.map((product) => product.productName)
      )
    );
  }
  let isData;
  if (Object.keys(data.getShoppingCart).length === 0) {
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
                {data.getShoppingCart.carts.map((cart) => {
                  return (
                    <>
                      <tr>
                        <td colSpan="6">
                          <h5>
                            {cart.cartName ? cart.cartName : "Personal Build"}
                          </h5>
                        </td>
                      </tr>
                      {cart.products.map((product) => {
                        cartSubTotal = cartSubTotal + product.price;
                        console.log(cartSubTotal);
                        return (
                          <ProductListItem
                            key={product.id}
                            productObject={product}
                            selectBtnIsHide="true"
                          />
                        );
                      })}
                    </>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
        {/* Card To show cart details like subtotal no use of table*/}
        <Card className="m-3">
          <Card.Header>
            <Card.Title>Details</Card.Title>
          </Card.Header>
          <Card.Body className="m-2">
            <h6>Subtotal: ${cartSubTotal}</h6>
          </Card.Body>
          <Card.Footer>
            <CheckoutButton />
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default ShoppingCart;
