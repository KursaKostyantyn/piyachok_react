import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {featuresService} from "../../services";

const initialState = {
    features: [],
    errors: null,
    currentFeature: null,
    previousPage: 0,
    nextPage: 0,
    amountOfPages: 0,
    currentPage: 1,
    amountOfItems: 0,
}

const findAllFeatures = createAsyncThunk(
    'featureSlice/findAllFeatures',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await featuresService.findAllFeatures(page);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const findFeatureById = createAsyncThunk(
    'featureSlice/findFeatureById',
    async ({featureId}, {rejectWithValue}) => {
        try {
            const {data} = await featuresService.findFeatureById(featureId);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateFeatureById = createAsyncThunk(
    'featureSlice/updateFeatureById',
    async ({featureId, feature}, {rejectWithValue}) => {
        try {
            const {data} = await featuresService.updateFeatureById(featureId, feature);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const saveFeature = createAsyncThunk(
    'featureSlice/saveFeature',
    async ({feature},{rejectWithValue})=>{
        try {
            const {data} = await featuresService.saveFeature(feature);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deleteFeatureById = createAsyncThunk(
    'featureSlice/deleteFeatureById',
    async ({featureId},{rejectWithValue})=>{
        try{
            const {data} = await featuresService.deleteFeatureById(featureId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const fillTheResponse = (state, action) => {
    state.errors = null;
    state.features = action.payload.items
    state.previousPage = action.payload.previousPage
    state.nextPage = action.payload.nextPage
    state.amountOfPages = action.payload.amountOfPages
    state.currentPage = action.payload.currentPage
    state.amountOfItems = action.payload.amountOfItems
}


const featureSlice = createSlice({
    name: 'featureSlice',
    initialState,
    reducers: {
        setCurrentFeature: (state, action) => {
            state.currentFeature = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteFeatureById.fulfilled,(state, action) => {
                state.errors=null;
            })
            .addCase(deleteFeatureById.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(saveFeature.fulfilled,(state, action) => {
                state.errors=null;
            })
            .addCase(saveFeature.rejected,(state, action) => {
                state.errors=action.payload
            })
            .addCase(updateFeatureById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentFeature = action.payload;
            })
            .addCase(updateFeatureById.rejected, (state, action) => {
                state.errors = action.payload
            })
            .addCase(findFeatureById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentFeature = action.payload;
            })
            .addCase(findFeatureById.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findAllFeatures.fulfilled, (state, action) => {
                fillTheResponse(state, action);
            })
            .addCase(findAllFeatures.rejected, (state, action) => {
                state.errors = action.payload;
            })

    }
});

const {reducer: featureReducer, actions: {setCurrentFeature}} = featureSlice;

const featureActions = {
    findAllFeatures,
    findFeatureById,
    updateFeatureById,
    setCurrentFeature,
    saveFeature,
    deleteFeatureById
}

export {
    featureReducer,
    featureActions
}