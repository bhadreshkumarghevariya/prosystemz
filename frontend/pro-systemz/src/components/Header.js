import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Pro Systemz</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Item>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/build-your-own">
                Build Your Own
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/current-build">
                Current Build
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/add-product">
                Add Product
              </Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Item>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
