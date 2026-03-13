const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
    if(!name?.trim() || !email?.trim() || !password?.trim()){
        throw new Error("Entered fields are not valid");
    }
    const isUserPresent = await User.findOne({email : email});
    if(isUserPresent){
        throw new Error("User already present! Try with another email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({name, email, password : hashedPassword});
    await user.save();

    const token = jwt.sign({id : user._id},process.env.JWT_SECRET, {expiresIn : "7d"});

    res.status(201).json({message : "User registered successfully", token});

    }catch(error){
        res.status(400).json({error : error.message});
    }
};

module.exports = {registerUser};