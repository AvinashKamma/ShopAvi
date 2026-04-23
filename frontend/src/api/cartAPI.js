import axiosInstance from "./axiosInstance";

const getCartAPI = async () => {
    try {
        const response = await axiosInstance.get("/api/cart");
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const addItemToCartAPI = async (productId, quantity) => {
    try {
        const response = await axiosInstance.post("/api/cart", { productId, quantity });
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const updateCartItemAPI = async (productId, quantity) => {
    try {
        const response = await axiosInstance.put(`/api/cart/${productId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const removeItemFromCartAPI = async (productId) => {
    try {
        const response = await axiosInstance.delete(`/api/cart/${productId}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};


export { getCartAPI, addItemToCartAPI, updateCartItemAPI, removeItemFromCartAPI };