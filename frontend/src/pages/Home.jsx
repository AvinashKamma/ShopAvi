import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAPI } from "../api/productAPI";
import { productActions } from "../store/productSlice";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function Home() {
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProductsAPI();
                dispatch(productActions.setProducts(data.products));
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchProducts();
    }, []);

    const featuredProducts = [...products].sort((a, b) => b.ratings - a.ratings).slice(0, 6);

    return (
        <div className="min-h-screen bg-gray-50">
            
            {/* ─── HERO BANNER SECTION ─── */}
            <div className="bg-indigo-600 text-white py-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center text-center shadow-inner">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                    Welcome to <span className="text-indigo-200">ShopFlow</span>
                </h1>
                <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mb-10 leading-relaxed">
                    Discover our exclusive collection of top-rated products. Upgrade your lifestyle with premium quality and unbeatable prices.
                </p>
                <button 
                    onClick={() => navigate("/products")}
                    className="bg-white text-indigo-600 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                    Shop All Products
                </button>
            </div>

            {/* ─── FEATURED PRODUCTS SECTION ─── */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                        <p className="text-gray-500">Our highest-rated picks just for you.</p>
                    </div>
                </div>

                {featuredProducts.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">Loading featured products...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard product={product} key={product._id} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default Home;