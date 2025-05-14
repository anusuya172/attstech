const express = require("express");
const app = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../Controller/product');;
const upload = require("../../middleware/upload"); 
app.post("/products", upload.single("image"), createProduct);
app.get("/products",getProducts);
app.get("/products/:id",getProductById);
app.put("/products/:id", upload.single("image"),updateProduct);
app.delete("/products/:id",deleteProduct);

module.exports = app;
