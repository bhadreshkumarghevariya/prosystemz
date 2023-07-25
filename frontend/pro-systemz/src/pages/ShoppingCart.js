import { Container, Table, Card, Row, Col, Form } from "react-bootstrap";

import Cookies from "js-cookie";
import ProductListItem from "../components/build-your-own/ProductListItem";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useMutation } from "@apollo/client";
// import { ADD_BUILD_TO_CART_MUTATION } from "../mutations/ADD_BUILD_TO_CART_MUTATION";
import { useGetShoppingCart } from "../hooks/useGetShoppingCart";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

import UserDetails from "../components/UserDetails";
import FormControl from "../components/FormControls/FormControl";

import { CREATE_CHECKOUT_MUTATION } from "../mutations/CREATE_CHECKOUT_MUTATION";

const ShoppingCart = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [shoppingCartId] = useState(Cookies.get("shoppingCartId"));
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  //   const [cartSubTotal, setCartSubTotal] = useState(0);
  // let cartSubTotal = 0;
  const [cartSubTotal] = useState(0);
  let tempCartSubTotal = 0;
  // const [createShoppingCartWithCartId] = useMutation(
  //   ADD_BUILD_TO_CART_MUTATION
  // );
  const [checkout, { data: checkoutData }] = useMutation(
    CREATE_CHECKOUT_MUTATION
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

  const handleCheckout = async (e) => {
    e.preventDefault();
    console.log("checkout");
    console.log(addressLine1);
    console.log(addressLine2);
    console.log(city);
    console.log(state);
    console.log(zipCode);
    console.log(country);
    console.log(shoppingCartId);
    console.log(props.userId);
    const result = await checkout({
      variables: {
        userId: props.userId,
        address: {
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: city,
          state: state,
          zipCode: zipCode,
          country: country,
        },
        shoppingCartId: shoppingCartId,
      },
    });
    console.log(result);
    console.log(result.data.createCheckout.id);
    result.data.createCheckout.id &&
      navigate("/payment/" + result.data.createCheckout.id);
    if (checkoutData) {
      console.log(checkoutData);
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col xs={9}>
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
                      <th>Price</th>
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
                                {cart.cartName
                                  ? cart.cartName
                                  : "Personal Build"}
                              </h5>
                            </td>
                          </tr>
                          {cart.products.map((product) => {
                            tempCartSubTotal = tempCartSubTotal + product.price;
                            console.log(cartSubTotal);
                            return (
                              <ProductListItem
                                key={product.id}
                                productObject={product}
                                selectBtnIsHide="true"
                                showProductDetails="false"
                                showProductType="false"
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
          </Col>
          <Col xs={3}>
            {/* Card To show cart details like subtotal no use of table*/}
            <Card className="m-3">
              <Card.Header>
                <Card.Title>Details</Card.Title>
              </Card.Header>
              <Card.Body className="m-2">
                <h6>Subtotal: ${tempCartSubTotal}</h6>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <UserDetails />
        {/*Card to show user details*/}
        <Card className="m-3">
          <Card.Header>
            <Card.Title>Shipping Address</Card.Title>
          </Card.Header>
          <Card.Body className="m-2">
            {/* form to take shipping address  React-Bootstrap*/}
            <Form className="m-2" onSubmit={handleCheckout}>
              <Form.Group controlId="addressLine1">
                <FormControl
                  type="text"
                  placeholder="Address Line 1"
                  label="Address Line 1"
                  onChange={(e) => setAddressLine1(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="addressLine2">
                <FormControl
                  type="text"
                  placeholder="Address Line 2"
                  label="Address Line 2"
                  onChange={(e) => setAddressLine2(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="city">
                <FormControl
                  type="text"
                  placeholder="City"
                  label="City"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="state">
                <FormControl
                  type="text"
                  placeholder="State"
                  label="State"
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="zipCode">
                <FormControl
                  type="text"
                  placeholder="Zip Code"
                  label="Zip Code"
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="country">
                <FormControl
                  type="text"
                  placeholder="Country"
                  label="Country"
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </Form.Group>
              <PrimaryButton
                className="d-grid mb-2 mb-md-0 float-end"
                type="submit"
              >
                Proceed to Checkout
              </PrimaryButton>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ShoppingCart;
