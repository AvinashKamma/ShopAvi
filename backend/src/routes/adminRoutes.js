const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/adminMiddleware");
const { getAllOrders, getAllUsers, getStats, modifyOrderStatus,modifyUserRole, getSingleOrder } = require("../controllers/adminController");

const router = express.Router();

router.get("/orders", verifyToken, checkAdmin, getAllOrders);
router.get("/orders/:id", verifyToken, checkAdmin, getSingleOrder);
router.get("/users", verifyToken, checkAdmin, getAllUsers);
router.get("/stats", verifyToken, checkAdmin, getStats);
router.patch("/orders/:id/status", verifyToken, checkAdmin, modifyOrderStatus);
router.patch("/users/:id/role", verifyToken, checkAdmin, modifyUserRole);

module.exports = router;