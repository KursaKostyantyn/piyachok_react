import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {typeService} from "../../services";

const initialState = {
    types: [],
    errors: null,
    currentType: null,
    previousPage: 0,
    nextPage: 0,
    amountOfPages: 0,
    currentPage: 1,
    amountOfItems: 0
}

const findAllTypes = createAsyncThunk(
    'typesSlice/findAllTypes',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await typeService.findAllTypes(page);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const findTypeById = createAsyncThunk(
    'typesSlice/findTypeById',
    async ({typeId}, {rejectWithValue}) => {
        try {
            const {data} = await typeService.findTypeById(typeId);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateType = createAsyncThunk(
    'typesSlice/updateType',
    async ({typeId, type}, {rejectWithValue}) => {
        try {
            const {data} = await typeService.updateType(typeId, type);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const deleteTypeById = createAsyncThunk(
    'typesSlice/deleteTypeById',
    async ({typeId}, {rejectWithValue}) => {
        try {
            const {data} = await typeService.deleteTypeById(typeId);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const saveType = createAsyncThunk(
    'typesSlice/saveType',
    async ({type},{rejectWithValue})=>{
        try {
            const {data} = await typeService.saveType(type);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const typeSlice = createSlice({
    name: 'typesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveType.fulfilled,(state, action) => {
                state.erors=action.payload;
            })
            .addCase(saveType.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(deleteTypeById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentType = null;
                const index = state.types.findIndex(type => type.id === action.payload)
                state.types.splice(index, 1)
            })
            .addCase(deleteTypeById.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(updateType.fulfilled, (state, action) => {
                state.errors = null;
                state.currentType = action.payload;
            })
            .addCase(updateType.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findTypeById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentType = action.payload;
            })
            .addCase(findTypeById.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findAllTypes.fulfilled, (state, action) => {
                state.errors = null;
                state.types = action.payload.items;
                state.previousPage = action.payload.previousPage
                state.nextPage = action.payload.nextPage
                state.amountOfPages = action.payload.amountOfPages
                state.currentPage = action.payload.currentPage
                state.amountOfItems = action.payload.amountOfItems
            })
            .addCase(findAllTypes.rejected, (state, action) => {
                state.errors = action.payload;
            })
    }
});

const {reducer: typeReducer, actions} = typeSlice;

const typeActions = {
    findAllTypes,
    findTypeById,
    updateType,
    deleteTypeById,
    saveType

}

export {
    typeActions,
    typeReducer
}