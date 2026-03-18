import axios from "axios";

// Create an Axios instance with base URL
const axiosInstance = axios.create({
    baseURL : "http://localhost:8000",
});

// Add a request interceptor to include token in headers
axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");    // Get token from localStorage
    if(token){
        config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header if it exists
    }
    return config; // Return the modified config for the request to proceed
});

export default axiosInstance;