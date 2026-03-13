const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Load environment variables from .env file
dotenv.config();

// Create a application web server
const app = express();

// Middeware for auto parsing fetched data from Database and auto parsing cookies data
app.use(express.json(),cookieParser(),cors());

//Test route to check if the server is running
app.get('/',(req,res)=>{
    res.send("Welcome to ShopAvi API");
});

// Making the server listen to the port defined in .env file
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});