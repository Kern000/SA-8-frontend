import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import LandingPage from "./pages/landingPage";
import AddProduct from "./pages/AddProduct";
import DeleteProduct from "./pages/DeleteProduct";

// context
import ProductsContextData from "./context/ProductContext";

export default function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-md bg-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{color:"white"}}> View products </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add" style={{color:"white"}}>Add product </Link>
            </li>
          </ul>
        </nav>
      </div>
      <ProductsContextData>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/delete/:productId" element={<DeleteProduct />} />
        </Routes>
      </ProductsContextData>
    </Router>
  );
}
