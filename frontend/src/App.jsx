import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import ProductManagement from "./productform/form";
import Layout from "./layout";
import PrivateRoute from "./privateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
 <Route
            path="product"
            element={
              <PrivateRoute>
                <ProductManagement />
              </PrivateRoute>
            }
          />        </Route>
      </Routes>
    </Router>
  );
}

export default App;
