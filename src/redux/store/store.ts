import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";

const rootReducer=combineReducers({
    user: userReducer,
    
});

const store=configureStore({
    reducer: rootReducer,
});

export type AppDispatch=typeof store.dispatch;

export default store;