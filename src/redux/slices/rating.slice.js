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
    setCurrentRating
}

export {
    ratingReducer,
    ratingActions
}