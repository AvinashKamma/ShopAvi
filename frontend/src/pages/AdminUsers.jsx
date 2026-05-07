import { useEffect, useState } from "react";
import { fetchUsersAPI, modifyUserRoleAPI } from "../api/adminAPI";
import { useSelector } from "react-redux";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector(state => state.auth.user);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersData = await fetchUsersAPI();
                setUsers(usersData.users);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    async function handleRoleChange(id, newRole) {
        try {
            await modifyUserRoleAPI(id, newRole);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error("Failed to update role:", error.message);
        }
    }

    // Styled Loading State
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-xl font-semibold text-gray-500 animate-pulse">
                    Loading User Database...
                </div>
            </div>
        );
    }

    // Styled Empty State
    if (users.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white px-8 py-6 rounded-lg border border-gray-200 shadow-sm text-center">
                    <h2 className="text-xl font-bold text-gray-800">No Users Found</h2>
                    <p className="text-gray-500 mt-2">There are currently no registered users.</p>
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
                        User Management
                    </h1>
                    <p className="text-gray-500 mt-1">View registered customers and manage admin privileges.</p>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-left">
                            
                            {/* Table Head */}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User Profile</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Current Role</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Manage Access</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.map((user) => {
                                    const isCurrentUser = currentUser._id === user._id;

                                    return (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                            
                                            {/* Column 1: User ID */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-sm text-gray-500">
                                                    #{user._id.slice(-6).toUpperCase()}
                                                </span>
                                            </td>

                                            {/* Column 2: Name and Email */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {/* Optional Avatar Initial */}
                                                    <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold uppercase">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {user.name} 
                                                            {isCurrentUser && <span className="ml-2 text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">(You)</span>}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Column 3: Visual Role Badge */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${
                                                    user.role === 'admin' 
                                                        ? 'bg-purple-100 text-purple-800' 
                                                        : 'bg-emerald-100 text-emerald-800'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>

                                            {/* Column 4: Action Dropdown */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    name="role"
                                                    value={user.role}
                                                    onChange={(event) => handleRoleChange(user._id, event.target.value)}
                                                    disabled={isCurrentUser}
                                                    className={`text-sm rounded-lg block w-full p-2.5 border transition-colors ${
                                                        isCurrentUser 
                                                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                                                            : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <option value="customer">Customer</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                            
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminUsers;