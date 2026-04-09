import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAPI } from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import { productActions } from "../store/productSlice";
import { getAllCategoriesAPI } from "../api/categoryAPI";

function Products() {
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const [params, setParams] = useState({ search: "" });
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [priceFilter, setPriceFilter] = useState({ minPrice: "", maxPrice: "" });

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProductsAPI(params);
                dispatch(productActions.setProducts(data.products));
            } catch (error) { console.log(error.message); }
        }
        fetchProducts();
    }, [params]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getAllCategoriesAPI();
                setCategories(data.categories);
            } catch (error) { console.log(error.message); }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setParams(prev => ({ ...prev, search }));
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setParams(prev => ({ ...prev, ...priceFilter }));
        }, 500);
        return () => clearTimeout(timer);
    }, [priceFilter]);

    function handleSearchBar(e) { setSearch(e.target.value); }

    function handleDropdown(e) {
        setParams(prev => ({ ...prev, category: e.target.value }));
    }

    function handlePriceInput(e) {
        const key = e.target.name === "min" ? "minPrice" : "maxPrice";
        setPriceFilter(prev => ({ ...prev, [key]: e.target.value }));
    }

    function sortDropDownHandler(e) {
        setParams(prev => ({ ...prev, sort: e.target.value }));
    }

    function handleResetFilters() {
        setParams({}); // Clears backend filters
        setSearch(""); // Clears search bar state
        setPriceFilter({ minPrice: "", maxPrice: "" }); // Clears price inputs
    }

    const inputClass = "w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm placeholder-gray-400";
    const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-8 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900">
                        All Products
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        {products.length} products found
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">

                {/* ── Sidebar ─────────────────────────────────────────── */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                        <h2 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span>
                            Filters
                        </h2>

                        {/* Search */}
                        <div className="mb-5">
                            <label className={labelClass}>Search</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={handleSearchBar}
                                    className={inputClass + " pl-9"}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Category */}
                        <div className="mb-5">
                            <label className={labelClass}>Category</label>
                            <select
                                value={params.category || ""}
                                onChange={handleDropdown}
                                className={inputClass + " cursor-pointer"}
                            >
                                <option value="">All Categories</option>
                                {categories?.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Price Range */}
                        <div className="mb-5">
                            <label className={labelClass}>Price Range (₹)</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    name="min"
                                    placeholder="Min"
                                    value={priceFilter.minPrice}
                                    onChange={handlePriceInput}
                                    className={inputClass}
                                />
                                <span className="text-gray-300 font-light text-lg">—</span>
                                <input
                                    type="number"
                                    name="max"
                                    placeholder="Max"
                                    value={priceFilter.maxPrice}
                                    onChange={handlePriceInput}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Sort */}
                        <div>
                            <label className={labelClass}>Sort By</label>
                            <select
                                value={params.sort || ""}
                                onChange={sortDropDownHandler}
                                className={inputClass + " cursor-pointer"}
                            >
                                <option value="">Newest First</option>
                                <option value="price 1">Price: Low to High</option>
                                <option value="price -1">Price: High to Low</option>
                                <option value="ratings -1">Top Rated</option>
                            </select>
                        </div>

                        {/* Reset Filters Button */}
                        <div className="mt-6">
                            <button
                                onClick={handleResetFilters}
                                className="w-full bg-blue-600 hover:bg-red-50 text-white hover:text-red-600 font-medium py-2.5 rounded-xl transition duration-200 border border-transparent hover:border-red-200"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                </aside>

                {/* ── Product Grid ─────────────────────────────────────── */}
                <main className="flex-1">
                    {products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <p className="text-5xl mb-4">🛍️</p>
                            <p className="text-lg font-medium">No products found</p>
                            <p className="text-sm mt-1">Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(item => (
                                <ProductCard product={item} key={item._id} />
                            ))}
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
}

export default Products;