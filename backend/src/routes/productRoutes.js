const express= require("express");
const { getAllProducts, getProductById } = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);    // Route to get all products with optional filters and sorting
router.get("/:id",getProductById);  // Route to get product details by ID

module.exports = router;