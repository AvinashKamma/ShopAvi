import { useEffect, useState } from "react";
import { fetchStatsAPI } from "../api/adminAPI";
import { formatPrice } from "../utils/helpers";
import {useNavigate} from "react-router-dom";

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchStats() {
            try {
                const statsData = await fetchStatsAPI();
                setStats(statsData.stats);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    // Styled Loading State
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-xl font-semibold text-gray-500 animate-pulse">
                    Loading dashboard statistics...
                </div>
            </div>
        );
    }

    // Styled Error State
    if (!stats) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg border border-red-200 shadow-sm">
                    <h2 className="text-lg font-bold">Failed to load data</h2>
                    <p className="text-sm">Please check your connection or try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 mt-1">Here is what is happening in your store today.</p>
                </div>

                {/* Stats Grid - Responsive 1 col mobile, 2 col tablet, 4 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* Card 1: Orders */}
                    <article className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                    onClick={()=>navigate("/admin/orders")}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Orders</h2>
                            {/* Optional: You can put an SVG icon here later */}
                            <span className="text-indigo-100 bg-indigo-500 p-2 rounded-lg">📦</span>
                        </div>
                        <p className="text-4xl font-black text-gray-800 mt-4">{stats.totalOrdersCount}</p>
                    </article>

                    {/* Card 2: Users */}
                    <article className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                    onClick={()=>navigate("/admin/users")}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Registered Users</h2>
                            <span className="text-emerald-100 bg-emerald-500 p-2 rounded-lg">👥</span>
                        </div>
                        <p className="text-4xl font-black text-gray-800 mt-4">{stats.totalUsersCount}</p>
                    </article>

                    {/* Card 3: Products */}
                    <article className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Products</h2>
                            <span className="text-amber-100 bg-amber-500 p-2 rounded-lg">🏷️</span>
                        </div>
                        <p className="text-4xl font-black text-gray-800 mt-4">{stats.totalProductsCount}</p>
                    </article>

                    {/* Card 4: Revenue */}
                    <article className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Revenue</h2>
                            <span className="text-blue-100 bg-blue-500 p-2 rounded-lg">💰</span>
                        </div>
                        <p className="text-4xl font-black text-blue-600 mt-4">
                            ₹{formatPrice(stats.totalRevenue)}
                        </p>
                    </article>

                </div>
            </div>
        </main>
    );
}

export default AdminDashboard;