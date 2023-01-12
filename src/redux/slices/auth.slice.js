import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {authService} from "../../services";

const initialState = {
    errors: null,
    isAuth: null,
    authorizedUser: null,

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

const getAuthorizedUser = createAsyncThunk(
    "userSlice/getAuthorizedUser",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.getAuthorizedUser();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setAuthorizedUser: (state, action) => {
            state.authorizedUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthorizedUser.fulfilled, (state, action) => {
                state.errors = null;
                state.authorizedUser = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.errors = null;
                state.isAuth = true;
                authService.setTokens(action.payload)
                state.authorizedUser = action.payload.userDTO;
            })
            .addCase(login.rejected, (state, action) => {
                state.errors = action.payload;
            })
    }
});

const {reducer: authReducer, actions: {setAuthorizedUser}} = authSlice

const authActions = {
    register,
    login,
    getAuthorizedUser,
    setAuthorizedUser

}

export {
    authReducer,
    authActions
}