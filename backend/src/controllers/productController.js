const { Product, PRODUCT_UPDATABLE_FIELDS } = require("../models/ProductModel");
const AppError = require("../utils/AppError");
const { cloudinary } = require("../utils/cloudinary");

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
            const sortArr = sort.split(" ");
            // This will take "1" or "-1" and automatically convert it to a number
            sortQuery[sortArr[0]] = Number(sortArr[1]);     // sort by the specified field and order (e.g., "price 1" for price ascending, "ratings -1" for ratings descending)
        } else {
            sortQuery.createdAt = -1;             // default sorting by creation date in descending order (newest first)
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

// Controller function to create a new product (admin only) with image upload support
const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Validate required fields for product creation
        if (!name || !description || !price || !category || !stock) {
            throw AppError("All fields  name, description, price, category, stock are required", 400);
        }

        // Process uploaded images and extract their URLs from Cloudinary
        const imageArray = req.files ? req.files.map((file) => (file.path)) : [];

        const savedProduct = await Product.create({
            name,
            description,
            price,
            category,
            images: imageArray,
            stock,
        });
        res.status(201).json({ message: 'Product created', product: savedProduct });
    } catch (error) {
        next(error);
    }
};

// Controller function to update product details by ID (admin only) with support for updating images
const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            throw AppError("Product not found", 404);
        }
        PRODUCT_UPDATABLE_FIELDS.forEach((field) => {
            // Update only the fields that are provided in the request body and are allowed to be updated
            //(undefined check is important when updated stock to 0, it should not be a falsy value and skip updating stock)
            if (req.body[field] !== undefined) {
                product[field] = req.body[field];
            }
        });

        //only replace if files actually uploaded, otherwise keep existing images
        if (req.files && req.files.length > 0) {
            product.images = req.files.map(file => file.path);
        }

        const updatedProduct = await product.save();
        res.status(200).json({ message: "Product updated", product: updatedProduct });

    } catch (error) {
        next(error);
    }
}

// Controller function to delete a product by ID (admin only) and also delete associated images from Cloudinary
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw AppError("Product not found", 404);
        }

        // Delete associated images from Cloudinary
        for (const imageURL of deletedProduct.images) {
            // eg URL : https://res.cloudinary.com/your-cloud/image/upload/v1234567890/shopavi-products/abc123.jpg

            // Split by '/upload/' and take the second part
            const urlParts = imageURL.split('/upload/');

            // urlParts[1] = 'v1234567890/shopavi-products/abc123.jpg'
            // Remove the version number (v1234567890/) and file extension
            const publicId = urlParts[1]
                .split('/').slice(1).join('/')  // removes version number
                .split('.')[0];                 // removes file extension (.jpg)

            // Delete the image from Cloudinary using the extracted public ID
            await cloudinary.uploader.destroy(publicId);
        }

        res.status(200).json({ message: "Product deleted", product: deletedProduct });
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };