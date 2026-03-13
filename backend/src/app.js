const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/database');
const errorHandler = require('./middleware/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

// Create a application web server
const app = express();

// Middewares
app.use(express.json());    // Middleware to parse JSON bodies from incoming requests
app.use(cookieParser());    // Middleware to parse cookies from incoming requests
app.use(cors());            // Middleware to enable Cross-Origin Resource Sharing (CORS) for all routes, allowing requests from any origin

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