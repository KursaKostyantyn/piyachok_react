import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {newsService} from "../../services";

const initialState = {
    news: [],
    errors: null,
    currentNews: null,
    previousPage: 0,
    nextPage: 0,
    amountOfPages: 0,
    currentPage: 1,
    amountOfItems:0

}

const findAllNews = createAsyncThunk(
    'newsSlice/findAllNews',
    async ({old, page}, {rejectWithValue}) => {
        try {
            const {data} = await newsService.findAllNews(old, page);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findNewsById = createAsyncThunk(
    'newsSlice/findNewsById',
    async ({id}, {rejectWithValue}) => {
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
    async ({old, page}, {rejectWithValue}) => {
        try {
            const {data} = await newsService.findMainNews(old, page);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const findNewsByUserId = createAsyncThunk(
    'newsSlice/findNewsByUserId',
    async ({old, page, userId}, {rejectWithValue}) => {
        try {
            const {data} = await newsService.findNewsByUserId(old, page, userId);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);

const deleteNewsById = createAsyncThunk(
    'newsSlice/deleteNewsById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await newsService.deleteNewsById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateNewsById = createAsyncThunk(
    'newsSlice/updateNewsById',
    async ({id, news}, {rejectWithValue}) => {
        try {
            const {data} = await newsService.updateNewsById(id, news);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const saveNews = createAsyncThunk(
    'newsSlice/saveNews',
    async ({news, placeId, login}, {rejectWithValue}) => {
        try {
            const {data} = await newsService.saveNews(news,placeId,login);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const newsSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {
        setCurrentNews: (state, action) => {
            state.currentNews = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveNews.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(saveNews.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(updateNewsById.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(updateNewsById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentNews = action.payload;
            })
            .addCase(deleteNewsById.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(deleteNewsById.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(findNewsByUserId.fulfilled, (state, action) => {
                state.errors = null;
                state.news = action.payload.items;
                state.previousPage = action.payload.previousPage
                state.nextPage = action.payload.nextPage
                state.amountOfPages = action.payload.amountOfPages
                state.currentPage = action.payload.currentPage
                state.amountOfItems=action.payload.amountOfItems
            })
            .addCase(findNewsByUserId.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findAllNews.fulfilled, (state, action) => {
                state.errors = null;
                state.news = action.payload.items;
                state.previousPage = action.payload.previousPage
                state.nextPage = action.payload.nextPage
                state.amountOfPages = action.payload.amountOfPages
                state.currentPage = action.payload.currentPage
                state.amountOfItems=action.payload.amountOfItems
            })
            .addCase(findAllNews.rejected, (state, action) => {
                state.erros = action.payload
            })
            .addCase(findNewsById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentNews = action.payload;
            })
            .addCase(findNewsById.rejected, (state, action) => {
                state.errors = null;
            })
            .addCase(findMainNews.fulfilled, (state, action) => {
                state.errors = null;
                state.news = action.payload.items;
                state.previousPage = action.payload.previousPage
                state.nextPage = action.payload.nextPage
                state.amountOfPages = action.payload.amountOfPages
                state.currentPage = action.payload.currentPage
                state.amountOfItems=action.payload.amountOfItems
            })
            .addCase(findMainNews.rejected, (state, action) => {
                state.erros = action.payload;
            })
    }
});

const {reducer: newsReducer, actions: {setCurrentNews}} = newsSlice;

const newsAction = {
    findAllNews,
    setCurrentNews,
    findMainNews,
    findNewsById,
    findNewsByUserId,
    deleteNewsById,
    updateNewsById,
    saveNews
}

export {
    newsAction,
    newsReducer
}