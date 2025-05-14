import { useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col, Card, Alert, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const base_url = "http://localhost:8083";

const Register = () => {
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
const navigate = useNavigate();

  const validationSchema = Yup.object({
email: Yup.string()
  .matches(
    /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
    "Email must be a valid format (e.g., anu@example.com)"
  )
  .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${base_url}/api/auth/register`, values);
      setMessage(res.data.message);
        setTimeout(() => {
      navigate("/");
    }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#F5EFE7" }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} sm={12}>
          <Card className="p-3" style={{ borderRadius: "20px", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",background:"#D8C4B6" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#213555" }}>Create an Account</h2>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label style={{ color: "#333", fontWeight: "500" }}>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                        required
                        className="rounded-pill shadow-sm"
                        style={{ padding: "15px", fontSize: "1rem" }}
                      />
                      {touched.email && errors.email && (
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

<Form.Group className="mb-4">
  <Form.Label style={{ color: "#213555", fontWeight: "500" }}>
    Password
  </Form.Label>

  {/* Wrap input + icon together */}
  <div style={{ position: "relative" }}>
    <Form.Control
      name="password"
      type={passwordVisible ? "text" : "password"}
      placeholder="Create a password"
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      isInvalid={touched.password && errors.password}
      required
      className="rounded-pill shadow-sm"
      style={{
        padding: "15px",
        fontSize: "1rem",
        paddingRight: "45px",
        borderColor: "#4F709C",
      }}
    />

    <span
      onClick={togglePasswordVisibility}
      style={{
        position: "absolute",
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        cursor: "pointer",
        backgroundColor: "#F5EFE7",
        padding: "0.5rem",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #4F709C",
      }}
    >
      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  {touched.password && errors.password && (
    <div
      style={{
        color: "#dc3545",
        fontSize: "0.875rem",
        marginTop: "5px",
        paddingLeft: "10px",
      }}
    >
      {errors.password}
    </div>
  )}
</Form.Group>




                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-3 rounded-pill"
                      style={{
                        backgroundColor: "#4F709C",
                        borderColor: "#4F709C",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#213555")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#4F709C")}
                    >
                      Register
                    </Button>
                  </Form>
                )}
              </Formik>

              {message && (
                <Alert variant={message.includes("success") ? "success" : "danger"} className="mt-4">
                  {message}
                </Alert>
              )}

              <div className="mt-4 text-center">
                <p>
                  Already have an account? <a href="/" style={{ color: "#4F709C" }}>Login</a>
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
