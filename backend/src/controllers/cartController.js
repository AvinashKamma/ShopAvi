const Cart = require("../models/CartModel");
const { Product } = require("../models/ProductModel");
const AppError = require("../utils/AppError");

// Controller function to get all items in the user's cart
const getCartItems = async (req, res, next) => {
    try {
        const userId = req.user._id;
        // Find the cart for the authenticated user and populate the product details in the items
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        // If the cart is not found or has no items, return a message indicating that the cart is empty
        if (!cart || cart.items.length === 0) {
            return res.json({ message: "Your cart is empty", cart: { items: [] } });
        }
        res.json({ message: "Fetched Items in the cart", cart: cart });
    } catch (error) {
        next(error);
    }
};

const addItemToCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId, quantity = 1 } = req.body;
        let cart = await Cart.findOne({ user: userId });        // Find the cart for the authenticated user

        const product = await Product.findById(productId);
        if (!product) {
            throw AppError("Product not found in the database", 404);
        }
        const stock = product.stock;

        // If the cart does not exist, create a new cart with the item
        if (!cart) {
            if (quantity > stock) {
                throw AppError(`Select quantity lessthan ${stock}`, 400);
            }
            cart = await Cart.create({
                user: userId,
                items: [{
                    product: productId,
                    quantity
                }]
            });
            return res.status(201).json({ message: "Cart created and item added", cart });
        }

        // If the cart exists, check if the item is already in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        // If the item is already in the cart, update the quantity; otherwise, add the new item to the cart
        if (itemIndex !== -1) {
            const existingQuantity = cart.items[itemIndex].quantity;
            cart.items[itemIndex].quantity = cart.items[itemIndex].quantity + quantity;
            if (cart.items[itemIndex].quantity > stock) {
                // If the updated quantity exceeds the available stock, throw an error with a message indicating how many items can be added
                throw AppError((stock - existingQuantity === 0) ? "No more products left as the stock limit reached" : `Only ${stock - existingQuantity} items can be added`, 400);
            }
        } else {
            // If the item is not in the cart, check if the requested quantity exceeds the available stock before adding it to the cart
            if (quantity > stock) {
                throw AppError(`Select quantity lessthan ${stock}`, 400);
            }
            cart.items.push({ product: productId, quantity: quantity });
        }

        await cart.save();

        res.json({ message: "Item added to cart successfully", cart });

    } catch (error) {
        next(error);
    }
};

const updateCartQuantity = async (req, res, next) => {
    try {
        const userId = req.user._id;                        // Get the authenticated user's ID from the request object (set by the authentication middleware)
        const productId = req.params.productId;             // Get the product ID from the route parameters
        const { quantity } = req.body;                      // Get the new quantity for the product from the request body
        const cart = await Cart.findOne({ user: userId });     // Find the cart for the authenticated user

        // If the cart is not found, return a 404 error with a message indicating that the cart was not found
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        // Find the product in the database to check its stock before updating the quantity in the cart
        const product = await Product.findById(productId);

        if (!product) {
            throw AppError("Product not found in the database", 404);
        }
        const stock = product.stock;

        // If the requested quantity exceeds the available stock, throw an error with a message indicating how many items can be added
        if (stock < quantity) {
            throw AppError(`Select quantity lessthan ${stock}`, 400);
        }

        // Find the index of the item in the cart that matches the product ID
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        
        // If the item is not found in the cart, throw an error with a message indicating that the product is not in the cart
        if (itemIndex === -1) {
            throw AppError("Product not found in your cart", 404);
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.status(200).json({ message: "Cart quantity modified", cart });
    } catch (error) {
        next(error);
    }
};

const removeItemFromCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        // Find the cart for the authenticated user and check if it exists
        const cart = await Cart.findOne({ user: userId });          
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        // Find the index of the item in the cart that matches the product ID
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

        // If the item is not found in the cart, return a message indicating that the product is not in the cart
        if (itemIndex === -1) {
            throw AppError("Product not found in your cart", 404);
        }
        
        // Remove the item from the cart by filtering out the item with the matching product ID
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        
        await cart.save();

        res.json({ message: "Item removed from the cart", cart });

    } catch (error) {
        next(error);
    }
};

module.exports = { getCartItems, addItemToCart, updateCartQuantity, removeItemFromCart };