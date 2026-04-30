import {createSlice} from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name : "order",
    initialState : {
        orders : [],
        order : null,
        loading : false
    },
    reducers : {
        setOrders(state, action){
            state.orders = action.payload;
        },
        addNewOrder(state, action){
            state.orders = [action.payload, ...state.orders]
        },
        setSingleOrder(state, action){
            state.order = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload;
        }
    }
});

const orderActions = orderSlice.actions;
const orderReducer = orderSlice.reducer;

export {orderActions, orderReducer};