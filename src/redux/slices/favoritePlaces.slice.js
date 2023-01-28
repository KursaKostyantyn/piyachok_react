import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {favoritePlacesService} from "../../services";

const initialState = {
    favoritePlaces: [],
    errors: null,
}

const getFavoritePlacesByUserLogin = createAsyncThunk(
    'favoritePlacesSlice/getFavoritePlacesByUserLogin',
    async ({login}, {rejectWithValue}) => {
        try {
            const {data} = await favoritePlacesService.getFavoritePlacesByUserLogin(login);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addPlaceToFavoriteByPlaceIdAndUserLogin = createAsyncThunk(
    'favoritePlacesSlice/addPlaceToFavoriteByPlaceIdAndUserLogin',
    async ({placeId,login},{rejectWithValue})=>{
        try {
            const {data} = await favoritePlacesService.addPlaceToFavoriteByPlaceIdAndUserLogin(placeId,login);
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
            .addCase(addPlaceToFavoriteByPlaceIdAndUserLogin.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(addPlaceToFavoriteByPlaceIdAndUserLogin.fulfilled,(state, action) => {
                state.errors=null;
            })
            .addCase(getFavoritePlacesByUserLogin.fulfilled, (state, action) => {
                state.errors = null;
                state.favoritePlaces = action.payload;
            })
            .addCase(getFavoritePlacesByUserLogin.rejected, (state, action) => {
                state.errors = action.payload;
            })


    }
});

const {reducer: favoritePlacesReducer, actions} = favoritePlacesSlice;

const favoritePlacesAction = {
    getFavoritePlacesByUserLogin,
    addPlaceToFavoriteByPlaceIdAndUserLogin
}

export {
    favoritePlacesAction,
    favoritePlacesReducer
}