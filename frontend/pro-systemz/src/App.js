import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
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
import CustomerList from "./pages/CustomerList";
import React from "react";
import Header from "./components/Header";
import EditUser from "./pages/EditUser";
import ShoppingCart from "./pages/ShoppingCart";
import PaymentConfirmed from "./pages/PaymentConfirmed";
import DisplayAllOrders from "./pages/DisplayAllOrders";
import OrderDetails from "./pages/OrderDetails";
// import CheckOut from "./pages/Checkout";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";
import Cookies from "js-cookie";
const PrivateRoute = ({ children, isLoggedIn, component }) => {
  return isLoggedIn ? component : <Navigate to="/login" />;
};

function App() {
  const { isLoggedIn, data } = useLoggedInStatus();

  const userId = data && data.getUserDetails.id;
  Cookies.set("userId", userId);

  return (
    <div className="App">
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          userType={data && data.getUserDetails.userType.userTypeName}
        />
        <Routes>
          <Route
            path="/"
            element={<Home userId={userId} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/build-your-own" element={<BuildYourOwnPCHome />} />
          <Route
            path="/product-list/:productTypeName"
            element={<ProductList userId={userId} />}
          />
          <Route
            path="/current-build"
            element={<CurrentBuild userId={userId} />}
            key="current-build"
          />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />

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
            path="/customer-list"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                component={<CustomerList />}
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
          <Route
            path="/shopping-cart"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                component={<ShoppingCart userId={userId} />}
              />
            }
          />
          <Route
            path="/all-orders"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                component={<DisplayAllOrders userId={userId} />}
              />
            }
          />

          <Route
            path="/payment-confirmed/:?"
            element={<PaymentConfirmed userId={userId} />}
          />

          <Route path="/payment/:checkoutId" element={<Payment />} />
          <Route path="/edit-user/:userId" element={<EditUser />} />
          <Route path="/my-orders" element={<MyOrders userId={userId} />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
