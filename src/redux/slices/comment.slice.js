import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {commentService} from "../../services";

const initialState = {
    comments: [],
    errors: null,
    currentComment:null
}

const findCommentsByUserLogin = createAsyncThunk(
    'commentsSlice/findCommentsByUserLogin',
    async ({login}, {rejectWithValue}) => {
        try {
            const {data} = await commentService.findCommentsByUserLogin(login);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findCommentById = createAsyncThunk(
    'commentsSlice/findCommentById',
    async ({id},{rejectWithValue})=>{
        try {
            const {data} = await commentService.findCommentById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const commentsSlice = createSlice({
    name: 'commentsSlice',
    initialState,
    reducers: {
        setCurrentComment:(state, action) => {
            state.currentComment = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(findCommentById.fulfilled,(state, action) => {
                state.errors=null;
                state.currentComment= action.payload;
            })
            .addCase(findCommentById.rejected,(state, action) => {
                state.errors = action.payload;
            })
            .addCase(findCommentsByUserLogin.fulfilled, (state, action) => {
                state.errors = null;
                state.comments = action.payload;
            })
            .addCase(findCommentsByUserLogin.rejected, (state, action) => {
                state.errors = null;
            })
    }
});

const {reducer: commentsReducer, actions:{setCurrentComment}} = commentsSlice;

const commentsActions = {
    findCommentsByUserLogin,
    setCurrentComment,
    findCommentById
}

export {
    commentsActions,
    commentsReducer
}