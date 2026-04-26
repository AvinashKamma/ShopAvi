const express = require('express');
const dotenv = require('dotenv');
dotenv.config();                        // Load environment variables from .env file (should be always on top)
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/database');
const {errorHandler} = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Create a application web server
const app = express();

// Middewares
app.use(express.json());    // Middleware to parse JSON bodies from incoming requests
app.use(cookieParser());    // Middleware to parse cookies from incoming requests
app.use(cors());            // Middleware to enable Cross-Origin Resource Sharing (CORS) for all routes, allowing requests from any origin


app.use("/api/auth", authRoutes);           // Route for authentication-related endpoints (e.g., login, register)
app.use("/api/products", productRoutes);    // Route for product-related endpoints (e.g., get all products, get product by ID)
app.use("/api/categories", categoryRoutes); // Route for category-related endpoints (e.g., create category, get all categories)
app.use("/api/cart", cartRoutes);           // Route for cart-related endpoints (e.g., get cart items, add item to cart, update cart quantity, remove item from cart)
app.use("/api/orders", orderRoutes);        // Route for order-related endpoints (e.g., create order, get user orders, get order by ID)

//Test route to check if the server is running
app.get('/', (req, res) => {
    res.send("Welcome to ShopAvi API");
});

// Middleware to handle errors globally in the application
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// Function to start the server after connecting to the database
const startServer = async () => {
    try {
        // Connect to the database before starting the server
        await connectDB();
        // Making the server listen to the port defined in .env file
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
};

startServer();