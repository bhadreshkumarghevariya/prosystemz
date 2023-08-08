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
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { useAddCartToShoppingCart } from "../hooks/useAddCartToShoppingCart";
// import { useGetCartId } from "../hooks/useGetCartId";

const CurrentBuild = (props) => {
  const location = useLocation();
  const [cartId, setCartId] = useState(Cookies.get("cartId"));
  const [shoppingCartId, setShoppingCartId] = useState(
    Cookies.get("shoppingCartId")
  );
  const [createShoppingCartWithCartId] = useMutation(
    ADD_BUILD_TO_CART_MUTATION
  );
  const { addCartToShoppingCart } = useAddCartToShoppingCart();

  const { error, data, loading, refetch } = useGetBYOCart(props.userId);
  useEffect(() => {
    refetch();
  }, [location]);

  if (cartId === undefined) {
    return (
      <h1>Sorry.... There is no product Available in your current build</h1>
    );
  }

  const handleAddBuildToCart = () => {
    if (!shoppingCartId) {
      createShoppingCartWithCartId({
        variables: { cartId, userId: props.userId },
      })
        .then((response) => {
          Cookies.set(
            "shoppingCartId",
            response.data.createShoppingCartWithCartId
          );
          Cookies.remove("cartId");
        })
        .catch((error) => {
          console.error("Error creating cart:", error);
          return;
        });
    } else {
      // const result = addCartToShoppingCart.addCartToShoppingCart();
      // console.log("result", result);
      addCartToShoppingCart({
        variables: { cartId, userId: props.userId, shoppingCartId },
      }).then((response) => {
        console.log("response", response);
        Cookies.remove("cartId");
      });
    }
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

  let isData;
  if (data.getCart && Object.keys(data.getCart).length === 0) {
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
                {data.getCart &&
                  data.getCart.products.map((product) => {
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
            {/* <AddBuildToCartButton onClick={handleAddBuildToCart} /> */}
            <PrimaryButton onClick={handleAddBuildToCart} className="float-end">
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
                className="feather feather-plus icon-xs mx-2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Build To Cart
            </PrimaryButton>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default CurrentBuild;
