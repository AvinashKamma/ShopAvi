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
import CheckOut from "./pages/CheckOut";
import { getUserOrdersAPI } from "./api/orderAPI";
import { orderActions } from "./store/orderSlice";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import AdminRoute from "./components/AdiminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import AdminUsers from "./pages/AdminUsers";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to track if we're still loading user data from token

  useEffect(() => {
    // On app load, check if there's a token in localStorage and load user data into Redux
    async function loadUser() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const myData = await authMeAPI();
          dispatch(authActions.setCredentials({ user: myData.user, token }));
          const myCartData = await getCartAPI();
          dispatch(cartActions.setCart(myCartData.cart.items));
          const myOrderData = await getUserOrdersAPI();
          dispatch(orderActions.setOrders(myOrderData.orders));
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
          <Route path="/checkout" element={<CheckOut/>}/>  
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails/>}/>

          // All routes inside this AdminRoute will require the user to be an admin
          <Route element={<AdminRoute/>}>
            <Route path="/admin" element={<AdminDashboard/>}/>
            <Route path="/admin/orders" element={<AdminOrders />}/>
            <Route path="/admin/orders/:id" element={<AdminOrderDetails />}/>
            <Route path="/admin/users" element={<AdminUsers />}/>
          </Route>
        </Route>

      </Routes>
    </>
  );
}



export default App;
