Task Jewellery Product Management System..
A full-stack web application to manage jewellery products including features for adding viewing, editing and 
deleting product records. Built using the MERN stack with a focus on efficient product tracking and responsive design.

Tech Stack
Frontend:
 React.js
 Bootstrap 5
 Axios (for API calls)
React Router DOM

Backend:
 Node.js
 Express.js
 MongoDB (via Mongoose)
 dotenv (for environment configuration)
 CORS

Features Implemented

Frontend (React.js + Bootstrap)
Responsive UI using Bootstrap Grid System
Login & Register Pages
authentication forms for login and user registration and Form validation for required fields
On successful login, users are redirected to the product management dashboard
Product Listing Page
Fetches all products from backend
Displays product name, image, price, and category
Table Sorting by clicking on headers (price, category, etc.)
Search & Filter
Keyword-based search
Filter by category
Add Product Form
Fields: name, description, category, price, stock count, image URL
Validates all required fields before submission
Edit Product Modal
Opens with selected product’s data pre-filled
Allows specific field updates
Delete Functionality
Prompts user for deletion

2. Backend (Node.js + Express + MongoDB)
Authentication
Created separate routes for login and register
Passwords hashed before storing
Simple JWT or session-based login (based on your implementation)
Protected routes for product CRUD accessible only after login
Product Model (Mongoose Schema)
Fields: name, description, price, category, imageUrl, stock, createdAt
RESTful API Endpoints
POST /api/auth/register – Register new user
POST /api/auth/login – Login and receive token/session
GET /api/products – Get all products
GET /api/products/:id – Get product by ID
POST /api/products – Create product (protected)
PUT /api/products/:id – Update product (protected)
DELETE /api/products/:id – Delete product (protected)

Middleware
Auth middleware to protect routes
Error handling
CORS for client-server communication
MongoDB Integration
Mongoose for schema and database interaction
 
--How to Run the Project--

cd frontend
npm install
npm run dev

cd backend
npm install
npm start


