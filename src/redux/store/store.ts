import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import movieReducer from "../reducers/moviesReducer";
import seriesReducer from "../reducers/seriesReducer";

const rootReducer = combineReducers({
  user: userReducer,
  movies: movieReducer,
  series: seriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

//definisco il tipo Dispatch
export type AppDispatch = typeof store.dispatch;

//definisco il tipo RootState
export type RootState = ReturnType<typeof store.getState>;

export default store;
