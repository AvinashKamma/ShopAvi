require("dotenv").config(); // We require this as we are running it individually (no where related app.js)
const mongoose = require("mongoose");
const Category = require("../models/CategoryModel");
const { Product } = require("../models/ProductModel");

const seedDB = async () => {
    try {
        // Step 1 — Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Step 2 — Clear existing data first (clean slate)
        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log("Cleared existing data");

        // Step 3 — Insert categories
        const categories = await Category.insertMany([
            { name: "Electronics", slug: "electronics" },
            { name: "Clothing", slug: "clothing" },
            { name: "Books", slug: "books" },
            { name: "Home & Kitchen", slug: "home-kitchen" },
            { name: "Sports & Fitness", slug: "sports-fitness" },
            { name: "Beauty & Personal Care", slug: "beauty-personal-care" },
        ]);
        console.log("Categories inserted");

        // Step 4 — Store category _ids for reference in products
        const electronics = categories[0]._id;
        const clothing = categories[1]._id;
        const books = categories[2]._id;
        const homeKitchen = categories[3]._id;
        const sports = categories[4]._id;
        const beauty = categories[5]._id;

        // Step 5 — Insert products using category _ids
        await Product.insertMany([
            // Electronics
            {
                name: "Samsung 4K Smart TV 55 inch",
                description: "Crystal clear 4K display with smart features and built-in streaming apps.",
                price: 49999,
                category: electronics,
                images: [],
                stock: 20,
                ratings: 4.5
            },
            {
                name: "Sony Wireless Noise Cancelling Headphones",
                description: "Industry leading noise cancellation with 30 hour battery life.",
                price: 12999,
                category: electronics,
                images: [],
                stock: 35,
                ratings: 4.7
            },
            {
                name: "Apple iPhone 15",
                description: "Latest iPhone with A16 chip, 48MP camera and all day battery.",
                price: 79999,
                category: electronics,
                images: [],
                stock: 15,
                ratings: 4.8
            },
            // Clothing
            {
                name: "Men's Classic White T-Shirt",
                description: "Premium 100% cotton comfortable everyday t-shirt.",
                price: 499,
                category: clothing,
                images: [],
                stock: 100,
                ratings: 4.2
            },
            {
                name: "Women's Running Jacket",
                description: "Lightweight windproof jacket perfect for outdoor running.",
                price: 1999,
                category: clothing,
                images: [],
                stock: 50,
                ratings: 4.4
            },
            // Books
            {
                name: "The Pragmatic Programmer",
                description: "A classic guide to software craftsmanship and best practices.",
                price: 799,
                category: books,
                images: [],
                stock: 60,
                ratings: 4.9
            },
            {
                name: "Clean Code by Robert Martin",
                description: "Learn to write readable, maintainable and professional code.",
                price: 699,
                category: books,
                images: [],
                stock: 45,
                ratings: 4.8
            },
            // Home & Kitchen
            {
                name: "Stainless Steel Water Bottle 1L",
                description: "Insulated bottle keeps drinks cold for 24 hours and hot for 12 hours.",
                price: 599,
                category: homeKitchen,
                images: [],
                stock: 80,
                ratings: 4.3
            },
            {
                name: "Non-Stick Cookware Set 5 Piece",
                description: "Premium non-stick coating with heat resistant handles.",
                price: 2499,
                category: homeKitchen,
                images: [],
                stock: 30,
                ratings: 4.1
            },
            // Sports & Fitness
            {
                name: "Yoga Mat Anti-Slip 6mm",
                description: "Extra thick non-slip yoga mat with carrying strap included.",
                price: 899,
                category: sports,
                images: [],
                stock: 70,
                ratings: 4.6
            },
            {
                name: "Adjustable Dumbbell Set 20kg",
                description: "Space saving adjustable dumbbells perfect for home workouts.",
                price: 3999,
                category: sports,
                images: [],
                stock: 25,
                ratings: 4.5
            },
            // Beauty & Personal Care
            {
                name: "Vitamin C Face Serum 30ml",
                description: "Brightening serum with 20% Vitamin C for glowing skin.",
                price: 799,
                category: beauty,
                images: [],
                stock: 90,
                ratings: 4.4
            },
            {
                name: "Men's Grooming Kit 8 in 1",
                description: "Complete grooming set including trimmer, scissors and accessories.",
                price: 1299,
                category: beauty,
                images: [],
                stock: 40,
                ratings: 4.2
            },
        ]);
        console.log("Products inserted");
        console.log("Seeding complete! 🎉");

    } catch (error) {
        console.error("Seeding failed:", error.message);
    } finally {
        // Always disconnect whether success or error
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};

seedDB();