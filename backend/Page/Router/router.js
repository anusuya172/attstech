const express = require("express");
const app = express.Router();
const { loginUser, registerUser } = require("../Controller/demo");

app.post("/login", loginUser);
app.post("/register", registerUser);
module.exports = app;
