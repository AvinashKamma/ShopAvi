import { useEffect, useState } from "react";
import { fetchOrdersAPI, modifyOrderStatusAPI } from "../api/adminAPI";
import { formatDate, formatPrice } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOrders() {
            try {
                const ordersData = await fetchOrdersAPI();
                setOrders(ordersData.orders);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    async function handleStatusChange(orderId, newStatus) {
        try {
            await modifyOrderStatusAPI(orderId, newStatus);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Failed to update status:", error.message);
        }
    }

    // Styled Loading State
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-xl font-semibold text-gray-500 animate-pulse">
                    Loading Order Details...
                </div>
            </div>
        );
    }

    // Styled Empty State
    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white px-8 py-6 rounded-lg border border-gray-200 shadow-sm text-center">
                    <h2 className="text-xl font-bold text-gray-800">No orders found</h2>
                    <p className="text-gray-500 mt-2">When customers place orders, they will appear here.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Order Management
                    </h1>
                    <p className="text-gray-500 mt-1">View and update customer shipping statuses.</p>
                </div>

                {/* Table Container - Adds shadow, rounded corners, and mobile scrolling */}
                {/* Table Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-left">

                            {/* Table Head */}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ordered By</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Price</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Shipping Address</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {orders.map((order) => {
                                    return (
                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">

                                            {/*Column 1: Order ID (Sliced to last 6 chars) */}
                                            <td className="px-6 py-4 whitespace-nowrap cursor-pointer hover:bg-indigo-50 transition-colors" onClick={()=>navigate(`/admin/orders/${order._id}`)}>
                                                <span className="font-mono text-sm text-indigo-600 font-medium">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </span>
                                            </td>

                                            {/*Column 2: Date Formatting */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(order.createdAt)}
                                            </td>

                                            {/* Column 3: Ordered By */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {order.user?.name || "Unknown User"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {order.user?.email}
                                                </div>
                                            </td>

                                            {/* Column 4: Items (Singular/Plural Logic) */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                                                </span>
                                            </td>

                                            {/* Column 5: Total Price */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-indigo-600">
                                                    ₹ {formatPrice(order.totalPrice)}
                                                </div>
                                            </td>

                                            {/* Column 6: Shipping Address */}
                                            <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell max-w-xs truncate">
                                                {order.shippingAddress.street}, {order.shippingAddress.city}, <br />
                                                {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                            </td>

                                            {/* Column 7: The Interactive Status Dropdown */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 cursor-pointer hover:bg-gray-100 transition-colors"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminOrders;