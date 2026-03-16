const express = require("express");
const {registerUser, loginUser, getMe} = require("../controllers/authController.js");
const {verifyToken} = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/register", registerUser);     // Route for user registration
router.post("/login", loginUser);           // Route for user login
router.get("/me", verifyToken, getMe);      // Route for fetching user details, protected by JWT authentication

module.exports = router;