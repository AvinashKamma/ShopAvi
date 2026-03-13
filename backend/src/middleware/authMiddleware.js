const User = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw AppError("No token provided", 401);
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw AppError("Something went wrong. Login again", 401);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw AppError("User not found", 404);
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {verifyToken};