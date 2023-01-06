import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {placeService} from "../../services";


const initialState = {
    places: [],
    errors: null,
    currentPlace: null
}

const findAllPlaces = createAsyncThunk(
    "placeSlice/findAllPlaces",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await placeService.findAllPlaces();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findPlaceById = createAsyncThunk(
    'placeSlice/findPlaceById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await placeService.findPlaceById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const placeSlice = createSlice({
    name: 'placeSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findAllPlaces.fulfilled, (state, action) => {
                state.errors = null;
                state.places = action.payload
            })
            .addCase(findAllPlaces.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findPlaceById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentPlace = action.payload;
            })
            .addCase(findPlaceById.rejected, (state, action) => {
                state.errors = action.payload;
            })
    }
});

const {reducer: placeReducer} = placeSlice;


const placeActions = {
    findAllPlaces,
    findPlaceById
}

export {
    placeReducer,
    placeActions
}