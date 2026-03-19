const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { verifyToken } = require("../middleware/authMiddleware.js");
const { checkAdmin } = require("../middleware/adminMiddleware.js");
const { upload } = require("../utils/cloudinary");

const router = express.Router();

router.get("/", getAllProducts);    // Route to get all products with optional filters and sorting
router.get("/:id", getProductById);  // Route to get product details by ID
router.post("/", verifyToken, checkAdmin, upload.array("images", 5), createProduct); // Route to create a new product (admin only) with image upload support (up to 5 images)
router.put("/:id", verifyToken, checkAdmin, upload.array("images", 5), updateProduct); // Route to update an existing product (admin only) with optional image upload support (up to 5 images)
router.delete("/:id", verifyToken, checkAdmin, deleteProduct); // Route to delete a product (admin only)

module.exports = router;