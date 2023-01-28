import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {typeService} from "../../services";

const initialState={
    types:[],
    errors:null
}

const findAllTypes = createAsyncThunk(
    'typeSlice/findAllTypes',
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await typeService.findAllTypes();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const typeSlice = createSlice({
    name:'typeSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(findAllTypes.fulfilled,(state, action) => {
                state.errors =null;
                state.types=action.payload;
            })
            .addCase(findAllTypes.rejected,(state, action) => {
                state.errors=action.payload;
            })
    }
});

const {reducer:typeReducer, actions} = typeSlice;

const typeActions={
    findAllTypes,
}

export {
    typeActions,
    typeReducer
}