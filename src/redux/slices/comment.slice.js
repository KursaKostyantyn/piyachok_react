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
    setCurrentComment
}

export {
    commentsActions,
    commentsReducer
}