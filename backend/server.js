const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();  // This loads the variables from the .env file
const fs = require('fs');
const path = require('path');

const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({extended: true,limit: "10mb",parameterLimit: 50000,}));
const config = require("./Config/dbDependency");
const serverConfig = require("./Config/serverConfig");
const port = process.env.PORT || serverConfig.ServerPort;
const uploadPath = path.join(__dirname, 'uploads');
app.use("/uploads", express.static("uploads"));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const userRouter = require("./Page/Router/router");
const productRoutes = require("./Page/Router/product");

// Use routes
app.use("/api/auth", userRouter);
app.use("/api", productRoutes);


if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}



mongoose
.connect(config.dbURL, {useUnifiedTopology: true,useNewUrlParser: true,})
.then(() => {console.log("Connected to MongoDB");})
.catch((err) => {console.error("MongoDB connection error:", err);});
 
 

 



 
app.use("/api/v1/health", async (req, res) => {
  try {await mongoose.connection.db.command({ ping: 1 });res.json({status: "Database is healthy",health: "API Server is up & running",});
  } catch (error) {console.error("Database is not healthy:", error);res.status(500).json({ status: "Database is not healthy", error: error.message });}
});
 
 
 
setInterval(async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  console.log('Current Time:', new Date());
  console.log('Twenty-Four Hours Ago:', twentyFourHoursAgo);
  try {
    const result = await LoggingModel.deleteMany({ expirationTime: { $lt: twentyFourHoursAgo } });
    console.log('Logs older than 24 hours deleted:', result.deletedCount);
  } catch (error) {
    console.error('Error deleting logs:', error);
  }
}, 24 * 60 * 60 * 1000);
 
 
 
 
app.listen(port, () => {
  console.log("CONNECT Server is running on http://localhost: " + port);
});