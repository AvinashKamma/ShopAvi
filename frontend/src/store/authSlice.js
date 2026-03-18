import { createSlice } from "@reduxjs/toolkit";

// Create a slice for authentication state management
const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        // Set the user and token in the state
        setCredentials(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        // Clear the user and token from the state
        logout(state) {
            state.user = null;
            state.token = null;
        }
    }
});

const authReducers = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducers };