const mongoose = require('mongoose');

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Exit the process with failure code
        process.exit(1);
    }
};

module.exports = connectDB;