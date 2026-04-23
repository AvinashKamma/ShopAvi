import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartProductCard from "../components/CartProductCard";
import { formatPrice } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { removeItemFromCartAPI } from "../api/cartAPI";

function Cart() {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    async function handleClearCart() {
        try {
            for (const item of cartItems) {
                await removeItemFromCartAPI(item.product._id);
            }
        } catch (error) {
            console.error(error.message);
        }
        dispatch(cartActions.setCart([]));
    }

    // If the cart is empty, show this fallback UI
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* Big faint shopping cart icon */}
                    <svg className="mx-auto h-32 w-32 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center px-8 py-3.5 border border-transparent text-lg font-bold rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:shadow-lg"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // This code only runs if the cart is NOT empty
    const totalCartValue = cartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.product.price * currentValue.quantity
    }, 0);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Shopping Cart
                    </h1>
                </div>

                <div className="flex flex-col gap-2">
                    {/* Rendered Items */}
                    <div>
                        {cartItems.map((item) => (
                            <CartProductCard key={item._id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary Box */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 mt-6 flex flex-col sm:flex-row justify-between items-center gap-6">

                        <div className="text-2xl font-bold text-gray-800">
                            <p>Total Value : <span className="text-indigo-600">₹ {formatPrice(totalCartValue)}</span></p>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                            <button className="px-6 py-3 bg-white text-red-600 border-2 border-red-100 hover:bg-red-50 hover:border-red-200 font-bold rounded-xl transition-all w-full sm:w-auto"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </button>
                            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg font-bold rounded-xl transition-all w-full sm:w-auto">
                                Proceed to Buy
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Cart;