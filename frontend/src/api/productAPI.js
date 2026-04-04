import axiosInstance from "./axiosInstance";

const getAllProductsAPI = async (params = {}) => {
    try {
        const response = await axiosInstance.get("/api/products", {params});
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

const getProductByIdAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

export {getAllProductsAPI, getProductByIdAPI};