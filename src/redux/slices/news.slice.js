import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {newsService} from "../../services";

const initialState = {
    news: [],
    errors: null,
    currentNews: null

}

const findAllNews = createAsyncThunk(
    'newsSlice/findAllNews',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await newsService.findAllNews();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findNewsById = createAsyncThunk(
    'newsSlice/findNewsById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await newsService.findNewsById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findMainNews = createAsyncThunk(
    'newsSlice/findMainNews',
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await newsService.findMainNews();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const newsSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {
        setCurrentNews:(state, action) => {
            state.currentNews=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllNews.fulfilled, (state, action) => {
                state.errors = null;
                state.news = action.payload;
            })
            .addCase(findAllNews.rejected, (state, action) => {
                state.erros = action.payload
            })
            .addCase(findNewsById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentNews=action.payload;
            })
            .addCase(findNewsById.rejected,(state, action) => {
                state.errors =null;
            })
            .addCase(findMainNews.fulfilled,(state, action) => {
                state.errors =null;
                state.news=action.payload;
            })
            .addCase(findMainNews.rejected,(state, action) => {
                state.erros =action.payload;
            })
    }
});

const {reducer: newsReducer, actions:{setCurrentNews}} = newsSlice;

const newsAction = {
    findAllNews,
    setCurrentNews,
    findMainNews
}

export {
    newsAction,
    newsReducer
}