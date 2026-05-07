const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { createOrder, getUserOrders, getOrderById } = require("../controllers/orderController");
const { checkAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/my", verifyToken, getUserOrders);
router.get("/:id", verifyToken, getOrderById);

module.exports = router;