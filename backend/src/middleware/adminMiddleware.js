const AppError = require("../utils/AppError")

// Middleware to check if the user is an admin
const checkAdmin = async (req, res, next) => {
    try{
        if (req.user.role !== "admin") {
        throw AppError("You are not an Admin", 403);
    }
    next();
    }catch(error){
        next(error);
    }
};

module.exports = { checkAdmin };