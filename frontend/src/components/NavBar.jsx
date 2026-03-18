import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store/authSlice";

function NavBar() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  
  // Handle logout by clearing token and user data from Redux and localStorage
  function handleLogout() {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-400 tracking-wide">
        ShopAvi
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {token ? (
          <>
            {user && (
              <span className="text-sm text-gray-300">
                Welcome,{" "}
                <span className="text-white font-semibold">{user.name}</span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
