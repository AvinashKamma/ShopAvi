import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// A component to protect routes that require authentication
function PrivateRoute({children}){
    const token = useSelector((state) => state.auth.token);
    if(!token){
        return <Navigate to={"/login"}/>    // If no token, redirect to login page
    }
    return <Outlet />;
}

export default PrivateRoute;