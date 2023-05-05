import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {topService} from "../../services";

const initialState={
    tops:[],
    placeTops:[],
    errors: null,
    currentFeature: null,
    previousPage: 0,
    nextPage: 0,
    amountOfPages: 0,
    currentPage: 1,
    amountOfItems: 0,
}

const fillTheResponse = (state, action) => {
    state.errors = null;
    state.tops = action.payload.items
    state.previousPage = action.payload.previousPage
    state.nextPage = action.payload.nextPage
    state.amountOfPages = action.payload.amountOfPages
    state.currentPage = action.payload.currentPage
    state.amountOfItems = action.payload.amountOfItems
}

const findAllTops = createAsyncThunk(
    'topSlice/findAllTops',
    async ({page},{rejectWithValue})=>{
        try {
            const {data} = await topService.findAllTops(page);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const saveTop = createAsyncThunk(
    'topSlice/saveTop',
    async ({top},{rejectWithValue})=>{
        try {
            const {data} = await topService.saveTop(top);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findTopsByPlaceId = createAsyncThunk(
    'topSlice/findTopsByPlaceId',
    async ({placeId},{rejectWithValue})=>{
        try {
            const {data} = await topService.findTopsByPlaceId(placeId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const topSlice = createSlice({
    name:'topSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(findTopsByPlaceId.fulfilled, (state, action) => {
                state.errors=null;
                state.placeTops=action.payload;
            })
            .addCase(findTopsByPlaceId.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(saveTop.fulfilled,(state, action) => {
                state.errors=null;
            })
            .addCase(saveTop.rejected,(state, action) => {
                state.errors=action.payload
            })
            .addCase(findAllTops.fulfilled,(state, action) => {
                fillTheResponse(state,action);
            })
            .addCase(findAllTops.rejected,(state, action) => {
                state.errors=action.payload;
            })
    }
});




const {reducer:topReducer, actions} = topSlice;

const topActions={
findAllTops,
    saveTop,
    findTopsByPlaceId

}

export {
    topReducer,
    topActions
}