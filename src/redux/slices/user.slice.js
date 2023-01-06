import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services";

const initialState={
    users:null,
    currentUser:null,
    errors:null
}

const findAllUsers = createAsyncThunk(
    'userSlice/findAllUsers',
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await userService.findAllUsers();
            return data;
        } catch (e){
            return rejectWithValue(e.response.data)
        }
    }
);

const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(findAllUsers.fulfilled,(state, action) => {
                state.errors =null;
                state.users=action.payload;
            })
            .addCase(findAllUsers.rejected,(state, action) => {
                state.errors=action.payload;
            })
    }
});

const {reducer:userReducer,actions} = userSlice;

const userActions={
    findAllUsers

}

export {
    userReducer,
    userActions
}