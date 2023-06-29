import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuildYourOwnPCHome from "./pages/build-your-own/BuildYourOwnPCHome";
import ProductList from "./components/build-your-own/ProductList";
import CurrentBuild from "./pages/CurrentBuild";
import ProductDetails from "./pages/ProductDetails";
import SignupForm from "./pages/SignUpForm";
import LoginPage from "./pages/LoginPage";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <div className="App">
      <Router>
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
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
