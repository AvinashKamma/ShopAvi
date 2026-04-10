import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import { authActions } from "./store/authSlice";
import NavBar from "./components/NavBar";
import { authMeAPI } from "./api/authAPI";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);    // State to track if we're still loading user data from token

  useEffect(() => {
    // On app load, check if there's a token in localStorage and load user data into Redux
    async function loadUser() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const meData = await authMeAPI();
          dispatch(authActions.setCredentials({ user: meData.user, token }));
        }
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false); // always runs
      }
    }
    loadUser();
  }, []);

  // While we're loading user data from token, we can show a loading state or just return null
  if (loading) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-md w-full">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Welcome to ShopAvi 🛒
                  </h1>
                  <p className="text-gray-500 mb-6">
                    Your one-stop shop for everything you need.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/products"
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition font-medium"
                    >
                      Browse Products
                    </Link>
                    <Link
                      to="/orders"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md transition font-medium"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/cart"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md transition font-medium"
                    >
                      My Cart
                    </Link>
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
