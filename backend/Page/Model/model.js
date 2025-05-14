const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String,
  category: String,
  manufacturingDate: Date,
  image: String, 
});

const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Product }; 
