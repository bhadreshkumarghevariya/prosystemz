import { Container, Nav, Image } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../logo.png";

const Header = ({ isLoggedIn, userType }) => {
  return (
    <>
      <Navbar className="shadow " bg="light">
        <Container>
          <Navbar.Brand className="font-weight-bold">
            <Link className="nav-link m-auto p-auto" to="/">
              <Image
                src={logo}
                height="25"
                className="d-inline-block align-top m-auto"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Item>
              <Link className="nav-link" to="/build-your-own">
                Build Your Own
              </Link>
            </Nav.Item>
            {isLoggedIn && (
              <Nav.Item>
                <Link className="nav-link" to="/current-build">
                  Current Build
                </Link>
              </Nav.Item>
            )}

            {isLoggedIn && userType === "Admin" && (
              <Nav.Item>
                <Link className="nav-link" to="/add-product">
                  Add Product
                </Link>
              </Nav.Item>
            )}
            {isLoggedIn && userType === "Admin" && (
              <Nav.Item>
                <Link className="nav-link" to="/customer-list">
                  User List
                </Link>
              </Nav.Item>
            )}
            {isLoggedIn && userType !== "Admin" && (
              <Nav.Item>
                <Link className="nav-link" to="/my-orders">
                  My Orders
                </Link>
              </Nav.Item>
            )}
            {isLoggedIn && userType === "Admin" && (
              <Nav.Item>
                <Link className="nav-link" to="/all-orders">
                  All Orders
                </Link>
              </Nav.Item>
            )}
          </Nav>

          {!isLoggedIn ? (
            <Nav className="ml-auto">
              <Nav.Item>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Item>
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link className="nav-link" to="/user-details">
                  Profile
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/shopping-cart">
                  Shopping Cart
                </Link>
              </Nav.Item>

              {userType === "Admin" && (
                <Nav.Item>
                  <Link className="nav-link" to="/add-product-type">
                    Add Product Type
                  </Link>
                </Nav.Item>
              )}
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
