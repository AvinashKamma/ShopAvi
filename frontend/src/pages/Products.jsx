import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAPI } from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import { productActions } from "../store/productSlice";

function Products() {
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const [params, setParams] = useState({});
    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProductsAPI(params);
                dispatch(productActions.setProducts(data.products));                
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>List of Products</h1>
            <div>
                {products.map((item) => <ProductCard product={item} key={item._id} />)}
            </div>
        </div>
    );
}

export default Products;