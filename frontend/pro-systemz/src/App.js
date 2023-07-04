import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import { useNavigate } from "react-router-dom";
import useLoggedInStatus from "./hooks/useLoggedInStatus";
import { Navigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuildYourOwnPCHome from "./pages/build-your-own/BuildYourOwnPCHome";
import ProductList from "./components/build-your-own/ProductList";
import CurrentBuild from "./pages/CurrentBuild";
import ProductDetails from "./pages/ProductDetails";
import SignupForm from "./pages/SignUpForm";
import LoginPage from "./pages/LoginPage";
import AddProduct from "./pages/AddProduct";
import AddProductType from "./pages/AddProductType";
import UserProfile from "./pages/UserProfile";
import LogoutPage from "./pages/LogOut";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
const PrivateRoute = ({ children, isLoggedIn, component }) => {
  return isLoggedIn ? component : <Navigate to="/login" />;
};

function App() {
  const isLoggedIn = useLoggedInStatus();
  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build-your-own" element={<BuildYourOwnPCHome />} />
          <Route
            path="/product-list/:productTypeName"
            element={<ProductList />}
          />
          <Route
            path="/current-build"
            element={<CurrentBuild />}
            key="current-build"
          />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />

          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />
          {/*Private Routes*/}
          <Route
            path="/user-details"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                component={<UserProfile />}
              />
            }
          />
          <Route
            path="/add-product"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                component={<AddProduct />}
              />
            }
          />
          <Route
            path="/add-product-type"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                component={<AddProductType />}
              />
            }
          />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
