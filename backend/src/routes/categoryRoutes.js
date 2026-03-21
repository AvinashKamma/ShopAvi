const express = require('express');
const { checkAdmin } = require('../middleware/adminMiddleware');
const { verifyToken } = require("../middleware/authMiddleware");
const { createCategory, getAllCategories, getCategoryById } = require("../controllers/categoryController");

const router = express.Router();

router.post("/", verifyToken, checkAdmin, createCategory);  // Route to create a new category (admin only)
router.get("/", getAllCategories);         // Route to get all categories (publicly accessible)
router.get("/:id", getCategoryById);        // Route to get category details by ID (publicly accessible)

module.exports = router;