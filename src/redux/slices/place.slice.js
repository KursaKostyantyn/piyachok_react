import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {placeService} from "../../services";


const initialState = {
    places: [],
    errors: null,
    currentPlace: null,
    previousPage: 0,
    nextPage: 0,
    amountOfPages: 0,
    currentPage: 1,
    amountOfItems: 0
}

const findAllPlaces = createAsyncThunk(
    "placeSlice/findAllPlaces",
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.findAllPlaces(page);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findPlaceById = createAsyncThunk(
    'placeSlice/findPlaceById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.findPlaceById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deletePlaceById = createAsyncThunk(
    'placeSlice/deletePlaceById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.deletePlaceById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updatePlaceById = createAsyncThunk(
    'placeSlice/updatePlaceById',
    async ({id, place}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.updatePlaceById(id, place);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const savePLace = createAsyncThunk(
    'placeSlice/savePlace',
    async ({userId, place}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.savePlace(place, userId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findPlaceByUserLogin = createAsyncThunk(
    'placeSlice/findPlaceByUserLogin',
    async ({userLogin, page}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.findPlaceByUserLogin(userLogin, page);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const placeSlice = createSlice({
    name: 'placeSlice',
    initialState,
    reducers: {
        setCurrentPlace: (state, action) => {
            state.currentPlace = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(findPlaceByUserLogin.fulfilled, (state, action) => {
                state.errors = null;
                state.places = action.payload.items
                state.previousPage = action.payload.previousPage
                state.nextPage = action.payload.nextPage
                state.amountOfPages = action.payload.amountOfPages
                state.currentPage = action.payload.currentPage
                state.amountOfItems=action.payload.amountOfItems
            })
            .addCase(findPlaceByUserLogin.rejected, (state, action) => {
                state.errors = action.payload
            })
            .addCase(savePLace.fulfilled, (state, action) => {
                state.erros = null;
            })
            .addCase(updatePlaceById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentPlace = action.payload;
            })
            .addCase(deletePlaceById.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(deletePlaceById.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findAllPlaces.fulfilled, (state, action) => {
                state.errors = null;
                state.places = action.payload.items
                state.previousPage = action.payload.previousPage
                state.nextPage = action.payload.nextPage
                state.amountOfPages = action.payload.amountOfPages
                state.currentPage = action.payload.currentPage
                state.amountOfItems=action.payload.amountOfItems
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

const {reducer: placeReducer, actions: {setCurrentPlace}} = placeSlice;


const placeActions = {
    findAllPlaces,
    findPlaceById,
    deletePlaceById,
    savePLace,
    setCurrentPlace,
    findPlaceByUserLogin
}

export {
    placeReducer,
    placeActions
}