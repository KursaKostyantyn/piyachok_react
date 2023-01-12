import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {
    authReducer,
    userReducer,
    newsReducer,
    placeReducer,
    favoritePlacesReducer,
    commentsReducer,
    ratingReducer
} from "./slices";


const rootReducer = combineReducers({
    places: placeReducer,
    news: newsReducer,
    auth: authReducer,
    users: userReducer,
    favoritePlaces: favoritePlacesReducer,
    comments:commentsReducer,
    ratings: ratingReducer
});

const setupStore = configureStore({
    reducer: rootReducer
});

export {
    setupStore
}