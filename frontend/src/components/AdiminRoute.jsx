import { Outlet } from "react-router-dom";
import { authMeAPI } from "../api/authAPI";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {

    // 1. Grab the user directly from Redux
    const user = useSelector(state => state.auth.user);

    // 2. If no user, or user is not an admin, kick them out
    if (!user || user.role !== "admin") {
        return <div><h1>401 Unauthorized</h1></div>
    }

    // 3. If they are an admin, render the layout!
    return <Outlet/>;
}

export default AdminRoute;