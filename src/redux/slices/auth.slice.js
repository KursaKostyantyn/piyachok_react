import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "../../services";

const initialState = {
    user: null,
    errors: null,
    isAuth: null

}

const register = createAsyncThunk(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.register(user);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const login = createAsyncThunk(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.login(user);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.errors = null;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.errors = null;
                state.isAuth = true;
                authService.setTokens(action.payload)
            })
            .addCase(login.rejected, (state, action) => {
                state.errors = action.payload;
            })
    }
});

const {reducer: authReducer, actions} = authSlice

const authActions = {
    register,
    login
}

export {
    authReducer,
    authActions
}