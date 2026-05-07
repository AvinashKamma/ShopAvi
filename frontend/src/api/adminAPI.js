import axiosInstance from "./axiosInstance";

const fetchStatsAPI = async()=>{
    try{
        const response = await axiosInstance.get("/api/admin/stats");
        return response.data;
    }catch(error){
        console.error(error.response.data.message);
    }
};

const fetchOrdersAPI = async()=>{
    try{
        const response = await axiosInstance.get("/api/admin/orders");
        return response.data;
    }catch(error){
        console.error(error.response.data.message);
    }
};

const fetchSingleOrderAPI = async(id)=>{
    try{
        const response = await axiosInstance.get(`/api/admin/orders/${id}`);
        return response.data;
    }catch(error){
        console.error(error.response.data.message);
    }
}

const fetchUsersAPI = async()=>{
    try{
        const response = await axiosInstance.get("/api/admin/users");
        return response.data;
    }catch(error){
        console.error(error.response.data.message);
    }
};

const modifyUserRoleAPI = async(id, role)=>{
    try{
        const response = await axiosInstance.patch(`/api/admin/users/${id}/role`, {role});
        return response.data;
    }catch(error){
        console.error(error.response.data.message);
    }
};

const modifyOrderStatusAPI = async(id, status)=>{
    try{
        const response = await axiosInstance.patch(`/api/admin/orders/${id}/status`, {status});
        return response.data;
    }catch(error){
        console.error(error.response.data.message);
    }
};

export {fetchStatsAPI, fetchOrdersAPI, fetchUsersAPI, modifyUserRoleAPI, modifyOrderStatusAPI, fetchSingleOrderAPI};