const { Order } = require("../models/OrderModel");
const User = require("../models/UserModel");
const { Product } = require("../models/ProductModel");

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
            return res.json({ message: "No orders found" , orders : []});
        }
        res.json({ message: "Fetched Orders of all users", orders });
    } catch (error) {
        next(error);
    }
};

const getSingleOrder = async(req, res, next) =>{
    try{
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("user", "name email").populate("items.product");
        if(!order){
            return res.status(404).json({ message: "Order not found"});
        }
        res.json({ message: "Fetched Order details", order });
    }catch(error){
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password");
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" , users:[]});
        }
        res.json({ message: "Fetched all users", users });

    } catch (error) {
        next(error);
    }
};

const getStats = async (req, res, next) => {
    try {
        const totalOrdersCount = await Order.countDocuments({});
        const totalUsersCount = await User.countDocuments({});
        const totalProductsCount = await Product.countDocuments({});
        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" }
                }
            }
        ]);

        const totalRevenue = revenueResult[0]?.totalRevenue || 0;

        res.json({ message: "Fetched Stats", stats: { totalOrdersCount, totalUsersCount, totalProductsCount, totalRevenue } })

    } catch (error) {
        next(error);
    }
};

const modifyOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const status = req.body.status;
        const order = await Order.findByIdAndUpdate(orderId, { status }, { returnDocument: "after", runValidators: true });
        if (!order) {
            return res.status(404).json({ message: "Order not Found" });
        }
        res.json({ message: `Order status modified to ${status}`, order});

    } catch (error) {
        next(error);
    }
};

const modifyUserRole = async(req, res, next) =>{
    try{
        const userId = req.params.id;
        const adminUserId = req.user._id.toString();
        const userRole = req.body.role;
        if(adminUserId === userId){
            return res.status(400).json({message : "You can't modify your own role"});
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {role : userRole}, {returnDocument : "after", runValidators : true}).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({message : `Granted user with ${userRole}`, updatedUser});
    }catch(error){
        next(error);
    }
};

module.exports = { getAllOrders, getAllUsers, getStats, modifyOrderStatus, modifyUserRole, getSingleOrder };