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
    amountOfItems: 0,
    filters: null,
    mainPlacePhoto: 'http://via.placeholder.com/250x300?text=No+Photo'
}

const findAllPlaces = createAsyncThunk(
    "placeSlice/findAllPlaces",
    async ({page, old, alphabet, rating, averageCheck}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.findAllPlaces(page, alphabet, old, rating, averageCheck);
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
    async ({placeId, place}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.updatePlaceById(placeId, place);
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

const addPhotosToPlaceById = createAsyncThunk(
    'placeSlice/addPhotosToPlaceById',
    async ({formData}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.addPhotosToPlaceById(formData);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findPLaceByName = createAsyncThunk(
    'placeSlice/findPLaceByName',
    async ({placeName, page}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.findPLaceByName(placeName, page);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findAllActivatedPlaces = createAsyncThunk(
    'placeSlice/findAllActivatedPlaces',
    async ({page, old, alphabet, rating, averageCheck}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.findAllActivatedPlaces(page, alphabet, old, rating, averageCheck);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const filterPLaces = createAsyncThunk(
    'placeSlice/filterPLaces',
    async ({rating, types, averageCheckFrom, averageCheckTo}, {rejectWithValue}) => {
        try {
            const {data} = await placeService.filterPLaces(rating, types, averageCheckFrom, averageCheckTo);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const fillTheResponse = (state, action) => {
    state.errors = null;
    state.places = action.payload.items
    state.previousPage = action.payload.previousPage
    state.nextPage = action.payload.nextPage
    state.amountOfPages = action.payload.amountOfPages
    state.currentPage = action.payload.currentPage
    state.amountOfItems = action.payload.amountOfItems
}

const placeSlice = createSlice({
    name: 'placeSlice',
    initialState,
    reducers: {
        setCurrentPlace: (state, action) => {
            state.currentPlace = action.payload;
        },
        setMainPLacePhoto: (state, action) => {
            state.mainPlacePhoto = action.payload;
        },
        setPlaces: (state, action) => {
            state.places = action.payload;
            state.previousPage = action.payload
            state.nextPage = action.payload
            state.amountOfPages = action.payload
            state.currentPage = action.payload
            state.amountOfItems = action.payload
        },
        setFilter: (state, action) => {
            state.filters = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterPLaces.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(filterPLaces.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findAllActivatedPlaces.fulfilled, (state, action) => {
                fillTheResponse(state, action);
            })
            .addCase(findAllActivatedPlaces.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findPLaceByName.fulfilled, (state, action) => {
                fillTheResponse(state, action);
            })
            .addCase(findPLaceByName.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(addPhotosToPlaceById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentPlace = action.payload;
            })
            .addCase(addPhotosToPlaceById.rejected, (state, action) => {
                state.errors = action.payload
            })
            .addCase(findPlaceByUserLogin.fulfilled, (state, action) => {
                fillTheResponse(state, action);
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
                fillTheResponse(state, action);
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

const {reducer: placeReducer, actions: {setCurrentPlace, setMainPLacePhoto, setPlaces, setFilter}} = placeSlice;


const placeActions = {
    findAllPlaces,
    findPlaceById,
    deletePlaceById,
    savePLace,
    setCurrentPlace,
    findPlaceByUserLogin,
    addPhotosToPlaceById,
    setMainPLacePhoto,
    findPLaceByName,
    setPlaces,
    findAllActivatedPlaces,
    updatePlaceById,
    filterPLaces,
    setFilter
}

export {
    placeReducer,
    placeActions
}