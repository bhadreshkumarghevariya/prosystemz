import { Container,  Nav} from "react-bootstrap";
import  Navbar  from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Pro Systemz</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#build-your-own">Build Your Own</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
