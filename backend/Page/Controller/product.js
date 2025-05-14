const Product = require("../Model/model").Product; 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);  
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });



const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category, manufacturingDate } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = new Product({
      name,
      price,
      stock,
      description,
      category,
      manufacturingDate,
      image
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Product not found" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category, manufacturingDate } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedFields = {
      name,
      price,
      stock,
      description,
      category,
      manufacturingDate,
    };

if (image) {
  updatedFields.image = image; 
}


    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product", details: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  upload,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
