import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {
    authReducer,
    userReducer,
    newsReducer,
    placeReducer,
    commentsReducer,
    ratingReducer,
    typeReducer,
    featureReducer, piyachokReducer
} from "./slices";


const rootReducer = combineReducers({
    places: placeReducer,
    news: newsReducer,
    auth: authReducer,
    users: userReducer,
    comments: commentsReducer,
    ratings: ratingReducer,
    types: typeReducer,
    features: featureReducer,
    piyachoks:piyachokReducer
});

const setupStore = configureStore({
    reducer: rootReducer
});

export {
    setupStore
}