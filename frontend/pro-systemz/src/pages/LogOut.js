import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_DETAILS } from "../mutations/GET_USER_DETAILS";
import Cookies from "js-cookie";

const LogoutPage = (props) => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_USER_DETAILS);
  useEffect(() => {
    handleLogout(); // Call the logout function when the component renders
  }, []);

  const handleLogout = () => {
    // Clear user's login status (e.g., remove token from localStorage)
    localStorage.removeItem("token");

    navigate("/", { replace: true });

    //clear  cartId cookies react
    Cookies.remove("cartId");

    Cookies.remove("shoppingCartId");

    // Reload the entire application after a delay of 500 milliseconds
    setTimeout(() => {
      window.location.reload();
    }, 2);
  };

  return (
    <div>
      <h2>Logout Page</h2>
    </div>
  );
};

export default LogoutPage;
