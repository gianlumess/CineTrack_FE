import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

//definisco il tipo Dispatch
export type AppDispatch = typeof store.dispatch;

//definisco il tipo RootState
export type RootState = ReturnType<typeof store.getState>;

export default store;
