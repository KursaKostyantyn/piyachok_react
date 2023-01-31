import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {commentService} from "../../services";

const initialState = {
    comments: [],
    errors: null,
    currentComment:null,
    previousPage: 0,
    nextPage: 0,
    amountOfPages:0,
    currentPage:1
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

const findCommentsByPlaceId = createAsyncThunk(
    'commentsSlice/findCommentsByPlaceId',
    async({placeId,page,old},{rejectWithValue})=>{
        try {
            const {data} = await commentService.findCommentsByPlaceId(placeId,page,old);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const saveComment = createAsyncThunk(
    'commentSlice/saveComment',
    async ({comment},{rejectWithValue})=>{
        try {
            const {data} = await commentService.saveComment(comment);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateComment = createAsyncThunk(
    'commentsSlice',
    async ({comment},{rejectWithValue})=>{
        try {
            const {data} = await commentService.updateComment(comment);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data())
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
            .addCase(updateComment.rejected,(state, action) => {
                state.errors=null;
            })
            .addCase(updateComment.fulfilled,(state, action) => {
                state.errors=null;
                state.currentComment=action.payload;
            })
            .addCase(saveComment.fulfilled, (state, action) => {
                state.errros=null;
            })
            .addCase(saveComment.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(findCommentsByPlaceId.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(findCommentsByPlaceId.fulfilled, (state, action) => {
                state.errors = null;
                state.comments = action.payload.items
                state.previousPage = action.payload.previousPage
                state.nextPage = action.payload.nextPage
                state.amountOfPages = action.payload.amountOfPages
                state.currentPage=action.payload.currentPage
            })
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
    findCommentById,
    findCommentsByPlaceId,
    saveComment,
    updateComment
}

export {
    commentsActions,
    commentsReducer
}