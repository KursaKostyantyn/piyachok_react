import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ratingService} from "../../services";

const initialState = {
    ratings: [],
    errors: null,
    currentRating:null
}

const findAllRatings = createAsyncThunk(
    'ratingSlice/findAllRatings',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await ratingService.findAllRatings();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findRatingsByUserLogin = createAsyncThunk(
    'ratingSlice/findRatingsByUserLogin',
    async ({login}, {rejectWithValue}) => {
        try {
            const {data} = await ratingService.findRatingsByUserLogin(login);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const saveRating = createAsyncThunk(
    'ratingSlice/saveRating',
    async ({rating},{rejectWithValue})=>{
        try {
            const {data} = await ratingService.saveRating(rating);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const updateRating = createAsyncThunk(
    'ratingSlice/updateRating',
    async ({rating},{rejectWithValue})=>{
        try {
            const {data} = await ratingService.updateRating(rating);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findRatingByPLaceIdAndUserLogin = createAsyncThunk(
    'ratingSlice/findRatingByPLaceIdAndUserLogin',
    async ({placeId,userLogin},{rejectWithValue})=>{
        try {
            const {data} = await ratingService.findRatingByPLaceIdAndUserLogin(placeId,userLogin);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findRatingById = createAsyncThunk(
    'ratingSlice/findRatingById',
    async ({myRatingsId}, {rejectedWithValue})=>{
        try {
            const {data} = await ratingService.findRatingById(myRatingsId);
            return data;
        } catch (e) {
            return rejectedWithValue(e.response.data)
        }
    }
);


const ratingSlice = createSlice({
    name: 'ratingSlice',
    initialState,
    reducers: {
        setCurrentRating:(state, action) => {
            state.currentRating =action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(findRatingById.fulfilled,(state, action) => {
                state.errors=null;
                state.currentRating=action.payload;
            })
            .addCase(findRatingById.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(findRatingByPLaceIdAndUserLogin.fulfilled,(state, action) => {
                state.errors=null;
                state.currentRating=action.payload;
            })
            .addCase(findRatingByPLaceIdAndUserLogin.rejected,(state, action) => {
                state.errors=null;
            })
            .addCase(updateRating.fulfilled,(state, action) => {
                state.erros=null;
                state.currentRating=action.payload;
            })
            .addCase(updateRating.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(saveRating.fulfilled,(state, action) => {
                state.errors=null;
                state.currentRating=action.payload;
            })
            .addCase(saveRating.rejected, (state, action) => {
                state.errors=action.payload;
            })
            .addCase(findAllRatings.fulfilled, (state, action) => {
                state.errors = null;
                state.ratings = action.payload;

            })
            .addCase(findAllRatings.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findRatingsByUserLogin.fulfilled, (state, action) => {
                state.errors = null;
                state.ratings = action.payload;
            })
            .addCase(findRatingsByUserLogin.rejected, (state, action) => {
                state.errors = action.payload;
            })

    }
});

const {reducer: ratingReducer, actions:{setCurrentRating}} = ratingSlice;

const ratingActions = {
    findAllRatings,
    findRatingsByUserLogin,
    setCurrentRating,
    saveRating,
    updateRating,
    findRatingByPLaceIdAndUserLogin,
    findRatingById
}

export {
    ratingReducer,
    ratingActions
}