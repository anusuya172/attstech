import { useState ,useEffect} from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col, Card, Alert, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Formik } from "formik";
import * as Yup from "yup";

const base_url = "http://localhost:8083";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long") 
    .required("Password is required")
});

const handleSubmit = async (values) => {
  try {
    const res = await axios.post(`${base_url}/api/auth/login`, values);
    localStorage.setItem("token", res.data.token);
    setMessage("Login successful");
    navigate("/product");
  } catch (err) {
    if (err.response && err.response.data) {
      setMessage(err.response.data.message || "Login failed");
    } else {
      setMessage("An error occurred during login");
    }
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token inside Login Page:", token);
  if (token) {
    navigate("/product");
  }
}, []);

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#F5EFE7" }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} sm={12}>
          <Card className="p-3" style={{ borderRadius: "20px", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)", backgroundColor: "#D8C4B6" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#213555" }}>Login</h2>

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
                      <Form.Label style={{ color: "#213555", fontWeight: "500" }}>Email</Form.Label>
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
                        style={{ padding: "15px", fontSize: "1rem", borderColor: "#4F709C" }}
                      />
                      {touched.email && errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                    </Form.Group>

              <Form.Group className="mb-4">
  <Form.Label style={{ color: "#213555", fontWeight: "500" }}>Password</Form.Label>
  <InputGroup>
    <Form.Control
      name="password"
      type={passwordVisible ? "text" : "password"}
      placeholder="Password"
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      isInvalid={touched.password && errors.password} 
      required
      className="rounded-pill shadow-sm"
      style={{
        padding: "15px",
        fontSize: "1rem",
        borderColor: "#4F709C",
        paddingRight: "40px",
      }}
    />
    <InputGroup.Text
      onClick={handlePasswordToggle}
      style={{
        cursor: "pointer",
        backgroundColor: "#F5EFE7",
        borderColor: "#4F709C",
        position: "absolute",
        right: "15px",
        top: "50%",
        transform: "translateY(-50%)",
        padding: "0.5rem",
        border: "none",
        borderRadius: "20px"
      }}
    >
      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
    </InputGroup.Text>
  </InputGroup>
 {touched.password && errors.password && (
  <Form.Control.Feedback type="invalid">
    {errors.password}
  </Form.Control.Feedback>
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
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>

              <a href="/register" className="d-block text-center mt-3" style={{ color: "#213555" }}>Sign Up</a>

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
