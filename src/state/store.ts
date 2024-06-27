import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import movieSlice from "./features/movieSlice";
import homeSlice from "./features/homeSlice";
import tvSlice from "./features/tvSlice";
import detailsSlice from "./features/detailsSlice";
import searchSlice from "./features/searchSlice";
// import counterReducer from "./counter/counterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    details: detailsSlice,
    movies: movieSlice,
    home: homeSlice,
    tv: tvSlice,
    search: searchSlice,
  },
});
const rootReducer = combineReducers({
  auth: authReducer,
  details: detailsSlice,
  movies: movieSlice,
  home: homeSlice,
  tv: tvSlice,
  search: searchSlice,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
