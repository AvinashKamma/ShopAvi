import axiosInstance from "./axiosInstance";

const getAllCategoriesAPI = async() => {
    try{
        const response = await axiosInstance.get("/api/categories");
        return response.data;
    }catch(error){
        console.log(error.message);
    }
};

export {getAllCategoriesAPI};