const mongoose = require("mongoose");

// CartItem schema to represent individual items in the cart
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",             // reference to Product collection
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,                 // default quantity is 1
        min: 1                      // minimum quantity should be at least 1
    }
});


// Cart schema to represent the user's shopping cart
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",            // reference to User collection
        required: true,
        unique: true            // A user should only have ONE active cart at a time
    },
    items: [cartItemSchema]     // Embed the item schema as an array here
}, { timestamps: true });

// Create the Cart model from the schema
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;