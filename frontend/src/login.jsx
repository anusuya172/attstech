import { useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col, Card, Alert, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


// Base URL for API
const base_url = "http://localhost:8083";

// Login form component
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);  // Password visibility state
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);  // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful");
      navigate("/home");  // Redirect to home page on success
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "linear-gradient(to right, #ff7e5f, #feb47b)" }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} sm={12}>
          <Card className="p-5" style={{ borderRadius: "20px", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" }}>Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#333", fontWeight: "500" }}>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="rounded-pill shadow-sm"
                    style={{ padding: "15px", fontSize: "1rem" }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#333", fontWeight: "500" }}>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="rounded-pill shadow-sm"
                      style={{ padding: "15px", fontSize: "1rem" }}
                    />
                    <InputGroup.Text onClick={handlePasswordToggle} style={{ cursor: "pointer" }}>
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-3 rounded-pill"
                  style={{
                    backgroundColor: "#feb47b",
                    borderColor: "#feb47b",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#ff7e5f")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#feb47b")}
                >
                  Login
                </Button>
              </Form>
              <a href="/register" className="d-block text-center mt-3">Sign Up</a>
              {message && (
                <Alert variant={message === "Login successful" ? "success" : "danger"} className="mt-4">
                  {message}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
