import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login"; // Import your Login component
import Register from "./register"; // Import your Register component (Sign Up page)

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route path="/" element={<Login />} />
        {/* Route for Register */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
