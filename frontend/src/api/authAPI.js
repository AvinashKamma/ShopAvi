import axiosInstance from "./axiosInstance";

// Register API returns user data
async function registerAPI(name, email, password){
   const response = await axiosInstance.post("/api/auth/register", {name, email, password});
   return response.data;
}

// Login API returns token and user data
async function  loginAPI(email, password){
    const response = await axiosInstance.post("/api/auth/login", {email, password});
    return response.data;
}

// Get current user data using token
async function authMeAPI(){
    const response = await axiosInstance.get("/api/auth/me");
    return response.data;
}


export {registerAPI, loginAPI, authMeAPI};