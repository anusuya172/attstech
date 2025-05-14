import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Modal,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../productform/form.css";
import NavBar from "../navbar";

const base_url = "http://localhost:8083/api/products";

const getValidationSchema = (existingImage) =>
  Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    manufacturingDate: Yup.date().required("Manufacturing Date is required"),
    image: Yup.mixed().test(
      "image-required",
      "Product image is required",
      function (value) {
        const { path, createError } = this;
        if (!value && !existingImage) {
          return createError({ path, message: "Product image is required" });
        }
        return true;
      }
    ),
  });

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    manufacturingDate: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const fetchProducts = async () => {
    try {
      const res = await axios.get(base_url);
      setProducts(res.data);
        setFilteredProducts(res.data); 
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formDataToSend = new FormData();
    for (const key in values) {
      if (values[key]) {
        formDataToSend.append(key, values[key]);
      }
    }

    try {
      if (isUpdateMode) {
        await axios.put(`${base_url}/${selectedProductId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product updated successfully");
      } else {
        await axios.post(base_url, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product added successfully");
      }
      setShowModal(false);
      fetchProducts();
      resetForm();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error in submitting data");
      console.error(err);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEdit = (product) => {
    const formattedDate = product.manufacturingDate
      ? new Date(product.manufacturingDate).toISOString().split("T")[0]
      : "";

    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: product.category,
      manufacturingDate: formattedDate,
      image: product.image || null,
    });

    setExistingImage(product.image);
    setSelectedProductId(product._id);
    setIsUpdateMode(true);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${base_url}/${productId}`);
      setMessage("Product deleted successfully");
      fetchProducts();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error deleting product");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      stock: "",
      description: "",
      category: "",
      manufacturingDate: "",
      image: null,
    });
    setIsUpdateMode(false);
    setSelectedProductId(null);
    setExistingImage(null);
  };
const handleAddProduct = () => {
  resetForm(); 
  setShowModal(true); 
};
const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.price.toString().includes(query) ||
          product.stock.toString().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };
  const handlePageChange = (page) => {
  setCurrentPage(page);
};

    const filteredProducts = products.filter((product) =>
    Object.values(product)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )
   .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
 
    <Container className=" min-vh-100" style={{marginTop:"9%"}} >
      <Row className="justify-content-between align-items-center mb-4">
        <Col><h2 style={{color:"#213555",fontWeight:700}}>Product Management</h2></Col>
        <Col className="text-end">
<Button
  style={{ background: "#4F709C", border: "none", fontSize: "16px" }}
  onClick={() => {
    resetForm(); 
    setShowModal(true); 
  }}
>
  + Add Product
</Button>
        </Col>
      </Row>
 <Row className="mb-4 ">
        <Col>
          <InputGroup >
            <InputGroup.Text  style={{background:"#4F709C",color:"white",padding:"13px"}}>Search</InputGroup.Text>
            <Form.Control
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by name, price, stock, category, description"
            />
          </InputGroup>
        </Col>
      </Row>  
      {message && <Alert variant="info">{message}</Alert>}

      <div className="table-responsive">
        <Table striped bordered hover className="rounded shadow" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <thead >
            <tr style={{backgroundColor:"#D8C4B6"}}>
              <th style={{ padding: "15px",backgroundColor:"#D8C4B6"}}>Name</th>
              <th style={{ padding: "15px",backgroundColor:"#D8C4B6"}}>Price</th>
              <th style={{ padding: "15px",backgroundColor:"#D8C4B6"}}>Stock</th>
              <th style={{ padding: "15px",backgroundColor:"#D8C4B6"}}>Category</th>
              <th style={{ padding: "15px",backgroundColor:"#D8C4B6",textAlign: "center"}}>Image</th>
              <th style={{ padding: "15px",backgroundColor:"#D8C4B6",textAlign: "center"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
             {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td style={{ padding: "15px"}}>{product.name}</td>
                <td style={{ padding: "15px"}}>{product.price}</td>
                <td style={{ padding: "15px"}}>{product.stock}</td>
                <td style={{ padding: "15px"}}>{product.category}</td>
                <td style={{ textAlign: "center", paddingTop: "10px" }}>
                  <img
                    src={`http://localhost:8083/uploads/${product.image}`}
                    alt={product.name}
                    className="product-image"
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}

                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <Button
                  
                    className="btn12 mt-2"
                     style={{ width: "80px",marginRight:"10px",background:"#213555",border:"none"}}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                   
                    className="btn13 mt-2"
                     style={{ width: "80px",background:"#D8C4B6",border:"none",color:"black" }}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
<div className="d-flex justify-content-center mt-5 mb-4">
  <nav aria-label="Page navigation">
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <Button
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            backgroundColor: currentPage === 1 ? "#f0f0f0" : "#D8C4B6",
            color: currentPage === 1 ? "#888" : "#213555",
            border: "1px solid #ccc",
            borderRadius: "50px",
            padding: "10px 15px",
            fontWeight: "600",
            fontSize: "16px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
        >
          Previous
        </Button>
      </li>

      {[...Array(totalPages)].map((_, index) => (
        <li
          key={index}
          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
          style={{ margin: "0 5px" }}
        >
          <Button
            className="page-link"
            onClick={() => handlePageChange(index + 1)}
            style={{
              backgroundColor: currentPage === index + 1 ? "#213555" : "#f0f0f0",
              color: currentPage === index + 1 ? "#fff" : "#213555",
              border: "1px solid #ccc",
              borderRadius: "50px",
              padding: "10px 15px",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            {index + 1}
          </Button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <Button
          className="page-link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: currentPage === totalPages ? "#f0f0f0" : "#D8C4B6",
            color: currentPage === totalPages ? "#888" : "#213555",
            border: "1px solid #ccc",
            borderRadius: "50px",
            padding: "10px 15px",
            fontWeight: "600",
            fontSize: "16px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
        >
          Next
        </Button>
      </li>
    </ul>
  </nav>
</div>




      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }}>
        <Modal.Header style={{background:"#213555",color:"#F5EFE7"}}  closeButton>
          <Modal.Title style={{color:"#F5EFE7",fontWeight:700}} >{isUpdateMode ? "Edit Product" : "Add Product"}</Modal.Title>
       
       
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize
            initialValues={formData}
            validationSchema={getValidationSchema(existingImage)}
            onSubmit={handleSubmit}
            
          >
            {({ setFieldValue }) => (
              <FormikForm>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"15px"}}>Product Name<span style={{color:"red"}}>*</span></Form.Label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"15px"}}>Price<span style={{color:"red"}}>*</span></Form.Label>
                  <Field type="number" name="price" className="form-control" />
                  <ErrorMessage name="price" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"15px"}}>Stock<span style={{color:"red"}}>*</span></Form.Label>
                  <Field type="number" name="stock" className="form-control" />
                  <ErrorMessage name="stock" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"15px"}}>Description<span style={{color:"red"}}>*</span></Form.Label>
                  <Field as="textarea" name="description" className="form-control" />
                  <ErrorMessage name="description" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"15px"}}>Category<span style={{color:"red"}}>*</span></Form.Label>
                  <Field type="text" name="category" className="form-control" />
                  <ErrorMessage name="category" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"15px"}}>Manufacturing Date<span style={{color:"red"}}>*</span></Form.Label>
                  <Field type="date" name="manufacturingDate" className="form-control" />
                  <ErrorMessage name="manufacturingDate" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontSize:"15px"}}>Product Image<span style={{color:"red"}}>*</span></Form.Label>
                  {isUpdateMode && existingImage && (
                    <div className="mb-2">
                      <img
                        src={`http://localhost:8083/uploads/${existingImage}`}
                        alt="Current"
                        className="product-preview"
                       style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}

                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("image", file);
                      if (file) setExistingImage(null);
                    }}
                  />
                  <ErrorMessage name="image" component="div" className="text-danger" />
                </Form.Group>

                <Button style={{background:"#213555",border:"none"}} type="submit">
                  {isUpdateMode ? "Update Product" : "Add Product"}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
    </>
  );
};

export default ProductManagement;