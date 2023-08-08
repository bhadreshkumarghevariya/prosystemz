import { Button, Container } from "react-bootstrap";
import Header from "../components/Header";
import Component from "../components/build-your-own/Component";
import BuildYourOwnPCHome from "./build-your-own/BuildYourOwnPCHome";
import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { useGetBYOCart } from "../hooks/useGetBYOCart";
import Cookies from "js-cookie";
import useGetShoppingCartByUserId from "../hooks/useGetShoppingCartByUserId";

const Home = (props) => {
  const { error, data, loading, refetch } = useGetBYOCart(props.userId);
  // const data = useGetBYOCart(props.userId);
  const shoppingCart = useGetShoppingCartByUserId(props.userId);

  if (props.isLoggedIn === true) {
    data &&
      data.getCart &&
      data.getCart.id &&
      Cookies.set("cartId", data.getCart.id);

    shoppingCart &&
      shoppingCart.shoppingCart &&
      shoppingCart.shoppingCart.id &&
      Cookies.set("shoppingCartId", shoppingCart.shoppingCart.id);
  }
  useEffect(() => {
    console.log("useEffect");
    console.log(props.isLoggedIn);
    if (props.isLoggedIn === false) {
      Cookies.remove("cartId");
      Cookies.remove("shoppingCartId");
    }
    refetch();
  }, [props.isLoggedIn]);
  // props.isLoggedIn &&
  //   data &&
  //   data.getCart.id &&
  //   Cookies.set("cartId", data.getCart.id);
  return (
    <>
      <Container className="text-center mt-5">
        <Link className="nav-link" to="/build-your-own">
          <PrimaryButton>Build Your Own Computer.</PrimaryButton>
        </Link>
      </Container>
    </>
  );
};

export default Home;
