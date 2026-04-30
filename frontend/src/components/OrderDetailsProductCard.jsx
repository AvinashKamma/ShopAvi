import placeHolder from "../assets/placeholder.jpg";
import { formatPrice } from "../utils/helpers";


function OrderDetailsProductCard({ item }) {
    return (
        <div className="flex items-center gap-4 sm:gap-6 bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">

            {/* Image Section */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <img
                    src={item.product.images?.[0] || placeHolder}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details Section */}
            <div className="flex-grow flex flex-col justify-center w-full">
                <p className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                    {item.product.name}
                </p>
                {/* THE FIX: Added Quantity display here */}
                <p className="text-sm font-semibold text-gray-500 mb-2">
                    Qty: {item.quantity}
                </p>
                <p className="text-lg font-bold text-indigo-600">
                    ₹ {formatPrice(item.product.price)}
                </p>
            </div>

            {/* Optional: Subtotal for this specific item line */}
            <div className="hidden sm:flex flex-col items-end flex-shrink-0">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Subtotal</p>
                <p className="text-lg font-black text-gray-800">₹ {formatPrice(item.product.price * item.quantity)}</p>
            </div>
        </div>
    );
}

export default OrderDetailsProductCard;