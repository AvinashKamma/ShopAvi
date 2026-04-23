import placeholderImage from "../assets/placeholder.jpg";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../utils/helpers";
import { addItemToCartAPI, removeItemFromCartAPI } from "../api/cartAPI";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  function handleProductClick() {
    navigate(`/products/${product._id}`);
  }

  async function handleAddToCart(productId) {
    try {
      const data = await addItemToCartAPI(productId);
      dispatch(cartActions.setCart(data.cart.items));
    } catch (error) {
      console.error(error.message);
    }
  }

  const productInCart = cartItems.find(
    (item) => item.product._id.toString() === product._id.toString(),
  );

  async function handleQuantity(productId, operation) {
    try {
      if (operation === "add") {
        const data = await addItemToCartAPI(productId, 1);
        dispatch(cartActions.setCart(data.cart.items));
      } else if (operation === "remove") {
        if (productInCart.quantity === 1) {
          const data = await removeItemFromCartAPI(productId);
          dispatch(cartActions.setCart(data.cart.items));
        } else {
          const data = await addItemToCartAPI(productId, -1);
          dispatch(cartActions.setCart(data.cart.items));
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="h-48 overflow-hidden" onClick={handleProductClick}>
        <img
          src={product.images[0] || placeholderImage} // Use first image or placeholder
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <p
          className="text-gray-800 font-semibold text-sm mb-1 truncate"
          onClick={handleProductClick}
        >
          {product.name}
        </p>
        <p className="text-blue-600 font-bold text-lg mb-1">
          ₹{formatPrice(product.price)}
        </p>
        <p className="text-yellow-500 text-sm mb-3">
          {"★".repeat(Math.round(product.ratings))}
          {"☆".repeat(5 - Math.round(product.ratings))}
          <span className="text-gray-400 ml-1">({product.ratings})</span>
        </p>

        {/* Add to Cart Button or +/- Controls */}
        {productInCart ? (
          <div className="flex items-center w-[140px] h-[32px] mx-auto bg-blue-600 rounded-md overflow-hidden">
            {/* Minus Button */}
            <button
              className="flex-1 h-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200 text-xl font-medium pb-0.5"
              onClick={() => handleQuantity(product._id, "remove")}
            >
              −
            </button>

            {/* Quantity Center (White Circle) */}
            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-white text-blue-600 font-bold text-xs rounded-full shadow-sm mx-1">
              {productInCart.quantity}
            </div>

            {/* Plus Button */}
            <button
              className="flex-1 h-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200 text-xl font-medium pb-0.5"
              onClick={() => handleQuantity(product._id, "add")}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="flex items-center justify-center w-[140px] h-[32px] mx-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition"
            onClick={() => handleAddToCart(product._id)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
