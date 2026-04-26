const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    }
});

const shippingAddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }
});

const paymentInfoSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: {
            values : ["UPI", "Credit Card", "Debit Card", "Cash", "Wallet"],
            message : "'{VALUE}' is not a valid payment method."
        },     
        required: true
    },
    status: {
        type: String,
        enum: {
            values : ["Pending", "Success", "Failed"],
            message : "'{VALUE}' is not a valid payment status."
        },        
        default: "Pending",
        required: true
    }
});


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [itemsSchema],                       // Array of embedded subdocuments for order items
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: shippingAddressSchema,     // Embedded subdocument for shipping address
    paymentInfo: paymentInfoSchema,             // Embedded subdocument for payment information
    status: {
        type: String,
        enum: {
            values: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            // {VALUE} is a special Mongoose placeholder that injects whatever the user typed!
            message: "'{VALUE}' is not a valid order status."
        },
        default: "Pending",
    }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);


module.exports = { Order };