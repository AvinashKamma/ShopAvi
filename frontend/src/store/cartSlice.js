import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems: [],
        loading: false
    },
    reducers: {
        setCart(state, action){
            state.cartItems = action.payload;
        }
    }
});

const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

export {cartReducer, cartActions};