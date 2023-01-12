import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {favoritePlacesService} from "../../services";

const initialState = {
    favoritePlaces: [],
    errors: null,
}

const getFavoritePlacesByUserId = createAsyncThunk(
    'favoritePlacesSlice/getFavoritePlacesByUserId',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await favoritePlacesService.getFavoritePlacesByUserId(id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const favoritePlacesSlice = createSlice({
    name: 'favoritePlacesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavoritePlacesByUserId.fulfilled, (state, action) => {
                state.errors = null;
                state.favoritePlaces = action.payload;
            })
            .addCase(getFavoritePlacesByUserId.rejected, (state, action) => {
                state.errors = action.payload;
            })


    }
});

const {reducer: favoritePlacesReducer, actions} = favoritePlacesSlice;

const favoritePlacesAction = {
    getFavoritePlacesByUserId
}

export {
    favoritePlacesAction,
    favoritePlacesReducer
}