const User = require("../Model/model"); // Ensure correct path to model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      // Directly compare the entered password with the stored password (no bcrypt comparison)
      if (password !== user.password) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ token, email: user.email });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  

// Register User
const registerUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      // Save the password as is (no hashing)
      const newUser = new User({ email, password }); // Directly store the password
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
module.exports = { loginUser, registerUser };
