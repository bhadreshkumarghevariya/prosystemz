import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuildYourOwnPCHome from "./pages/build-your-own/BuildYourOwnPCHome";
import ProductList from "./components/build-your-own/ProductList";
import CurrentBuild from "./pages/CurrentBuild";

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
          <Route path="/current-build" element={<CurrentBuild />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
