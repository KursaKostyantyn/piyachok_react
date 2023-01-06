import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {authReducer, userReducer, newsReducer, placeReducer} from "./slices";


const rootReducer = combineReducers({
    places: placeReducer,
    news: newsReducer,
    auth: authReducer,
    users: userReducer
});

const setupStore = configureStore({
    reducer: rootReducer
});

export {
    setupStore
}