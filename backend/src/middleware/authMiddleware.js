const User = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

// Middleware to verify JWT token and authenticate user
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if the Authorization header is present and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw AppError("No token provided", 401);
        }

        const token = authHeader.split(" ")[1];     // Extract token from the Authorization header
        if (!token) {
            throw AppError("Something went wrong. Login again", 401);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw AppError("User not found", 404);
        }
        req.user = user;    // Attach the authenticated user to the request object for use in subsequent middleware and route handlers
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {verifyToken};