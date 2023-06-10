import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuildYourOwnPCHome from "./pages/build-your-own/BuildYourOwnPCHome";
import ProductList from "./pages/build-your-own/ProductList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/build-your-own">
            <BuildYourOwnPCHome />
          </Route> */}

          <Route path="/" element={<Home />} />
          <Route path="/build-your-own" element={<BuildYourOwnPCHome />} />
          <Route
            path="/product-list/:productTypeName"
            element={<ProductList />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
