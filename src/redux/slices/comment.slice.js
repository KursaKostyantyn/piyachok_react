import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {commentService} from "../../services";

const initialState = {
    comments: [],
    errors: null,
    currentComment:null,
    previousPage: 0,
    nextPage: 0,
    amountOfPages:0,
    currentPage:1,
    amountOfItems:0
}

const findCommentsByUserLogin = createAsyncThunk(
    'commentsSlice/findCommentsByUserLogin',
    async ({login, page,old}, {rejectWithValue}) => {
        try {
            const {data} = await commentService.findCommentsByUserLogin(login,page,old);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findCommentById = createAsyncThunk(
    'commentsSlice/findCommentById',
    async ({commentId},{rejectWithValue})=>{
        try {
            const {data} = await commentService.findCommentById(commentId);
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

const findAllComments = createAsyncThunk(
    'commentsSlice/findAllComments',
    async ({page,old},{rejectWithValue})=>{
        try {
            const {data} = await commentService.findAllComments(page,old);
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
            .addCase(findAllComments.fulfilled,(state, action) => {
                state.errors=null;
                state.comments=action.payload.items;
                state.previousPage=action.payload.previousPage;
                state.nextPage=action.payload.nextPage;
                state.amountOfPages=action.payload.amountOfPages
                state.amountOfItems=action.payload.amountOfItems;
                state.currentPage=action.payload.currentPage;
            })
            .addCase(findAllComments.rejected, (state, action) => {
                state.errors=action.payload;
            })
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
                state.amountOfItems=action.payload.amountOfItems
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
                state.comments=action.payload.items;
                state.previousPage=action.payload.previousPage;
                state.nextPage=action.payload.nextPage;
                state.amountOfPages=action.payload.amountOfPages
                state.amountOfItems=action.payload.amountOfItems;
                state.currentPage=action.payload.currentPage;
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
    updateComment,
    findAllComments
}

export {
    commentsActions,
    commentsReducer
}