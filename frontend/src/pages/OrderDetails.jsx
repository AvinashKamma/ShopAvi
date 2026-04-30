import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderByIdAPI } from "../api/orderAPI";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../store/orderSlice";
import { formatDate, formatPrice } from "../utils/helpers";
import OrderDetailsProductCard from "../components/OrderDetailsProductCard";

function OrderDetails() {
    const order = useSelector(state => state.order.order);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrderDetails() {
            try {
                const orderData = await getOrderByIdAPI(id);
                dispatch(orderActions.setSingleOrder(orderData.order));
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchOrderDetails();

        // THE FIX: Cleanup function! This wipes the single order from Redux when you leave the page.
        return () => {
            dispatch(orderActions.setSingleOrder(null));
        };
    }, [id, dispatch]);

    // CSS helper for the status badge
    const getStatusTheme = (status) => {
        const s = status?.toLowerCase();
        if (s === 'delivered') return 'bg-green-50 text-green-700 border-green-200';
        if (s === 'cancelled') return 'bg-red-50 text-red-700 border-red-200';
        if (s === 'shipped') return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        return 'bg-gray-50 text-gray-700 border-gray-200'; 
    };

    if (isLoading || !order) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <p className="text-xl font-bold text-gray-500 animate-pulse">Loading Receipt...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Back Button */}
                <Link to="/orders" className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 mb-6 transition-colors">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Orders
                </Link>

                {/* Receipt Header Card */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
                                Order Receipt
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                Order ID: <span className="font-mono text-gray-700">{order._id}</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-500 mb-2">{formatDate(order.createdAt)}</p>
                            <div className={`inline-flex items-center px-3 py-1 rounded-lg border text-xs font-black uppercase tracking-wider ${getStatusTheme(order.status)}`}>
                                {order.status}
                            </div>
                        </div>
                    </div>

                    {/* Customer Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shipping Address</h3>
                            <p className="text-base font-semibold text-gray-800 leading-relaxed">
                                {order.shippingAddress.street}<br/>
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Info</h3>
                            <p className="text-base font-semibold text-gray-800">
                                Method: <span className="text-indigo-600">{order.paymentInfo.method}</span>
                            </p>
                            <p className="text-base font-semibold text-gray-800">
                                Status: {order.paymentInfo.status}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ordered Items List */}
                <h3 className="text-xl font-extrabold text-gray-900 mb-4">Items Summary</h3>
                <div className="flex flex-col gap-4 mb-6">
                    {order.items.map((item) => (
                        <OrderDetailsProductCard key={item._id} item={item} />
                    ))}
                </div>

                {/* Total Price Footer */}
                <div className="bg-indigo-600 p-6 sm:p-8 rounded-2xl shadow-md flex justify-between items-center text-white">
                    <span className="text-lg font-bold">Total Paid</span>
                    <span className="text-3xl font-black">₹ {formatPrice(order.totalPrice)}</span>
                </div>

            </div>
        </div>
    );
}

export default OrderDetails;