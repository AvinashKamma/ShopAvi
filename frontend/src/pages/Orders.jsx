import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../components/OrderCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserOrdersAPI } from "../api/orderAPI";
import { orderActions } from "../store/orderSlice";

function Orders() {
    const dispatch = useDispatch();
    
    // Grab the existing orders from Redux
    const orders = useSelector(state => state.order.orders);

    // Only show the full-page loading spinner if Redux is completely empty!
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Put the try/catch INSIDE the async function
        async function fetchOrders() {
            try {
                const ordersData = await getUserOrdersAPI();
                dispatch(orderActions.setOrders(ordersData.orders));
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false); // Stop loading whether it succeeds or fails
            }
        }

        fetchOrders();
    }, []);

    // 2. Prevent the "flash" by showing nothing (or a spinner) while fetching
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <p className="text-xl font-bold text-gray-500">Loading orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="mx-auto h-24 w-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">No orders yet</h2>
                    <p className="text-gray-500 mb-8 text-lg">
                        You haven't placed anything in your order history yet. Discover our latest products!
                    </p>
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

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Order History
                    </h1>
                </div>
                <div>
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Orders;