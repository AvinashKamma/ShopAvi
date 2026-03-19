const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,  // references MongoDB _id
        ref: "Category",                       // reference to Category collection
        required: true
    },
    images: {
        type: [String],       // array of image URLs
        default: []          // default to empty array if no images provided
    },
    stock: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

const PRODUCT_UPDATABLE_FIELDS = ["name", "description", "price", "category", "stock"];

module.exports = {Product, PRODUCT_UPDATABLE_FIELDS};