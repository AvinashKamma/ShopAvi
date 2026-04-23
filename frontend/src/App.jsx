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
import { getCartAPI } from "./api/cartAPI";
import { cartActions } from "./store/cartSlice";
import Cart from "./pages/Cart";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to track if we're still loading user data from token

  useEffect(() => {
    // On app load, check if there's a token in localStorage and load user data into Redux
    async function loadUser() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const meData = await authMeAPI();
          dispatch(authActions.setCredentials({ user: meData.user, token }));
          const data = await getCartAPI();
          dispatch(cartActions.setCart(data.cart.items));
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        // All routes inside this PrivateRoute will require authentication
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />      
        </Route>
      </Routes>
    </>
  );
}

export default App;
