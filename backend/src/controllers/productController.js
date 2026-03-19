const Product = require("../models/ProductModel");
const AppError = require("../utils/AppError");

// Controller function to get all products with optional filters and sorting
const getAllProducts = async (req, res, next) => {
    try {
        const { search, category, minPrice, maxPrice, sort } = req.query;
        
        // Build the query object based on the provided filters
        let query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" };     // case-insensitive search on product name
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = Number(minPrice);            // filter products with price greater than or equal to minPrice
            }
            if (maxPrice) {
                query.price.$lte = Number(maxPrice);            // filter products with price less than or equal to maxPrice
            }
        }
        let sortQuery = {};
        if (sort) {
            sortQuery[sort] = 1;        // sort by the specified field in ascending order (e.g., price, ratings)
        } else {
            sortQuery.createdAt = -1    // default sorting by creation date in descending order (newest first)
        }
        const products = await Product.find(query).sort(sortQuery);
        res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
};

// Controller function to get product details by ID
const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            throw AppError("Product not found", 404);
        }
        res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllProducts, getProductById };