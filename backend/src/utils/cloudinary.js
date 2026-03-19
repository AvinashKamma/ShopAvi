const cloudinary= require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage for multer to handle file uploads
const storage = new CloudinaryStorage({
    cloudinary : cloudinary,                                // use the configured Cloudinary instance for storage
    params : {
        folder : "shopavi-products",                        // specify the folder in Cloudinary where images will be stored
        allowed_formats : ["jpeg", "jpg", "png", "webp"]    // specify allowed image formats for upload
    }
});

// Create a multer instance with the defined Cloudinary storage configuration
const upload = multer({storage});

module.exports = {cloudinary, upload};