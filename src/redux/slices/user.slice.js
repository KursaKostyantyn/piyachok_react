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
    isFavorite: false,
    amountOfItems: 0
}

const findAllUsers = createAsyncThunk(
    'userSlice/findAllUsers',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await userService.findAllUsers(page);
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
    async ({userId}, {rejectWithValue}) => {
        try {
            const {data} = await userService.findUserById(userId);
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
    async ({placeId, login}, {rejectWithCalue}) => {
        try {
            const {data} = await userService.deletePlaceFromFavoriteByPlaceIdUserLogin(placeId, login);
            return data;
        } catch (e) {
            return rejectWithCalue(e.response.data)
        }
    }
);

const activateUser = createAsyncThunk(
    'userSlice/activateUserById',
    async ({activateToken}, {rejectWithValue}) => {
        try {
            const {data} = await userService.activateUser(activateToken);
            console.log(data)
            return data;
        } catch (e) {
            return rejectWithValue(e.code)
        }
    }
);

const sendResetPasswordToken = createAsyncThunk(
    'userSlice/sendResetPasswordToken',
    async ({userLogin}, {rejectWithValue}) => {
        try {
            const {data} = await userService.sendResetPasswordToken(userLogin);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const resetPasswordAndSetNew = createAsyncThunk(
    'userSlice/resetPasswordAndSetNew',
    async ({userLogin, resetPasswordToken, password}, {rejectedWithValue}) => {
        try {
            const {data} = await userService.resetPasswordAndSetNew(userLogin, resetPasswordToken, password);
            return data;
        } catch (e) {
            return rejectedWithValue(e.response.data)
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
        setIsFavorite: (state, action) => {
            state.isFavorite = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetPasswordAndSetNew.fulfilled, (state, action) => {
                state.errors = null;
                state.currentUser = action.payload;
            })
            .addCase(resetPasswordAndSetNew.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(sendResetPasswordToken.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(sendResetPasswordToken.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(activateUser.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(activateUser.rejected, (state, action) => {
                state.errors = action.payload;
                console.log(action.payload)
            })
            .addCase(deletePlaceFromFavoriteByPlaceIdUserLogin.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(deletePlaceFromFavoriteByPlaceIdUserLogin.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(addPlaceToFavoriteByPlaceIdAndUserLogin.fulfilled, (state, action) => {
                state.errors = null;
            })
            .addCase(addPlaceToFavoriteByPlaceIdAndUserLogin.rejected, (state, action) => {
                state.errors = action.payload;
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
                state.amountOfItems = action.payload.amountOfItems
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
                state.users = action.payload.items;
                state.previousPage = action.payload.previousPage;
                state.nextPage = action.payload.nextPage;
                state.amountOfPages = action.payload.amountOfPages;
                state.currentPage = action.payload.currentPage;
                state.amountOfItems = action.payload.amountOfItems

            })
            .addCase(findAllUsers.rejected, (state, action) => {
                state.errors = action.payload;
            })

    }
});


const {reducer: userReducer, actions: {setCurrentUser, setIsFavorite}} = userSlice;

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
    activateUser,
    sendResetPasswordToken,
    resetPasswordAndSetNew

}

export {
    userReducer,
    userActions
}