import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services";

const initialState = {
    users: null,
    errors: null,
    currentUser: null
}

const findAllUsers = createAsyncThunk(
    'userSlice/findAllUsers',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.findAllUsers();
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const updateUserById = createAsyncThunk(
    'userSlice/updateUserById',
    async ({id, user}, {rejectWithValue}) => {
        try {
            console.log("id = ", id)
            console.log("data = ", user)
            const {data} = await userService.updateUserById(id, user);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const findUserById = createAsyncThunk(
    'userSlice/findUserById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.findUserById(id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const deleteUserById = createAsyncThunk(
    'userSlice/deleteUserById',
    async ({id},{rejectWithValue})=>{
        try {
            const {data} = await userService.deleteUserById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUserById.fulfilled,(state, action) => {
                state.errors=null;
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.erros=action.payload;
            })
            .addCase(findUserById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentUser = action.payload;
            })
            .addCase(findUserById.rejected, (state, action) => {
                state.errors = action.payload;
            })

            .addCase(updateUserById.fulfilled, (state, action) => {
                state.errors = null;
                state.currentUser=action.payload;

            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(findAllUsers.fulfilled, (state, action) => {
                state.errors = null;
                state.users = action.payload;
            })
            .addCase(findAllUsers.rejected, (state, action) => {
                state.errors = action.payload;
            })

    }
});


const {reducer: userReducer, actions: {setCurrentUser}} = userSlice;

const userActions = {
    findAllUsers,
    setCurrentUser,
    updateUserById,
    findUserById,
    deleteUserById

}

export {
    userReducer,
    userActions
}