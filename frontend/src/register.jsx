import { useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col, Card, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// Base URL for API
const base_url = "http://localhost:8083";

// Register form component
const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}/api/auth/register`, form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "linear-gradient(to right, #ff7e5f, #feb47b)" }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} sm={12}>
          <Card className="p-5" style={{ borderRadius: "20px", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" }}>Create an Account</h2>
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
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="rounded-pill shadow-sm"
                    style={{ padding: "15px", fontSize: "1rem" }}
                  />
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
                  Register
                </Button>
              </Form>

              {message && (
                <Alert variant={message.includes("success") ? "success" : "danger"} className="mt-4">
                  {message}
                </Alert>
              )}

              <div className="mt-4 text-center">
                <p>
                  Already have an account? <a href="/" style={{ color: "#feb47b" }}>Login</a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
