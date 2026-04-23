import { updateCartItemAPI, removeItemFromCartAPI, addItemToCartAPI } from "../api/cartAPI";
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
                    const data = await addItemToCartAPI(productId, - 1);
                    dispatch(cartActions.setCart(data.cart.items));
                }
            }
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

            {/* Quantity Controls Section */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-fit h-fit bg-gray-50 flex-shrink-0">
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

        </div>
    );
}

export default CartProductCard;