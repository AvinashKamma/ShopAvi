import placeholderImage from "../assets/placeholder.jpg";

const ProductCard = ({product}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={product.images[0] || placeholderImage} // Use first image or placeholder
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <p className="text-gray-800 font-semibold text-sm mb-1 truncate">
          {product.name}
        </p>
        <p className="text-blue-600 font-bold text-lg mb-1">₹{product.price}</p>
        <p className="text-yellow-500 text-sm mb-3">
          {"★".repeat(Math.round(product.ratings))}
          {"☆".repeat(5 - Math.round(product.ratings))}
          <span className="text-gray-400 ml-1">({product.ratings})</span>
        </p>

        {/* Add to Cart Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
