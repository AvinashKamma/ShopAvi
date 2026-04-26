const express = require("express");
const { getCartItems, addItemToCart, updateCartQuantity, removeItemFromCart, clearCart } = require("../controllers/cartController");
const {verifyToken} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getCartItems);                     // Route to get all items in the user's cart, protected by authentication middleware
router.post("/", verifyToken, addItemToCart);                   // Route to add an item to the user's cart, protected by authentication middleware
router.put("/:productId", verifyToken, updateCartQuantity);     // Route to update the quantity of an item in the user's cart, protected by authentication middleware
router.delete("/clear", verifyToken, clearCart);                // Route to clear the user's cart, protected by authentication middleware
router.delete("/:productId", verifyToken, removeItemFromCart);  // Route to remove an item from the user's cart, protected by authentication middleware
module.exports = router;