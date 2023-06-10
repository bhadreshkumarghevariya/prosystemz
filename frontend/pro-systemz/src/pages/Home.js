import { Button, Container } from "react-bootstrap";
import Header from "../components/Header";
import Component from "../components/build-your-own/Component";
import BuildYourOwnPCHome from "./build-your-own/BuildYourOwnPCHome";
import { React } from "react";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Container className="text-center mt-5">
        <Button className="button buttonPrimary">
          Build Your Own Computer.
        </Button>
        <Component productType="MotherBoard" />
      </Container>
    </>
  );
};

export default Home;
