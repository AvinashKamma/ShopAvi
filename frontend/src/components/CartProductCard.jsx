import { removeItemFromCartAPI, addItemToCartAPI } from "../api/cartAPI";
import placeHolder from "../assets/placeholder.jpg";
import { formatPrice } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

function CartProductCard({ item }) {
    const dispatch = useDispatch();

    async function handleQuantity(productId, operation) {
        try {
            if (operation === "add") {
                const data = await addItemToCartAPI(productId, 1);
                dispatch(cartActions.setCart(data.cart.items));
            } else if (operation === "remove") {
                if (item.quantity === 1) {
                    const data = await removeItemFromCartAPI(productId); // Fires DELETE
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

    // Function to instantly delete the item regardless of quantity
    async function handleDeleteItem(productId) {
        try {
            const data = await removeItemFromCartAPI(productId);
            dispatch(cartActions.setCart(data.cart.items));
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="flex items-center gap-4 sm:gap-6 bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md mb-4">

            {/* Image Section */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <img
                    src={item.product.images?.[0] || placeHolder}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
            </div>

            {/* Product Details Section */}
            <div className="flex-grow flex flex-col justify-center">
                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                    {item.product.name}
                </p>
                <p className="text-lg font-bold text-indigo-600">
                    ₹ {formatPrice(item.product.price)}
                </p>
            </div>

            {/* Controls Section (Quantity + Delete) */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-4 flex-shrink-0">
                
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-fit h-fit bg-gray-50">
                    <button className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-200 transition font-bold text-lg"
                        onClick={() => handleQuantity(item.product._id, "remove")}
                    >
                        -
                    </button>
                    <p className="px-2 sm:px-4 py-2 font-semibold bg-white border-x border-gray-200 text-center min-w-[2.5rem]">
                        {item.quantity}
                    </p>
                    <button className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-200 transition font-bold text-lg"
                        onClick={() => handleQuantity(item.product._id, "add")}
                    >
                        +
                    </button>
                </div>

                {/* Delete Icon Button */}
                <button 
                    onClick={() => handleDeleteItem(item.product._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove from cart"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>

            </div>

        </div>
    );
}

export default CartProductCard;