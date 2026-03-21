const Category = require("../models/CategoryModel");
const AppError = require("../utils/AppError");

// Controller function to create a new category (admin only)
const createCategory = async(req, res, next) => {
    try{
        const {name, slug} = req.body;
        if(!name || !slug){
            throw AppError("Require both Category Name and Slug", 400);
        }
        const category = await Category.create({name, slug});
        res.status(201).json({message : "Category created", category});
    }catch(error){
        next(error);
    }
};

// Controller function to get all categories (publicly accessible)
const getAllCategories = async(req, res, next) =>{
    try{
        const categories = await Category.find();
        res.status(200).json({message : "All categories", categories});
    }catch(error){
        next(error);
    }
}

// Controller function to get category details by ID (publicly accessible)
const getCategoryById = async(req, res, next) =>{
    try{
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if(!category){
            throw AppError("Category not found !", 404);
        }
        res.status(200).json({message : "Got the category", category});
    }catch(error){
        next(error);
    }
}

module.exports = {createCategory, getAllCategories, getCategoryById};