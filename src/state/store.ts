import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import movieSlice from "./features/movieSlice";
import homeSlice from "./features/homeSlice";
import tvSlice from "./features/tvSlice";
import detailsSlice from "./features/detailsSlice";
// import counterReducer from "./counter/counterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    details: detailsSlice,
    movies: movieSlice,
    home: homeSlice,
    tv: tvSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
