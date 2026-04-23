import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import { useSelector, useDispatch } from "react-redux";
import { getProductByIdAPI } from "../api/productAPI";
import { productActions } from "../store/productSlice";
import DUMMY_IMAGE from "../assets/placeholder.jpg";
import { addItemToCartAPI } from "../api/cartAPI";
import { cartActions } from "../store/cartSlice";
import { formatPrice } from "../utils/helpers";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.product);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchProductById() {
            try {
                const data = await getProductByIdAPI(id);
                dispatch(productActions.setProduct(data.product));
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchProductById();
    }, [id]);

    function handleQuantity(event) {
        const operation = event.target.name;
        if (operation === "+") {
            setQuantity(quantity + 1);
        } else if (operation === "-") {
            setQuantity(quantity - 1);
        }
    }
    
    async function handleAddToCart(productId, quantity){
        try{
            const data = await addItemToCartAPI(productId, quantity);
            dispatch(cartActions.setCart(data.cart.items));
        }catch(error){
            console.error(error.message);
        }
    }

    // Safety check so the page doesn't crash while loading
    if (!product || !product.name) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">

            {/* Page Header */}
            <div className="max-w-6xl mx-auto mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Product Detail Page</h1>
            </div>

            {/* Main Product Container */}
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">

                {/* Left Side: Product Image */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-gray-50/50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                    <img
                        src={product.images?.[0] || DUMMY_IMAGE}
                        alt={product.name}
                        className="object-contain max-h-[450px] w-full rounded-xl hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Right Side: Product Details & Button */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">

                    {/* Text Details */}
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            {product.name}
                        </h2>

                        <p className="text-3xl font-bold text-indigo-600 mb-6">
                            ₹ {formatPrice(product.price)}
                        </p>

                        <p className="text-yellow-400 text-xl tracking-widest mb-8 drop-shadow-sm">
                            {"★".repeat(Math.round(product.ratings))}
                            {"☆".repeat(5 - Math.round(product.ratings))}
                            <span className="text-gray-400 ml-1">({product.ratings})</span>
                        </p>

                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">About this item</h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Dynamic Stock Badge */}
                        <p className={`w-fit px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${product.stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {product.stock ? `● ${product.stock} items left` : "● Out of stock"}
                        </p>

                        {/* Quantity Selector - Styled nicely! */}
                        {product.stock > 0 && (
                            <div className="flex items-center gap-4 mt-6">
                                <span className="text-gray-700 font-medium">Quantity:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                                    <button
                                        name="-"
                                        onClick={handleQuantity}
                                        disabled={quantity <= 1}
                                        className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition font-bold text-lg"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 font-semibold bg-white min-w-[3rem] text-center border-x border-gray-300">
                                        {quantity}
                                    </span>
                                    <button
                                        name="+"
                                        onClick={handleQuantity}
                                        disabled={quantity >= product.stock}
                                        className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition font-bold text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons (Bottom Right) */}
                    <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
                        <button
                            disabled={product.stock === 0}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                            onClick={()=>handleAddToCart(product._id, quantity)}
                        >
                            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                        <button
                            onClick={() => navigate("/products")}
                            className="w-full bg-white text-indigo-600 border-2 border-indigo-100 hover:bg-indigo-50 text-lg font-bold py-3.5 rounded-xl transition-all"
                        >
                            Back to Products
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ProductDetail;