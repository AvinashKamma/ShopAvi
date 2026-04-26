const Cart = require("../models/CartModel");
const { Order } = require("../models/OrderModel");

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { shippingAddress, paymentInfo } = req.body;
        const userCartPopulated = await Cart.findOne({ user: userId }).populate("items.product");
        if (!userCartPopulated || userCartPopulated.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty. Add few products before placing the order" });
        }
        const totalCartPrice = userCartPopulated.items.reduce((acc, curr) => {
            return acc + curr.product.price * curr.quantity
        }, 0);

        const userCart = userCartPopulated.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity
        }));

        const createdOrder = await Order.create({
            user: userId,
            items: userCart,
            totalPrice: totalCartPrice,
            shippingAddress,
            paymentInfo,
        });

        await Cart.findOneAndDelete({ user: userId });

        res.status(201).json({ message: "Order placed successufully !", order: createdOrder });

    } catch (error) {
        next(error);
    }
};

const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userOrders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate("items.product");
        if (userOrders.length === 0) {
            return res.json({ message: "You haven't yet placed order yet", orders: [] });
        }
        res.json({ message: "Fetched user order details", orders: userOrders });
    } catch (error) {
        next(error)
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const orderId = req.params.id;
        const orderDetails = await Order.findOne({ _id: orderId, user: userId }).populate("user", "name email").populate("items.product");
        if (!orderDetails) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Fetched order details", order: orderDetails });
    } catch (error) {
        next(error);
    }
};

const modifyOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const modifiedOrder = await Order.findByIdAndUpdate(orderId, { status }, { returnDocument: "after", runValidators: true });
        if (!modifiedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Modified order details", order: modifiedOrder });
    } catch (error) {
        next(error);
    }
}

module.exports = { createOrder, getUserOrders, getOrderById, modifyOrderStatus };

