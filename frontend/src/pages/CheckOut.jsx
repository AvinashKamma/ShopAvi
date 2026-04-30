import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createOrderAPI } from "../api/orderAPI";
import { orderActions } from "../store/orderSlice";
import { cartActions } from "../store/cartSlice";

function CheckOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const shippingAddress = {
            street: formData.get("street"),
            city: formData.get("city"),
            state: formData.get("state"),
            pincode: Number(formData.get("pincode")) // Cast to Number
        };

        const paymentInfo = {
            method: formData.get("paymentMethod")
        };

        try {
            const data = await createOrderAPI(shippingAddress, paymentInfo);
            dispatch(orderActions.addNewOrder(data.order));
            dispatch(cartActions.setCart([]));
            navigate("/orders");
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 flex flex-col justify-center sm:px-6 lg:px-8">

            {/* Header Section */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Secure Checkout
                </h2>
                <div className="mt-2 h-1 w-16 bg-blue-600 mx-auto rounded-full"></div>
                <p className="mt-3 text-sm text-gray-500">
                    Enter your shipping address and payment details below
                </p>
            </div>

            {/* Form Card */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-lg sm:rounded-xl border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Street Input */}
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address *</label>
                            <input
                                type="text"
                                name="street"
                                id="street"
                                required
                                className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-sm"
                                placeholder="123 Main St, Apt 4B"
                            />
                        </div>

                        {/* City & State Grid (Side by Side) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    required
                                    className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-sm"
                                    placeholder="New York"
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State *</label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    required
                                    className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-sm"
                                    placeholder="NY"
                                />
                            </div>
                        </div>

                        {/* Pincode Input */}
                        <div>
                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode *</label>
                            <input
                                type="number"
                                name="pincode"
                                id="pincode"
                                required
                                className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-sm"
                                placeholder="10001"
                            />
                        </div>

                        {/* Payment Method Dropdown */}
                        <div className="pt-2 border-t border-gray-100">
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-900 mb-2">Payment Method *</label>
                            <select
                                name="paymentMethod"
                                id="paymentMethod"
                                defaultValue=""
                                required
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-sm font-medium text-gray-700 cursor-pointer"
                            >
                                <option value="" disabled>Select a Payment Method</option>
                                <option value="UPI">UPI</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Cash">Cash On Delivery</option>
                                <option value="Wallet">Wallet</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="pt-4 flex flex-col gap-3">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Pay Now
                            </button>

                            <button
                                type="reset"
                                className="w-full flex justify-center py-3 px-4 border border-indigo-200 rounded-md shadow-md text-sm font-bold text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none"
                            >
                                Clear details
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;