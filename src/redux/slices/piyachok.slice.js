import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {piyachokService} from "../../services";

const initialState = {
    piyachoks: [],
    errors: null,
    currentPiyachok: null,
    previousPage: 0,
    nextPage: 0,
    amountOfPages: 0,
    currentPage: 1,
    amountOfItems: 0
}

const findAllPiyachok = createAsyncThunk(
    'piyachokSlice/findAllPiyachok',
    async ({page, old}, {rejectWithValue}) => {
        try {
            const {data} = await piyachokService.findAllPyachoks(page, old);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const savePiyachok = createAsyncThunk(
    'piyachokSlice/savePiyachok',
    async ({piyachok}, {rejectWithValue})=>{
        try {
            const {data} = await piyachokService.savePiyachok(piyachok);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const findPiyachokByPlaceId = createAsyncThunk(
    'piyachokSlice/findPiyachokByPlaceId',
    async ({placeId,page,old},{rejectedWithValue})=>{
        try {
            const {data} = await piyachokService.findPiyachokByPlaceId(placeId,page,old);
            return data;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);

const fillTheResponse = (state, action) => {
    state.errors = null;
    state.piyachoks = action.payload.items
    state.previousPage = action.payload.previousPage
    state.nextPage = action.payload.nextPage
    state.amountOfPages = action.payload.amountOfPages
    state.currentPage = action.payload.currentPage
    state.amountOfItems = action.payload.amountOfItems
}

const piyachokSlice = createSlice({
    name: 'piyachokSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findPiyachokByPlaceId.fulfilled,(state, action) => {
                fillTheResponse(state,action);
            })
            .addCase(findPiyachokByPlaceId.rejected,(state, action) => {
                state.errors=action.payload
            })
            .addCase(savePiyachok.fulfilled,(state, action) => {
                state.errors=null;
            })
            .addCase(savePiyachok.rejected, (state, action) => {
                state.errors=action.payload;
            })
            .addCase(findAllPiyachok.fulfilled, (state, action) => {
                fillTheResponse(state, action);

            })
            .addCase(findAllPiyachok.rejected, (state, action) => {
                state.errors = action.payload
            })

    }
});


const {reducer: piyachokReducer, actions} = piyachokSlice;

const piyachokActions = {
    findAllPiyachok,
    savePiyachok,
    findPiyachokByPlaceId
}

export {
    piyachokReducer,
    piyachokActions
}