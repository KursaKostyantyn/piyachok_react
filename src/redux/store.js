import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {
    authReducer,
    userReducer,
    newsReducer,
    placeReducer,
    favoritePlacesReducer,
    commentsReducer,
    ratingReducer, typeReducer
} from "./slices";


const rootReducer = combineReducers({
    places: placeReducer,
    news: newsReducer,
    auth: authReducer,
    users: userReducer,
    favoritePlaces: favoritePlacesReducer,
    comments:commentsReducer,
    ratings: ratingReducer,
    types: typeReducer
});

const setupStore = configureStore({
    reducer: rootReducer
});

export {
    setupStore
}