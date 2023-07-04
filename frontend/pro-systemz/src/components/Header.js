import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import useLoggedInStatus from "../hooks/useLoggedInStatus";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_DETAILS } from "../mutations/GET_USER_DETAILS";

const Header = ({ isLoggedIn }) => {
  console.log("Header");

  return (
    <>
      <Navbar className="shadow mt-2" bg="light">
        <Container>
          <Navbar.Brand className="font-weight-bold">
            <Link className="nav-link" to="/">
              Pro Systemz
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

            {isLoggedIn && (
              <Nav.Item>
                <Link className="nav-link" to="/add-product">
                  Add Product
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
                <Link className="nav-link" to="/add-product-type">
                  Add Product Type
                </Link>
              </Nav.Item>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
