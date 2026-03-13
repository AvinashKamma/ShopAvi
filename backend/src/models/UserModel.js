const mongoose = require('mongoose');

// Schema for User collection in MongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  // stores email as lowercase always
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    address: {
        type: String,
        required: flase
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    }
}, { timestamps: true });

// Create a model for User collection using the defined schema
const User = mongoose.model('User', userSchema);

module.exports = User;