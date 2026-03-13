const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/database');

// Load environment variables from .env file
dotenv.config();

// Create a application web server
const app = express();

// Middeware for auto parsing fetched data from Database and auto parsing cookies data
app.use(express.json(), cookieParser(), cors());

//Test route to check if the server is running
app.get('/', (req, res) => {
    res.send("Welcome to ShopAvi API");
});

const PORT = process.env.PORT;


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