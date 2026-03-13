const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            throw AppError("Entered fields are not valid", 400);
        }
        const isUserPresent = await User.findOne({ email: email });
        if (isUserPresent) {
            throw AppError("User already present! Try with another email", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ message: "User registered successfully", token });

    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw AppError("Enter both email and password",400);
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw AppError("Invalid Credentials",401);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw AppError("Invalid Credentials",401);
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        next(error);
    }
};

const getMe = async(req, res, next)=>{
    try{
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password -__v");
        res.status(200).json({user});
    }catch(error){
        next(error);
    }
}

module.exports = { registerUser, loginUser, getMe};