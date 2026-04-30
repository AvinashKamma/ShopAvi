import FallbackImage from "../assets/placeholder.jpg";
import { formatDate, formatPrice } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {

    const navigate = useNavigate();

    // 1. Grab up to the first 2 items, extract their names, and join them with a comma.
    const displayedNames = order.items
        .slice(0, 2)
        .map(item => item.product.name)
        .join(", ");

    // 2. If there are more than 2 items in the cart, add the "..." to the end.
    const finalItemText = order.items.length > 2
        ? `${displayedNames}...`
        : displayedNames;

    // A pure CSS helper to make the status badge look amazing based on the word
    const getStatusTheme = (status) => {
        const s = status?.toLowerCase();
        if (s === 'delivered') return 'bg-green-50 text-green-700 border-green-200';
        if (s === 'cancelled') return 'bg-red-50 text-red-700 border-red-200';
        if (s === 'shipped') return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        if (s === 'processing') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        return 'bg-gray-50 text-gray-700 border-gray-200'; // Default / Pending
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md mb-4 group">

            {/* Left: Image Section (Matches CartProductCard exactly) */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <img
                    src={order.items[0].product.images?.[0] || FallbackImage}
                    alt="Order Image"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
            </div>

            {/* Middle: Product Details Section */}
            <div className="flex-grow flex flex-col justify-center w-full">
                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                    {finalItemText}
                </p>
                <p className="text-sm font-semibold text-gray-500 mb-2">
                    {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                </p>
                <p className="text-lg font-bold text-indigo-600">
                    ₹ {formatPrice(order.totalPrice)}
                </p>
            </div>

            {/* Right: Date, Status, and Action Section */}
            <div className="flex flex-col sm:items-end justify-center w-full sm:w-auto flex-shrink-0 gap-3 sm:gap-2 mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="text-sm font-semibold text-gray-500">
                    {formatDate(order.createdAt)}
                </div>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-lg border text-xs font-black uppercase tracking-wider ${getStatusTheme(order.status)}`}>
                    {order.status}
                </div>

                <div className="flex items-center text-sm font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors mt-1 sm:mt-2 cursor-pointer"
                onClick={()=>navigate(`/orders/${order._id}`)}
                >
                    View order
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

        </div>
    );
}

export default OrderCard;