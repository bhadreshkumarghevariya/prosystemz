import { Button, Container } from "react-bootstrap";
import Header from "../components/Header";
import Component from "../components/build-your-own/Component";
import BuildYourOwnPCHome from "./build-your-own/BuildYourOwnPCHome";
import { React } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";

const Home = () => {
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
