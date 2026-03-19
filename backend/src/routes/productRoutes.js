const express= require("express");
const { getAllProducts, getProductById, createProduct} = require("../controllers/productController");
const {verifyToken} = require("../middleware/authMiddleware.js");
const {checkAdmin} = require("../middleware/adminMiddleware.js");
const {upload} = require("../utils/cloudinary");

const router = express.Router();

router.get("/", getAllProducts);    // Route to get all products with optional filters and sorting
router.get("/:id",getProductById);  // Route to get product details by ID
router.post("/", verifyToken, checkAdmin, upload.array("images", 5), createProduct); // Route to create a new product (admin only) with image upload support (up to 5 images)

module.exports = router;