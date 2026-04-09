import axiosInstance from "./axiosInstance";

const getAllCategoriesAPI = async() => {
    try{
        const response = await axiosInstance("/api/categories");
        return response.data;
    }catch(error){
        console.log(error.message);
    }
};

export {getAllCategoriesAPI};