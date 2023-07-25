import { Button, Container } from "react-bootstrap";
import Header from "../components/Header";
import Component from "../components/build-your-own/Component";
import BuildYourOwnPCHome from "./build-your-own/BuildYourOwnPCHome";
import { React } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { useGetBYOCart } from "../hooks/useGetBYOCart";
import Cookies from "js-cookie";

const Home = (props) => {
  console.log(props);
  const { error, data, loading, refetch } = useGetBYOCart(props.userId);
  // const data = useGetBYOCart(props.userId);
  console.log(props);
  props.isLoggedIn && console.log(props.isLoggedIn);
  if (props.isLoggedIn === true) {
    data && data.getCart.id && Cookies.set("cartId", data.getCart.id);
  }
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
