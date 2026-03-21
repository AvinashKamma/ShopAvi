const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true
    }  // slug is a URL-friendly version of the category name, used for SEO and routing
}, {timestamps : true});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;