// Utility function to create custom error objects with a message and status code
const AppError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

module.exports = AppError;