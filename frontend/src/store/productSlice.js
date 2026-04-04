import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        products: [],
        product: {},
        loading: false,
        error: null
    },

    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        setProduct(state, action) {
            state.product = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

const productActions = productSlice.actions;
const productReducer = productSlice.reducer;

export { productActions, productReducer };