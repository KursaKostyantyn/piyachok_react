import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services";

const initialState = {
    users: null,
    errors: null,
    currentUser: null,
    favoritePlaces: [],
    previousPage: 0,
    nextPage: 0,
    amountOfPages: 0,
    currentPage: 1,
    isFavorite: false
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
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.deleteUserById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const getFavoritePlacesByUserLogin = createAsyncThunk(
    'userSlice/getFavoritePlacesByUserLogin',
    async ({login}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getFavoritePlacesByUserLogin(login);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const checkPlaceIsFavoriteByPlaceIdAndUserLogin = createAsyncThunk(
    'userSlice/checkPlaceIsFavoriteByPlaceIdAndUserLogin',
    async ({placeId, login}, {rejectWithValue}) => {
        try {
            const {data} = await userService.checkPlaceIsFavoriteByPlaceIdAndUserLogin(placeId, login);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const addPlaceToFavoriteByPlaceIdAndUserLogin = createAsyncThunk(
    'userSlice/addPlaceToFavoriteByPlaceIdAndUserLogin',
    async ({placeId, login}, {rejectWithValue}) => {
        try {
            const {data} = await userService.addPlaceToFavoriteByPlaceIdAndUserLogin(placeId, login);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const deletePlaceFromFavoriteByPlaceIdUserLogin = createAsyncThunk(
    'userSlice/deletePlaceFromFavoriteByPlaceIdUserLogin',
    async ({placeId,login},{rejectWithCalue})=>{
        try {
            const {data} = await userService.deletePlaceFromFavoriteByPlaceIdUserLogin(placeId,login);
            return  data;
        } catch (e) {
            return rejectWithCalue(e.response.data)
        }
    }
);

const activateUserById = createAsyncThunk(
    'userSlice/activateUserById',
    async ({userId},{rejectWithValue})=>{
        try {
            const {data} = await userService.activateUserById(userId);
            console.log(data)
            return data;
        } catch (e) {
            return rejectWithValue(e.code)
        }
    }
);


const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setIsFavorite:(state, action) => {
            state.isFavorite=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(activateUserById.fulfilled,(state, action) => {
                state.errors=null;
            })
            .addCase(activateUserById.rejected,(state, action) => {
                state.errors=action.payload;
                console.log(action.payload)
            })
            .addCase(deletePlaceFromFavoriteByPlaceIdUserLogin.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(deletePlaceFromFavoriteByPlaceIdUserLogin.fulfilled,(state, action) => {
                state.errors=null;
            })
            .addCase(addPlaceToFavoriteByPlaceIdAndUserLogin.fulfilled,(state, action) => {
                state.errors=null;
            })
            .addCase(addPlaceToFavoriteByPlaceIdAndUserLogin.rejected,(state, action) => {
                state.errors=action.payload;
            })
            .addCase(checkPlaceIsFavoriteByPlaceIdAndUserLogin.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(checkPlaceIsFavoriteByPlaceIdAndUserLogin.fulfilled, (state, action) => {
                state.errors = null;
                state.isFavorite = action.payload;
            })
            .addCase(getFavoritePlacesByUserLogin.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(getFavoritePlacesByUserLogin.fulfilled, (state, action) => {
                state.errors = null;
                state.favoritePlaces = action.payload.items
                state.previousPage = action.payload.previousPage
                state.nextPage = action.payload.nextPage
                state.amountOfPages = action.payload.amountOfPages
                state.currentPage = action.payload.currentPage
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.erros = action.payload;
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
                state.currentUser = action.payload;

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


const {reducer: userReducer, actions: {setCurrentUser,setIsFavorite}} = userSlice;

const userActions = {
    findAllUsers,
    setCurrentUser,
    updateUserById,
    findUserById,
    deleteUserById,
    getFavoritePlacesByUserLogin,
    checkPlaceIsFavoriteByPlaceIdAndUserLogin,
    addPlaceToFavoriteByPlaceIdAndUserLogin,
    setIsFavorite,
    deletePlaceFromFavoriteByPlaceIdUserLogin,
    activateUserById

}

export {
    userReducer,
    userActions
}