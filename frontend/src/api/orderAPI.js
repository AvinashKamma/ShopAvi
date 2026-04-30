import axiosInstance from "./axiosInstance";

const createOrderAPI = async (shippingAddress, paymentInfo) => {
    try {
        const response = await axiosInstance.post("/api/orders", { shippingAddress, paymentInfo });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
    }
};

const getUserOrdersAPI = async () => {
    try {
        const response = await axiosInstance.get("/api/orders/my");
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const getOrderByIdAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};


export {createOrderAPI, getUserOrdersAPI, getOrderByIdAPI};